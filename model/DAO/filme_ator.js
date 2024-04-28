const {PrismaClient}=require('@prisma/client')

const prisma =new PrismaClient()

const selectAllFilmesAtores=async function(){
    try {
        let sql='select * from tbl_ator_filme'
        let rsNacionalidades=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllFilmesAtores
}