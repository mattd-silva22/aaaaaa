const express = require("express");
const fetch = require("cross-fetch");

let app = express();

app.use(express.static("../public"))

const porta = 3000;

async function getDataFromAPI() {
    let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
    let res = await fetch(url);


    let data = await res.json();
    

    console.log(data)
    return data
};





app.get("/movie-db/:page", async (req ,res )=>{

    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${req.params.page}`
    let res2 = await fetch(url);


    let data = await res2.json();

    res.statusCode = 200;
    res.json(data)

})

app.listen(porta, '127.0.0.1', ()=>{

    console.log(` server rodando na porta ${porta}`);
    console.log(`http://localhost:${porta}/`)

})