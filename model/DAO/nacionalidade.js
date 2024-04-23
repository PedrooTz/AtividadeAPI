const {PrismaClient}=require('@prisma/client')

const prisma =new PrismaClient()

const selectAllNacionalidades=async function(){
    try {
        let sql='select * from tbl_nacionalidade'
        let rsNacionalidades=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade=async function(id){
    try {
        let sql=`select * from tbl_nacionalidade where id =  ${id}`
        let rsNacionalidades=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllNacionalidades,
    selectByIdNacionalidade
}