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
const filmesDAO = require('../model/DAO/filme.js');

const classificacaoDAO = require('../model/DAO/classificacao.js');

const generoDAO = require('../model/DAO/genero.js')

 
// Função para inserir um novo filme no banco de dados
const setInserirNovoFilme = async function(dadosFilme, contentType){

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosFilme = {}
    console.log(dadosFilme)

    // Validação de campos obrigatórios e consistência de dados
    if( dadosFilme.nome == ''               || dadosFilme.nome == undefined              || dadosFilme.nome.length > 80               ||
        dadosFilme.sinopse == ''            || dadosFilme.sinopse == undefined            || dadosFilme.sinopse.length > 65000        || 
        dadosFilme.duracao == ''            || dadosFilme.duracao == undefined           || dadosFilme.duracao.length > 8             || 
        dadosFilme.data_lancamento == ''    || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento.length > 10    || 
        dadosFilme.foto_capa == ''          || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa.length > 200         ||
        dadosFilme.valor_unitario.length > 8   ||
        dadosFilme.tbl_classificacao_id == '' || dadosFilme.tbl_classificacao_id == undefined || dadosFilme.tbl_classificacao_id == null   
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        // Variável para validar se poderemos chamar o DAO para inserir os dados
        let dadosValidated = false;

        // Validação de digitação para a data de relançamento que não é campo obrigatório
        if( dadosFilme.data_relancamento != null &&
             dadosFilme.data_relancamento != undefined && 
             dadosFilme.data_relancamento != ""
        ){
            if( dadosFilme.data_relancamento.length != 10 )
            return message.ERROR_REQUIRED_FIELDS
            else
            dadosValidated = true // Se a data estiver com exatos 10 caracteres
        }else{
            dadosValidated= true // Se a data não existir nos dados
        }
        // Validação para verificar se podemos encaminhar os dados para o DAO
        if(dadosValidated){

        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoFilme = await filmesDAO.insertFilme(dadosFilme);

        
        // Validação de inserção de dados no banco de dados 
        if(novoFilme){

            let idSelect = await filmesDAO.selectIdFilme();

            dadosFilme.id = Number (idSelect[0].id)
            
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosFilme.filme = dadosFilme;

            return resultDadosFilme; // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            }


         }
       }
    }else{
        return message.ERROR_CONTENT_TYPE // 415 Erro no content type
    }
}catch(error){
    return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
}
     


}



// Função para atualizar um filme existente
const setAtualizarFilme = async function (id, contentType, dadosFilme){
    try {
        
        let idFilme = id; 
        if (idFilme  == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID;
        }else{

            if(String(contentType).toLowerCase() == 'application/json'){

          

    

                // Cria a variável json
                let resultDadosFilme = {}
            
                // Validação de campos obrigatórios e consistência de dados
                if( dadosFilme.nome == ''               || dadosFilme.nome == undefined              || dadosFilme.nome.length > 80               ||
                    dadosFilme.sinopse == ''            || dadosFilme.sinopse == undefined            || dadosFilme.sinopse.length > 65000        || 
                    dadosFilme.duracao == ''            || dadosFilme.duracao == undefined           || dadosFilme.duracao.length > 8             || 
                    dadosFilme.data_lancamento == ''    || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento.length > 10    || 
                    dadosFilme.foto_capa == ''          || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa.length > 200         ||
                    dadosFilme.valor_unitario.length > 8  ||
                    dadosFilme.tbl_classificacao_id == '' || dadosFilme.tbl_classificacao_id == undefined || dadosFilme.tbl_classificacao_id == null   
                ){

                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
                 }else{
                    // Variável para validar se poderemos chamar o DAO para inserir os dados
                    let dadosValidated = false;
                  
            
                    // Validação de digitação para a data de relançamento que não é campo obrigatório
                    if( dadosFilme.data_relancamento != null &&
                         dadosFilme.data_relancamento != undefined && 
                         dadosFilme.data_relancamento != ""
                    ){
                        if( dadosFilme.data_relancamento.length != 10 )
                        return message.ERROR_REQUIRED_FIELDS
                        else
                        dadosValidated = true // Se a data estiver com exatos 10 caracteres
                    }else{
                        dadosValidated= true // Se a data não existir nos dados
                    }
                    // Validação para verificar se podemos encaminhar os dados para o DAO
                    if(dadosValidated){
            
                    
                    // Encaminha os dados para o DAO, inserir no Banco de Dados
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme);
            
                    
                    // Validação de inserção de dados no banco de dados 
                    if(novoFilme){
            
                        let idSelect = await filmesDAO.selectIdFilme();
            
                        dadosFilme.id = Number (idSelect[0].id)
                        
                        // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status;
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message;
                        resultDadosFilme.filme = dadosFilme;
            
                        return resultDadosFilme; // 201
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

// Função para excluir um filme existente
const setExcluirFilme = async  function(id){

    try {

        let idFilme = id; 
    
        if (idFilme  == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await filmesDAO.selectByIdFilme(idFilme)
 
            if(chamarConst.length > 0){
           
                let dadosFilme = await filmesDAO.deleteFilme(id)
        
                // Validação para verificar se existem dados encontrados
                if(dadosFilme){
                    // Validação para verificar se existem dados de retorno
                 
                    return message.SUCESS_DELETED_ITEM; //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
        
            }else{
                return message.ERROR_NOT_FOUND
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

// Função para listar os filmes existentes 
const getListarFilmes = async function(){
    
    let listaFilmes;
    // Cria uma variavel do tipo json
    let filmesJSON = {};

    if ((listaFilmes)){
        return listaFilmes;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    
    // Verifica se existem dados retornados do DAO
    if(dadosFilmes){
        for (let filme of dadosFilmes){
            filme.genero = await generoDAO.selectGeneroById(filme.tbl_genero_id)
            filme.classificacao = await classificacaoDAO.selectClassficationsById(filme.tbl_classificacao_id)
            delete filme.tbl_classificacao_id
            delete filme.tbl_genero_id
        }
        if(dadosFilmes.length > 0){
        // Montando a estrutura do JSOm
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        // Retorna o JSON montado
        return filmesJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function(id){
    // Recebe o id do filme
    let idFilme = id;

    // Variável para criar o json do filme
    let filmeJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosFilme = await filmesDAO.selectByIdFilme(id)

        // Validação para verificar se existem dados encontrados
        if(dadosFilme){
            for (let filme of dadosFilme){
                filme.genero = await generoDAO.selectGeneroById(filme.tbl_genero_id)
                filme.classificacao = await classificacaoDAO.selectClassficationsById(filme.tbl_classificacao_id)
                delete filme.tbl_classificacao_id
                delete filme.tbl_genero_id
            }
            // Validação para verificar se existem dados de retorno
            if(dadosFilme.length > 0){
            filmeJSON.filme = dadosFilme;
            filmeJSON.status_code = 200

            return filmeJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}


module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}
