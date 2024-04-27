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
        for (let diretor of dadosDiretores){
            // ator.sexo = await sexoDAO.selectByIdSexo(ator.sexo_id)
            diretor.nacionalidade = await diretoresDAO.selectDirectorById(diretor.id_nacionalidade)
            delete diretor.id_nacionalidade 
        }

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
            let chamarConst = await diretoresDAO.selectDirectorById(idDiretor)

            if(chamarConst.length > 0){
                let dadosDiretores = await diretoresDAO.deleteDirectorById(id)

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

const setInserirNovoDiretor = async (dadosDiretores, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosDiretor = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosDiretores.nome == ''                       || dadosDiretores.nome == undefined              || dadosDiretores.nome.length > 150              ||
        dadosDiretores.data_nascimento == ''            || dadosDiretores.data_nascimento == undefined            || dadosDiretores.data_nascimento.length > 10       || 
        dadosDiretores.foto == ''                       || dadosDiretores.foto == undefined           ||dadosDiretores.foto.length > 65000           || 
        dadosDiretores.biografia == ''                  || dadosDiretores.biografia == undefined   ||dadosDiretores.biografia.length > 65000   
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        // Variável para validar se poderemos chamar o DAO para inserir os dados
       
        // Validação de digitação para a data de relançamento que não é campo obrigatório
        if( dadosDiretores.data_falecimento != null &&
            dadosDiretores.data_falecimento != undefined && 
            dadosDiretores.data_falecimento != '' &&
            dadosDiretores.data_falecimento.length > 10
        ){
         
            return message.ERROR_REQUIRED_FIELDS

        }
        // Validação para verificar se podemos encaminhar os dados para o DAO
      

        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoDiretor = await diretoresDAO.insertDiretor(dadosDiretores);

        let idSelect = await diretoresDAO.selectIdDiretor();

        dadosDiretores.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoDiretor){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosDiretor.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosDiretor.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosDiretor.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosDiretor.diretores = dadosDiretores;

            return resultDadosDiretor; // 201
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

const setUpdateDiretor = async function(id, contentType, dadosDiretores){
    try {
        
        let idDiretor = id; 
        if (idDiretor  == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID;
        }else{

            if(String(contentType).toLowerCase() == 'application/json'){

    
                // Cria a variável json
                let resultDadosDiretor = {}
            
                // Validação de campos obrigatórios e consistência de dados
                if( dadosDiretores.nome == ''               || dadosDiretores.nome == undefined              || dadosDiretores.nome.length > 80               ||
                dadosDiretores.data_nascimento == ''            || dadosDiretores.data_nascimento == undefined            || dadosDiretores.data_nascimento.length > 10       || 
                dadosDiretores.foto == ''            || dadosDiretores.foto == undefined           ||dadosDiretores.foto.length > 200             || 
                dadosDiretores.biografia == ''    || dadosDiretores.biografia == undefined   ||dadosDiretores.biografia.length > 65000   
                
            ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
                 }else{
                    // Variável para validar se poderemos chamar o DAO para inserir os dados
                    let dadosValidated = false;
            
                    // Validação de digitação para a data de relançamento que não é campo obrigatório
                    if( dadosDiretores.data_falecimento != null &&
                         dadosDiretores.data_falecimento != undefined && 
                         dadosDiretores.data_falecimento != ""
                    ){
                        if( dadosDiretores.data_falecimento.length != 10 )
                        return message.ERROR_REQUIRED_FIELDS
                        else
                        dadosValidated = true // Se a data estiver com exatos 10 caracteres
                    }else{
                        dadosValidated= true // Se a data não existir nos dados
                    }
                    // Validação para verificar se podemos encaminhar os dados para o DAO
                    if(dadosValidated){
            
                    
                    // Encaminha os dados para o DAO, inserir no Banco de Dados
                    let novoDiretor = await diretoresDAO.selectDirectorById(id);
            
                    
                    // Validação de inserção de dados no banco de dados 
                    if(novoDiretor){

                      
            
                        let idSelect = await diretoresDAO.updateDiretor(id, dadosDiretores);
            
                        dadosDiretores.id = Number (idSelect[0].id)

                        
                        // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                        resultDadosDiretor.status = message.SUCESS_CREATED_ITEM.status;
                        resultDadosDiretor.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultDadosDiretor.message = message.SUCESS_CREATED_ITEM.message;
                        resultDadosDiretor.diretores = dadosDiretores;
            
                        return resultDadosDiretor; // 201
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
    getListarDiretores,
    setDeleteDiretor,
    getListarDiretorById,
    setInserirNovoDiretor,
    setUpdateDiretor
}