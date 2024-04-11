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
const diretoresDAO = require('../model/DAO/diretores.js');


const getListarDiretores = async function(){
    let listaDiretores;
    
    let diretoresJSON = {};

    if(listaDiretores){
        return listaDiretores
    } else{
        let dadosDiretores = await diretoresDAO.selectAllDirectors();
            // Verifica se existem dados retornados do DAO
    if(dadosDiretores){
        if(dadosDiretores.length > 0){
        // Montando a estrutura do JSOm
        diretoresJSON.diretores = dadosDiretores;
        diretoresJSON.quantidade = dadosDiretores.length;
        diretoresJSON.status_code = 200;
        // Retorna o JSON montado
        return diretoresJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
    }
}

module.exports = {
    getListarDiretores
}