/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de diretores
 * Data: 11/04/2024
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
const getListarDiretorById = async function (id){
   
    // Recebe o id do filme
    let idDiretor = id;

    // Variável para criar o json do atores
    let diretorJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosDiretores = await diretoresDAO.selectDirectorById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosDiretores){
            // Validação para verificar se existem dados de retorno
            if(dadosDiretores.length > 0){
            diretorJSON.diretores = dadosDiretores;
            diretorJSON.status_code = 200

            return diretorJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}


const setDeleteDiretor = async function(id){
    try {
        
        let idDiretor = id;

        if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await classificacaoDAO.selectClassficationsById(idDiretor)

            if(chamarConst.length > 0){
                let dadosDiretores = await classificacaoDAO.deleteClassficationById(id)

                if(dadosDiretores){
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
    getListarDiretores,
    setDeleteDiretor,
    getListarDiretorById
}