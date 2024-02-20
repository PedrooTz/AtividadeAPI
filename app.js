/********************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 ********************************************************/

/**********************************************
 * Para realizar a conexão com o banco de dados 
 * precisamos utilizar uma dependencia:
 *    - SEQUELIZE ORM
 *    - PRISMA    ORM 
 *    - FASTFY    ORM
 * 
 * Prisma - Para utilizar o prisma é necessário os comandos abaixos
 *     npm install prisma --save
 *     npm install @prisma/client --save
 *     
 * Para inicializar o prisma:
 *     npx prisma init
 * 
 *******************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//request - Receber dados
//response - Devolve dados

// *************************** Imports e arquivos e bibliotecas ************************************ //

    const controllerFilmes = require('./controller/controller_filme.js');

// ************************************************************************************************* //
//Função para configurar as permissões do cors
app.use((request, response, next)=>{
    //Configura quem poderá fazer requisições na API (* - libera para todos | IP restringe o acesso)
    response.header('Access-Control-Allow-Origin', '*');
    //Configura os metodos que poderão ser utilizados na API (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());

    next();
})

app.get('/v1/filmesacme', cors(), async function(request, response,next){
    let controleFilme = require('./controller/main');
    let categorias = controleFilme.getDadosFilmes();

    response.json(categorias);
    response.status(200);
});

app.get('/v2/filmesacme/:id', cors(), async function(request, response,next){

    let idFilme = request.params.id
    let controleFilme = require('./controller/main');
    let categorias = controleFilme.getIdFilmes(idFilme);

    response.json(categorias);
    response.status(200);
});

    app.get('/v2/acmefilmes/filmes', cors(), async function(request,response,next){
    
        // Chama a função para retornar os dados do filme
        let dadosFilmes = await controllerFilmes.getListarFilmes();

        // Validação para verificar se existem dados
        if(dadosFilmes){
            response.json(dadosFilmes)
            response.status(200);
        }else{
            response.json({message: 'Nenhum registro encontrado'})
            response.status()
        }
    });

// Buscar o filme pelo seu nome

    app.get('/v2/acmefilmes/filmes', cors(), async function(request,response,next){


        if(filtroFilmes){
        response.json(filtroFilmes)
        response.status(200);
        } else {
            response.json({ message: 'Nenhum registro encontrado'})
            response.status()
        }
    });
// Endpoint: Retorna os dados do filme filtrando pelo ID

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idFilme = request.params.id;

    // Solicita para a controller o filme filtrando pelo id
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

     response.status(dadosFilme.status_code);
    response.json(dadosFilme);
   
});

app.listen(8080, function(){
        console.log('Tá funcionando, testa aí');
})