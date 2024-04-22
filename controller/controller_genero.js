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

const setInserirNovoGenero = async (dadosGenero, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosGenero = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosGenero.nome == ''                       || dadosGenero.nome == undefined              || dadosGenero.nome.length > 150
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoGenero = await generoDAO.insertGenero(dadosGenero);

        let idSelect = await generoDAO.selectIdGenero();

        dadosGenero.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoGenero){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosGenero.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosGenero.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosGenero.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosGenero.genero = dadosGenero;

            return resultDadosGenero; // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            
    
         }
       }
    }else{
        return message.ERROR_CONTENT_TYPE // 415 Erro no content type
    }
}catch(error){
    return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
}
     
}

const setDeleteGenero = async function(id){
    try {
        
        let idGeneros = id;

        if(idGeneros == '' || idGeneros == undefined || isNaN(idGeneros)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await generoDAO.selectGeneroById(idGeneros)

            if(chamarConst.length > 0){
                let dadosGenero = await generoDAO.selectGeneroById(id)

                if(dadosGenero){
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

const setUpdateGenero = async function(dadosGenero, contentType, idGenero){
    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosGenero = {}

            console.log(idGenero)
        
            if( 

                
                idGenero == ''         || idGenero == undefined          ||
                dadosGenero.nome == '' || dadosGenero.nome == undefined  || dadosGenero.nome.length > 100
             
            ){                
                return message.ERROR_REQUIRED_FIELDS // 400
                
            }else{
                
                let generoAtualizado = await generosDAO.updateGenero(dadosGenero, idGenero)
                                        
                dadosGenero.id = idGenero

                if(generoAtualizado){
                    resultDadosGenero.status = message.SUCESS_UPDATED_ITEM.status
                    resultDadosGenero.status_code = message.SUCESS_UPDATED_ITEM.status_code
                    resultDadosGenero.message = message.SUCESS_UPDATED_ITEM.message
                    resultDadosGenero.genero = dadosGenero
                    return resultDadosGenero
                }else {

                    return message.ERROR_INTERNAL_SERVER_DB // 500

                }
                
            }
    
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }   

}


module.exports = {
    getListarGenero,
    getListarGenerosById,
    setInserirNovoGenero,
    setDeleteGenero,
    setUpdateGenero
}