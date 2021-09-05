const { contas, saques, depositos, transferencias } = require("../bancodedados");


//SALDO
function saldo(req, res){
    if(!req.query.senha || !req.query.numero_conta){

        res.status(404);

        res.json({erro: "informe a senha e numero da conta!"});

        return;
    }

    const conta = contas.find(x => x.numero === Number(req.query.numero_conta));

    if(!conta){

        res.status(404);

        res.json({erro: "conta não encontrada"});

        return;
    }

    if(conta.usuario.senha !== req.query.senha){

        res.status(400);

        res.json({erro: "senha incorreta!"});

        return;
    }

    res.json({saldo: conta.saldo});
}


//EXTRATO
function extrato(req, res){
   
    if(!req.query.senha || !req.query.numero_conta){

        res.status(404);

        res.json({erro: "Informe corretamente o numero da conta e senha."});

        return;   
    }

    const conta = contas.find(x => x.numero === Number(req.query.numero_conta));

    if(!conta){

        res.status(404);

        res.json({erro: "Conta inexistente."});

        return;
    }

    if(req.query.senha !==  conta.usuario.senha){

        res.status(400);

        res.json({erro: "senha incorreta."});

        return;
    }


    const saquesDaConta = saques.filter(x => x.numero_conta === conta.numero);

    const depositosDaConta = depositos.filter(x => x.numero_conta === conta.numero);

    const transferenciasEnviadas = transferencias.filter(x => x.numero_conta_origem === conta.numero);

    const transferenciasRecebidas = transferencias.filter(x => x.numero_conta_destino === conta.numero);


    res.json({

        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas

    });
}


module.exports = {
    saldo,
    extrato
}