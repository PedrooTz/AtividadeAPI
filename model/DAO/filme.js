/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/


// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Inserir um novo filme
const insertFilme =  async function() {

}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function(id) {

}

// Excluir um filme filtrando pelo id
const deleteFilme = async function(id) {

}

// Listar todos os filmes presentes na tabela 
const selectAllFilmes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_filme';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_filme) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)


    // Tratamento de erro para retornar dados ou retornar false
     if(rsFilmes.length > 0)
     return rsFilmes;
     else
        return false


}

// Listar filme filtrando pelo ID
const selectByIdFilme =  async function(id){

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}

