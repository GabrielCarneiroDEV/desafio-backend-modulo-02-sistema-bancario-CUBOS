const express = require('express');
const { saldo, extrato } = require('./controladores/comprovantes');
const { mostrarContas, criarConta, atualizarUsuarioConta, excluirConta } = require('./controladores/controlador');
const { depositar, sacar, transferir } = require('./controladores/transacoes');

const rotas = express();

//ROTAS
rotas.get('/contas', mostrarContas);

rotas.post('/contas', criarConta);

rotas.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/transacoes/depositar', depositar);

rotas.post('/transacoes/sacar', sacar);

rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', saldo);

rotas.get('/contas/extrato', extrato);

module.exports = {rotas}