const { contas } = require("../bancodedados");

//VALIDAR DADOS DE ENTRADA
function validarDados(dadosUsuario){
 
        
    
    if(!dadosUsuario.nome){
      
        return {erro:"O campo 'nome' é obrigatório"};
    }

    if(!dadosUsuario.cpf){
        
        return {erro:"O campo 'cpf' é obrigatório"};
    }

    if(!dadosUsuario.data_nascimento){
       
        return {erro:"O campo 'data_nascimento' é obrigatório"};
    }

    if(!dadosUsuario.telefone){
     
        return {erro:"O campo 'telefone' é obrigatório"};
    }

    if(!dadosUsuario.email){
  
        return {erro:"O campo 'email' é obrigatório"};
    }

    if(!dadosUsuario.senha){
      
        return {erro:"O campo 'senha' é obrigatório"};
    }
      
    if(contas.length > 0){

        for(let i of contas){
         
            if(i.usuario.cpf === dadosUsuario.cpf && i.numero !== dadosUsuario.numero){

               return {erro: "o CPF já consta como cadastrado."};

           }

           if(i.usuario.email === dadosUsuario.email && i.numero !== dadosUsuario.numero){

               return {erro: "O email já consta como cadastrado."};
           }
        }
        
    }

}

module.exports = {
    validarDados
}