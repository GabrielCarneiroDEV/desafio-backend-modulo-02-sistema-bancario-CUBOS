
const {depositos, contas, transferencias, saques} = require('../bancodedados.js');
const {format} = require('date-fns');




//DEPOSITAR - POST
function depositar (req, res){

    const conta = contas.find(x => x.numero === Number(req.body.numero_conta));

    if(!conta){

        res.status(404);

        res.json({erro: "Numero da conta informada não existe."});

        return;

    }

    if(req.body.valor === undefined || req.body.valor <= 0){

        res.status(400);

        res.json({erro: "Digite o valor a ser depositado"});

        return;
    }

    const indice = contas.indexOf(conta);

    contas[indice].saldo += req.body.valor;
    const momento = new Date();

    const registro =  {
        data: format(momento, "yyyy-MM-dd HH:mm:ss"),
        numero_conta: conta.numero,
        valor: req.body.valor
    }

    depositos.push(registro);
 
    res.json({mensagem: "Depósito realizado com sucesso!"});
}


//SACAR
function sacar(req, res){

    const conta = contas.find(x => x.numero === Number(req.body.numero_conta));

    if(!conta || !req.body.senha || !req.body.valor){

        res.status(400);

        res.json({erro: "Informe corretamente o numero da conta, valor do saque e senha."});

        return;
    }

    if(conta.usuario.senha !== req.body.senha){

        res.status(400);

        res.json({erro:"senha incorreta"});

        return;
    }

    if(conta.saldo < req.body.valor){

        res.status(400);

        res.json({erro: "saldo insuficiente"});

        return;
    }

    const indice = contas.indexOf(conta);

    contas[indice].saldo -= req.body.valor;

    const momento = new Date();

    const registro =  {
        data: format(momento, "yyyy-MM-dd HH:mm:ss"),
        numero_conta: conta.numero,
        valor: req.body.valor
    }

    saques.push(registro);

    res.json({mensagem: "Saque realizado com sucesso!"});
}


//TRANSFERIR

function transferir(req, res){
    const contaOrigem = contas.find(x => x.numero === Number(req.body.numero_conta_origem));
    const contaDestino = contas.find(x => x.numero === Number(req.body.numero_conta_destino));
    console.log(contaOrigem, contaDestino, req.body.senha, req.body.valor)
    if(!contaOrigem || !contaDestino || !req.body.senha || !req.body.valor){
        res.status(400);
        res.json({erro: "Informe corretamente o numero das contas de origem e destino, valor da transferência e senha."});
        return;
    }

    if(contaOrigem.usuario.senha !== req.body.senha){
        res.status(400)
        res.json(({erro: "Senha incorreta!"}))
        return;
    }
    if(contaOrigem.saldo < req.body.valor){
        console.log(contaOrigem.saldo)
        res.status(400);
        res.json({erro: "saldo insuficiente."})
        return;
    }




    const indiceOrigem = contas.indexOf(contaOrigem);
    const indiceDestino = contas.indexOf(contaDestino);

    contas[indiceOrigem].saldo -= req.body.valor;
    contas[indiceDestino].saldo += req.body.valor
    const momento = new Date();

    const registro =  {
        data: format(momento, "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem: contaOrigem.numero,
        numero_conta_destino: contaDestino.numero,
        valor: req.body.valor
    }

    transferencias.push(registro);
  
 


    res.json({mensagem: "Transferência realizada com sucesso!"});
}


module.exports = {
    depositar,
    sacar,
    transferir
}