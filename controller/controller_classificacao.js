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
const classificacaoDAO = require('../model/DAO/classificacao.js');

const getListarClassficacao = async function(){
    
    let listaClassificacao;
    // Cria uma variavel do tipo json
    let classficacaoJSON = {};

    if ((listaClassificacao)){
        return listaClassificacao;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosClassificacao = await classificacaoDAO.selectAllClassfications();

    
    // Verifica se existem dados retornados do DAO
    if(dadosClassificacao){
        if(dadosClassificacao.length > 0){
        // Montando a estrutura do JSOm
        classficacaoJSON.classificacoes = dadosClassificacao;
        classficacaoJSON.quantidade = dadosClassificacao.length;
        classficacaoJSON.status_code = 200;
        // Retorna o JSON montado
        return classficacaoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

        }
    }
}

const getListarClassficacaoById = async function (id){
   
    // Recebe o id do filme
    let idClassificacao = id;

    // Variável para criar o json do atores
    let classficacaoJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosClassificacao = await classificacaoDAO.selectClassficationsById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosClassificacao){
            // Validação para verificar se existem dados de retorno
            if(dadosClassificacao.length > 0){
            classficacaoJSON.atores = dadosClassificacao;
            classficacaoJSON.status_code = 200

            return atoresJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}


const setDeleteClassficacao = async function(id){
    try {
        
        let idClassificacao = id;

        if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await classificacaoDAO.selectClassficationsById(idClassificacao)

            if(chamarConst.length > 0){
                let dadosClassificacao = await classificacaoDAO.deleteClassficationById(id)

                if(dadosClassificacao){
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
    getListarClassficacao,
    getListarClassficacaoById,
    setDeleteClassficacao
}