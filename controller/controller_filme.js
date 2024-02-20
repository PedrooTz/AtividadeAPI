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
const filmesDAO = require('../model/DAO/filme.js');
const { filmes } = require('../modulo/Filmes.js');

// Função para inserir um novo filme no banco de dados
const setInserirNovoFilme = async function(){

}

// Função para atualizar um filme existente
const setAtualizarFilme = async function (){

}

// Função para excluir um filme existente
const setExcluirFilme = async  function(id){

}

// Função para listar os filmes existentes 
const getListarFilmes = async function(){
    
    let listaFilmes = filmes;
    // Cria uma variavel do tipo json
    let filmesJSON = {};

    if ((listaFilmes)){
        return listaFilmes;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    
    // Verifica se existem dados retornados do DAO
    if(dadosFilmes){
        if(dadosFilmes.length > 0){
        // Montando a estrutura do JSOm
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        // Retorna o JSON montado
        return filmesJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function(id){
    // Recebe o id do filme
    let idFilme = id;

    // Variável para criar o json do filme
    let filmeJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosFilme = await filmesDAO.selectByIdFilme(id)

        // Validação para verificar se existem dados encontrados
        if(dadosFilme){
            // Validação para verificar se existem dados de retorno
            if(dadosFilme.length > 0){
            filmeJSON.filme = dadosFilme;
            filmeJSON.status_code = 200

            return filmeJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}
