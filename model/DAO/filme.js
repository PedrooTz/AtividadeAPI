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
const insertFilme =  async function(dadosFilme) {
    
    try {

     let sql;
        if( dadosFilme.data_relancamento == null || 
            dadosFilme.data_relancamento == ''   ||
             dadosFilme.data_relancamento == undefined){
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id,
                tbl_ator_filme_id,
                tbl_genero_id
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                 null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}',
                '${dadosFilme.tbl_classificacao_id}',
                '${dadosFilme.tbl_ator_filme_id}',
                '${dadosFilme.tbl_genero_id}'
            )`;

        }else{
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
            nome,
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario,
            tbl_classificacao_id,
            tbl_ator_filme_id,
            tbl_genero_id
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}',
            '${dadosFilme.tbl_classificacao_id}',
            '${dadosFilme.tbl_ator_filme_id}',
            '${dadosFilme.tbl_genero_id}'
        )`;
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

const selectIdFilme = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_filme limit 1`

    let filmeId = await prisma.$queryRawUnsafe(sql)
     return filmeId
    } catch (error) {
        return false
        
    }   
}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function(id, dadosFilme) {

    try {
        let sql
        if( dadosFilme.data_relancamento == null || 
            dadosFilme.data_relancamento == ''   ||
             dadosFilme.data_relancamento == undefined){
             // Script SQL para inserir no banco de dados
             sql = `update tbl_filme set
             nome = '${dadosFilme.nome}',
             sinopse = '${dadosFilme.sinopse}',
             data_lancamento = '${dadosFilme.data_lancamento}',
             data_relancamento = null,
             duracao = '${dadosFilme.duracao}',
             foto_capa = '${dadosFilme.foto_capa}',
             valor_unitario ='${dadosFilme.valor_unitario}',
             tbl_classificacao_id ='${dadosFilme.tbl_classificacao_id}',
             tbl_genero_id ='${dadosFilme.tbl_genero_id}',
             tbl_ator_filme_id ='${dadosFilme.tbl_ator_filme_id}'
             where id = ${id}`;

        }else{
             // Script SQL para inserir no banco de dados
            sql = `UPDATE tbl_filme SET
                nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = '${dadosFilme.data_relancamento}',
                duracao = '${dadosFilme.duracao}',
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario ='${dadosFilme.valor_unitario}',
                tbl_classificacao_id ='${dadosFilme.tbl_classificacao_id}',
                tbl_genero_id ='${dadosFilme.tbl_genero_id}',
                tbl_ator_filme_id ='${dadosFilme.tbl_ator_filme_id}'
                where id = ${id}`;
        } 
        let result = await prisma.$executeRawUnsafe(sql);
        if(result )
            return true;
        else
            return false;
    } catch (error) {
        console.log(error)
        return false;
    }

}

// Excluir um filme filtrando pelo id
const deleteFilme = async function(id) {

    try {
        // Realiza a busca do filme pelo ID
        let sql = `delete from tbl_filme where id = ${id}`
    
        // Executa no banco de dados o script sql
        let rsFilme = await prisma.$queryRawUnsafe(sql);
            return rsFilme;
    
        } catch (error) {
            return false
            
        }

}

// Listar todos os filmes presentes na tabela 
const selectAllFilmes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_filme order by id desc';

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
    try {
    // Realiza a busca do filme pelo ID
    let sql = `select * from tbl_filme where id = ${id}`

    // Executa no banco de dados o script sql
    let rsFilme = await prisma.$queryRawUnsafe(sql);
        return rsFilme;

    } catch (error) {
        return false;
        
    }
} 



module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectIdFilme
}

