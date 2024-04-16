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
    const insertGenero =  async function(dadosGenero) {
    
        try {
    
         let sql = `insert into tbl_genero(nome) values ('${dadosGenero.nome}')`
                
            // Executa o script SQL no banco de dados | Devemos usar execute e não query!
            // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
            let result = await prisma.$executeRawUnsafe(sql);
    
            // Validação para verificar se o insert funcionou no banco de dados
            if(result )
                return true;
            else
                return false;
    
        } catch (error) {
    
            return false;
            
        }
    }

    const selectIdGenero = async function() {

        try {
    
        let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_genero limit 1`;
    
        let atorId = await prisma.$queryRawUnsafe(sql)
         return atorId
        } catch (error) {
            return false
            
        }   
    }
  
    const updateGenero =  async function(dadosGenero, idGenero) {
    
 
    try {
        let sql = `update tbl_genero set nome = '${dadosGenero.nome}' where id = ${idGenero}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

    }
    
    
       

module.exports = {
    selectAllGeneros,
    selectGeneroById,
    deleteGeneroById,
    insertGenero,
    selectIdGenero,
    updateGenero

}

