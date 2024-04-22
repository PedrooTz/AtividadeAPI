/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de Classificação
 * Data: 10/04/2024
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

            return classficacaoJSON; // 200
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

const setInserirNovaClassificacao = async (dadosClassificacao, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultdadosClassificacao = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosClassificacao.categoria == ''                       || dadosClassificacao.categoria == undefined              || dadosClassificacao.categoria.length > 150 ||
        dadosClassificacao.descricao == ''            || dadosClassificacao.descricao == undefined            || dadosClassificacao.descricao.length > 150       || 
        dadosClassificacao.simbolo == ''                       || dadosClassificacao.simbolo == undefined           ||dadosClassificacao.simbolo .length > 65000         
      
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novaClassficacao = await classificacaoDAO.insertClassificacao(dadosClassificacao);

        let idSelect = await classificacaoDAO.selectIdClassificacao();

        dadosClassificacao.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novaClassficacao){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultdadosClassificacao.status = message.SUCESS_CREATED_ITEM.status;
            resultdadosClassificacao.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultdadosClassificacao.message = message.SUCESS_CREATED_ITEM.message;
            resultdadosClassificacao.classificacoes = dadosClassificacao;

            return resultdadosClassificacao; // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            
    
         }
       }
    }else{
        return message.ERROR_CONTENT_TYPE // 415 Erro no content type
    }
}catch(error){
    console.log(error)
    return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
}
     
}
const setUpdateClassificacao = async function(id, contentType, dadosClassificacao){
    try{
        let idClassificacao = id;
        console.log(idClassificacao)

        if(idClassificacao == '' || idClassificacao == undefined || isNaN (idClassificacao)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateClassificacaoJson = {};
            
            if(dadosClassificacao.categoria == ''    || dadosClassificacao.categoria == undefined       ||  dadosClassificacao.categoria == null               || dadosClassificacao.categoria.length > 255 ||
            dadosClassificacao.descricao == ''  ||   dadosClassificacao.descricao == undefined  || dadosClassificacao.descricao == null   || dadosClassificacao.descricao > 255 ||
            dadosClassificacao.simbolo == '' ||  dadosClassificacao.simbolo == undefined || dadosClassificacao.simbolo == null  || dadosClassificacao.simbolo > 65000      
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let classificacaoById = await classificacaoDAO.selectClassficationsById(id)

            if(classificacaoById.length > 0){
                if (validateStatus){
                    let uptadeClassificacao = await classificacaoDAO.updateClassificacao(id,dadosClassificacao);
    
                    if(uptadeClassificacao){
                      
                        updateClassificacaoJson.classificacao = dadosClassificacao
                        updateClassificacaoJson.status = message.SUCESS_UPDATED_ITEM.status
                        updateClassificacaoJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        updateClassificacaoJson.message = message.SUCESS_UPDATED_ITEM.message
    
                        return updateClassificacaoJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}



module.exports = {
    getListarClassficacao,
    getListarClassficacaoById,
    setDeleteClassficacao,
    setInserirNovaClassificacao,
    setUpdateClassificacao
}