const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//request - Receber dados
//response - Devolve dados

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

    console.log(categorias);
    response.json(categorias);
    response.status(200);
});

app.listen(8080, function(){
    console.log('Tá funcionando');
})

