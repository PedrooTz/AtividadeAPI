/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de Filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import do arquivo DAO para manipular dados do banco de dados
const filmesDAO = require('../model/DAO/filme.js');

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
    
    // Cria uma variavel do tipo json
    let filmesJSON = {};
    
    // Chama a função do DAO paraa buscar os dados do banco de dados
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    // Verifica se existem dados retornados do DAO
    if(dadosFilmes){
        // Montando a estrutura do JSOm
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        // Retorna o JSON montado
        return filmesJSON;
    }else 
    // Retorna false quaando não houverem dados
    return false;
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function(id){

}

module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}
