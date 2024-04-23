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

// Inserir um novo filme
const insertAtor =  async function(dadosAtores) {
    
    try {

     let sql;
        if( dadosAtores.datafalecimento == null || 
            dadosAtores.datafalecimento == ''   ||
            dadosAtores.datafalecimento == undefined){
                sql = `insert into tbl_atores(nome, data_nascimento, foto, data_falecimento, biografia, sexo_id, nacionalidade_id) values ('${dadosAtores.nome}', '${dadosAtores.data_nascimento}', '${dadosAtores.foto}', null, '${dadosAtores.biografia}', '${dadosAtores.sexo_id}', '${dadosAtores.nacionalidade_id}')`
            }else {
                sql = `insert into tbl_atores(nome, data_nascimento, foto, data_falecimento, biografia) values ('${dadosAtores.nome}', '${dadosAtores.data_nascimento}', '${dadosAtores.foto}', '${dadosAtores.data_falecimento}', '${dadosAtores.biografia}', '${dadosAtores.sexo_id}', '${dadosAtores.nacionalidade_id}' )`

            }
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

const updateAtor =  async function(id, dadosAtores) {
    
    try {

        let sql;
           if( dadosAtores.datafalecimento == null || 
               dadosAtores.datafalecimento == ''   ||
               dadosAtores.datafalecimento == undefined){
                   sql = `update tbl_atores set nome = '${dadosAtores.nome}',  data_nascimento = '${dadosAtores.data_nascimento}',  foto = '${dadosAtores.foto}',  data_falecimento = null,  biografia = '${dadosAtores.biografia}', sexo_id ='${dadosAtores.sexo_id}', nacionalidade_id ='${dadosAtores.nacionalidade_id} where id = ${id}`
               }else {
                   sql = `update tbl_atores set nome = '${dadosAtores.nome}', data_nascimento =  '${dadosAtores.data_nascimento}', foto = '${dadosAtores.foto}', data_falecimento ='${dadosAtores.data_falecimento}',  biografia = '${dadosAtores.biografia}' where id = ${id}`
   
               }
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



const selectIdAtor = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_atores limit 1`;

    let atorId = await prisma.$queryRawUnsafe(sql)
     return atorId
    } catch (error) {
        return false
        
    }   
}
const selectAllAtors = async function(){

      // Script sql para listar todos os registros
      let sql = 'select * from tbl_atores order by id desc';

      // $queryRawUnsafe(sql)  = Encaminha apenas a variável
      // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 
  
      // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsAtores
      let rsAtores = await prisma.$queryRawUnsafe(sql)
       // Para usar await a função necessita ser async(async function)
  
      // Tratamento de erro para retornar dados ou retornar false
       if(rsAtores.length > 0)
       return rsAtores;
       else
          return false
  
}
const selectAtorsById = async function(id){
    try {
        // Realiza a busca do ator pelo ID
        let sql = `select * from tbl_atores where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}

const delectAtorsById = async function(id){
    try {
        let sql = `delete from tbl_atores where id = ${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql);
        return rsAtores;
        
    } catch (error) {
        return false
        
    }
}
module.exports = {
    selectAllAtors, 
    selectAtorsById,
    insertAtor,
    delectAtorsById,
    selectIdAtor,
    updateAtor
}

