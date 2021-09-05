const {contas} = require('../bancodedados.js');
const { validarDados } = require('./validar.js');
let numeroDaConta = 1;


//GET
function mostrarContas (req, res){

    if(req.query.senha_banco === "123"){

        res.json(contas);

    }

    else{

       res.status(400);

       res.json({erro:"ACESSO NEGADO!"});
       
    }

}

//POST
function criarConta (req, res){

    const erro = validarDados(req.body);

    if(erro){
        res.status(400);

        res.json(erro);

        return;
    }

    const novaConta = {

        numero : numeroDaConta,
        saldo: 0,
        usuario: {

            nome : req.body.nome,
            cpf : req.body.cpf,
            data_nascimento : req.body.data_nascimento,
            telefone : req.body.telefone,
            email : req.body.email,
            senha : req.body.senha

        }
    };

    numeroDaConta++;

    contas.push(novaConta);
   
    res.status(201);

    res.json(contas);
}

//PUT
function atualizarUsuarioConta(req, res){
    
    const conta = contas.find( x => x.numero === Number(req.params.numeroConta));

    if(!conta){

        res.status(404);

        return res.json({erro:"Conta não existe"});
    }

    const indice = contas.indexOf(conta);

    conta.usuario.nome = req.body.nome;

    conta.usuario.cpf = req.body.cpf;

    conta.usuario.data_nascimento = req.body.data_nascimento;

    conta.usuario.telefone = req.body.telefone;

    conta.usuario.email = req.body.email;

    conta.usuario.senha = req.body.senha;

    const erro = validarDados({

        numero: conta.numero,
        nome: conta.usuario.nome ?? req.body.nome,
        cpf: conta.usuario.cpf ?? req.body.cpf,
        data_nascimento: conta.usuario.data_nascimento ?? req.body.data_nascimento,
        telefone : conta.usuario.telefone ?? req.body.telefone,
        email : conta.usuario.email ?? req.body.email,
        senha : conta.usuario.senha ?? req.body.senha,

    });
  
    if(erro){
        res.status(400);

        res.json(erro);

        return;
    }

    contas.splice(indice, 1, conta);

    res.json({mensagem: "Conta atualizada com sucesso!"});

}

//DELETE
function excluirConta(req, res){

    const conta = contas.find(x => x.numero === Number(req.params.numeroConta));

    if(!conta){

        res.status(404);

        res.json({erro: "numero informado não existe."});

        return;
    }

    if(conta.saldo > 0){

        res.status(400);

        res.json({erro : "A conta informada ainda possui saldo"});

        return;
    }

    const indice = contas.indexOf(conta);

    contas.splice(indice, 1);

    res.json({mensagem: "Conta excluída com sucesso!"});

}

module.exports = {
    mostrarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta
}