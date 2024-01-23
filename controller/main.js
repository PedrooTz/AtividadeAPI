// Objetivo: Criar dois endpoints que façam requisições do json
//  Autor: Pedro Pedraga

const filmesAcme =require('../modulo/Filmes')

const getDadosFilmes = () => {

    let filmes = filmesAcme.filmes
    let arrayDados = []

    filmes.filmes.forEach( (dados) => {
        arrayDados.push(dados.id)
        arrayDados.push(dados.nome)
        arrayDados.push(dados.sinopse)
        arrayDados.push(dados.duracao)
        arrayDados.push(dados.data_lancamento)
        arrayDados.push(dados.data_relancamento)
        arrayDados.push(dados.foto_capa)
        arrayDados.push(dados.valor_unitario)
    })

    JsonDados.filmes = arrayDados

    return arrayDados
    
    };

   

    // ****************************************************************************

    const getIdFilmes = (id = "2") => {


       
        let filmes = filmesAcme.filmes
        let JsonDados
        let produtoId = id
        let status = false
       
        filmes.filmes.forEach((dados) => {
           
            if(dados.id == produtoId){
   
                let JsonDados = {
                    id: dados.id,
                    nome: dados.nome,
                    sinopse: dados.sinopse,
                    duracao: dados.duracao,
                    data_lancamento: dados.data_lancamento,
                    data_relancamento: dados.data_relancamento,
                    valor_unitario: dados.valor_unitario


                }
               
            status = true
            console.log(JsonDados)
   
            }
   
        })

        if(status){
            return JsonDados
        } else {
            return false
        }
    };
    
    
        
    console.log(getIdFilmes())
    // console.log(getDadosFilmes())

    module.exports = {
        getDadosFilmes,
        getIdFilmes
    }




    

   