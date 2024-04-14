/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Diretores
 * Data: 09/04/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllDirectors = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_diretores order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_diretores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsAtores
    let rsDiretores = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsDiretores.length > 0)
     return rsDiretores;
     else
        return false

    }
 const selectDirectorById  = async function(){
    
    try {
        // Script para selecionar determinado diretor pelo seu ID
    let sql = `select * from tbl_diretores where id  = ${id}`;

    let rsDiretores = await prisma.$queryRawUnsafe(sql);
    
    return rsDiretores;

} catch (error) {
    return false;

    }
}

const deleteDirectorById = async function(id){
    try {
        // Script para deletar determinado diretor pelo seu di
        let sql = `delete from tbl_diretores where id = ${id}`

        let rsDiretores = await prisma.$queryRawUnsafe(sql);
        return rsDiretores;
        
    } catch (error) {
        return false
        
    }
}

module.exports = {
    selectAllDirectors,
    selectDirectorById,
    deleteDirectorById
}
