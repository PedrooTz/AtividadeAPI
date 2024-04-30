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
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js');

const getListarNacionalidade = async function(){
    
    let listaNacionalidade;
    // Cria uma variavel do tipo json
    let nacionalidadeJSON = {};

    if ((listaNacionalidade)){
        return listaNacionalidade;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosNacionalidade = await nacionalidadeDAO.selectAllNacionalidades();

    
    // Verifica se existem dados retornados do DAO
    if(dadosNacionalidade){
        if(dadosNacionalidade.length > 0){
        // Montando a estrutura do JSOm
        nacionalidadeJSON.nacionalidade = dadosNacionalidade;
        nacionalidadeJSON.quantidade = dadosNacionalidade.length;
        nacionalidadeJSON.status_code = 200;
        // Retorna o JSON montado
        return nacionalidadeJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

        }
    }
}



module.exports = {
    getListarNacionalidade,
}