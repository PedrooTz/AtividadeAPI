/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de Filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const generoDAO = require('../model/DAO/genero.js');


const getListarGenero = async function(){
    
    let listaGenero;
    // Cria uma variavel do tipo json
    let generoJSON = {};

    if ((listaGenero)){
        return listaGenero;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosGenero = await generoDAO.selectAllGeneros();

    
    // Verifica se existem dados retornados do DAO
    if(dadosGenero){
        if(dadosGenero.length > 0){
        // Montando a estrutura do JSOm
        generoJSON.genero = dadosGenero;
        generoJSON.quantidade = dadosGenero.length;
        generoJSON.status_code = 200;
        // Retorna o JSON montado
        return generoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
const getListarGenerosById = async function (id){
   
    // Recebe o id do ator
    let idGeneros = id;

    // Variável para criar o json do atores
    let generosJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idGeneros == '' || idGeneros == undefined || isNaN(idGeneros)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosGenero = await generoDAO.selectGeneroById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosGenero){
            // Validação para verificar se existem dados de retorno
            if(dadosGenero.length > 0){
            generosJSON.atores = dadosGenero;
            generosJSON.status_code = 200

            return generosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    getListarGenero,
    getListarGenerosById
}