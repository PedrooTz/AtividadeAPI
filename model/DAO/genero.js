/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Filmes
 * Data: 09/04/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllGeneros = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_genero order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_classificacao) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
    let rsGenero = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsGenero.length > 0)
     return rsGenero;
     else
        return false

}

const selectGeneroById = async function(id){
        try {
            // Realiza a busca da classificacao pelo ID
            let sql = `select * from tbl_genero where id = ${id}`;
        
            // Executa no banco de dados o script sql
            let rsGenero = await prisma.$queryRawUnsafe(sql);
    
                return rsGenero;
        
            } catch (error) {
                return false;
                
            }
    }

const deleteGeneroById = async function(id){
        try {
            let sql = `delete from tbl_genero where id = ${id}`
    
            let rsGenero = await prisma.$queryRawUnsafe(sql);
            return rsGenero;
            
        } catch (error) {
            return false
            
        }
    }

module.exports = {
    selectAllGeneros,
    selectGeneroById,
    deleteGeneroById
}

