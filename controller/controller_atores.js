
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
const atoresDAO = require('../model/DAO/atores.js');



const getListarAtores = async function(){
    
    let listaAtores;
    // Cria uma variavel do tipo json
    let atoresJSON = {};

    if ((listaAtores)){
        return listaAtores;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosAtores = await atoresDAO.selectAllAtors();

    
    // Verifica se existem dados retornados do DAO
    if(dadosAtores){
        if(dadosAtores.length > 0){
        // Montando a estrutura do JSOm
        atoresJSON.atores = dadosAtores;
        atoresJSON.quantidade = dadosAtores.length;
        atoresJSON.status_code = 200;
        // Retorna o JSON montado
        return atoresJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

module.exports = {
    getListarAtores
    
}