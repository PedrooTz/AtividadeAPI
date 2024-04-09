
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
const getListarAtoresById = async function (id){
   
        // Recebe o id do filme
        let idAtores = id;
    
        // Variável para criar o json do atores
        let atoresJSON = {};
    
        // Validação para ID vazio, indefinido ou não numérico
        if (idAtores == '' || idAtores == undefined || isNaN(idAtores)){
            return message.ERROR_INVALID_ID;
        }else{
    
            // Solicita para o DAO a busca do ator pelo iD
            let dadosAtores = await atoresDAO.selectAtorsById(id)

    
            // Validação para verificar se existem dados encontrados
            if(dadosAtores){
                // Validação para verificar se existem dados de retorno
                if(dadosAtores.length > 0){
                atoresJSON.atores = dadosAtores;
                atoresJSON.status_code = 200

                return atoresJSON; // 200
            }else{
                return message.ERROR_NOT_FOUND; //404
            }
            }else{
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    
    
    }

const setDeleteAtor = async function(id){
    try {
        
        let idAtores = id;

        if(idAtores == '' || idAtores == undefined || isNaN(idAtores)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await atoresDAO.selectAtorsById(idAtores)

            if(chamarConst.length > 0){
                let dadosAtores = await atoresDAO.delectAtorsById(id)

                if(dadosAtores){
                    return message.SUCESS_DELETED_ITEM
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            
        }else {
            return message.ERROR_NOT_FOUND
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
    


module.exports = {
    getListarAtores,
    getListarAtoresById,
    setDeleteAtor
    
}