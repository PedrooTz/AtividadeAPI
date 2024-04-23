/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de Atores
 * Data: 09/04/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const atoresDAO = require('../model/DAO/atores.js');

const sexoDAO = require('../model/DAO/sexo.js')

const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')


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
            if(dadosAtores.length > 0){
                for (let ator of dadosAtores){
                    let sexoAtor = await sexoDAO.selectByIdSexo(ator.sexo_id)
                    ator.sexo = sexoAtor 
                }
                for (let ator of dadosAtores){
                    let nacionalidadeator = await nacionalidadeDAO.selectByIdNacionalidade(ator.nacionalidade_id)
                    ator.nacionalidade = nacionalidadeator 
                }


        // Montando a estrutura do JSOn
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
}
const getListarAtoresById = async function (id){
   
        // Recebe o id do ator
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
                for (let ator of dadosAtores){
                    let sexoAtor = await sexoDAO.selectByIdSexo(ator.sexo_id)
                    ator.sexo = sexoAtor 
                }
                for (let ator of dadosAtores){
                    let nacionalidadeator = await nacionalidadeDAO.selectByIdNacionalidade(ator.nacionalidade_id)
                    ator.nacionalidade = nacionalidadeator 
                }
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

const setInserirNovoAtor = async (dadosAtores, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosAtor = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosAtores.nome == ''                       || dadosAtores.nome == undefined              || dadosAtores.nome.length > 150              ||
        dadosAtores.data_nascimento == ''            || dadosAtores.data_nascimento == undefined            || dadosAtores.data_nascimento.length > 10       || 
        dadosAtores.foto == ''                       || dadosAtores.foto == undefined           ||dadosAtores.foto.length > 65000           || 
        dadosAtores.biografia == ''                  || dadosAtores.biografia == undefined   ||dadosAtores.biografia.length > 65000         || 
        dadosAtores.sexo_id == ''                    || dadosAtores.sexo_id == undefined     ||    dadosAtores.sexo_id.length > 1    
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        // Variável para validar se poderemos chamar o DAO para inserir os dados
       
        // Validação de digitação para a data de relançamento que não é campo obrigatório
        if( dadosAtores.data_falecimento != null &&
            dadosAtores.data_falecimento != undefined && 
            dadosAtores.data_falecimento != '' &&
            dadosAtores.data_falecimento.length > 10
        ){
         
            return message.ERROR_REQUIRED_FIELDS

        }
        // Validação para verificar se podemos encaminhar os dados para o DAO
      

        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoAtor = await atoresDAO.insertAtor(dadosAtores);

        let idSelect = await atoresDAO.selectIdAtor();

        dadosAtores.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoAtor){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosAtor.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosAtor.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosAtor.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosAtor.atores = dadosAtores;

            return resultDadosAtor; // 201
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

const setUpdateAtor = async function(id, contentType, dadosAtores){
    try {
        
        let idAtores = id; 
        if (idAtores  == '' || idAtores == undefined || isNaN(idAtores)){
            return message.ERROR_INVALID_ID;
        }else{

            if(String(contentType).toLowerCase() == 'application/json'){

    
                // Cria a variável json
                let resultDadosAtor = {}
            
                // Validação de campos obrigatórios e consistência de dados
                if( dadosAtores.nome == ''               || dadosAtores.nome == undefined              || dadosAtores.nome.length > 80               ||
                dadosAtores.data_nascimento == ''            || dadosAtores.data_nascimento == undefined            || dadosAtores.data_nascimento.length > 10       || 
                dadosAtores.foto == ''            || dadosAtores.foto == undefined           ||dadosAtores.foto.length > 200             || 
                dadosAtores.biografia == ''    || dadosAtores.biografia == undefined   ||dadosAtores.biografia.length > 65000   
                
            ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
                 }else{
                    // Variável para validar se poderemos chamar o DAO para inserir os dados
                    let dadosValidated = false;
            
                    // Validação de digitação para a data de relançamento que não é campo obrigatório
                    if( dadosAtores.data_falecimento != null &&
                         dadosAtores.data_falecimento != undefined && 
                         dadosAtores.data_falecimento != ""
                    ){
                        if( dadosAtores.data_falecimento.length != 10 )
                        return message.ERROR_REQUIRED_FIELDS
                        else
                        dadosValidated = true // Se a data estiver com exatos 10 caracteres
                    }else{
                        dadosValidated= true // Se a data não existir nos dados
                    }
                    // Validação para verificar se podemos encaminhar os dados para o DAO
                    if(dadosValidated){
            
                    
                    // Encaminha os dados para o DAO, inserir no Banco de Dados
                    let novoAtor = await atoresDAO.insertAtor(dadosAtores);
            
                    
                    // Validação de inserção de dados no banco de dados 
                    if(novoAtor){
            
                        let idSelect = await atoresDAO.selectAtorsById();
            
                        dadosAtores.id = Number (idSelect[0].id)
                        
                        // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                        resultDadosAtor.status = message.SUCESS_CREATED_ITEM.status;
                        resultDadosAtor.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultDadosAtor.message = message.SUCESS_CREATED_ITEM.message;
                        resultDadosAtor.atores = dadosAtores;
            
                        return resultDadosAtor; // 201
                    } else{
                        return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
                        }
            
            
                     }
                   }
                }else{
                    return message.ERROR_CONTENT_TYPE // 415 Erro no content type
                }


        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
        
    }

}






    


module.exports = {
    getListarAtores,
    getListarAtoresById,
    setDeleteAtor,
    setInserirNovoAtor,
    setUpdateAtor
    
}