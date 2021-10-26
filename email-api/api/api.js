const express = require("express");
const app = express();

const port = 3000;

app.use(express.static("./public"));



app.get("/teste", (req , res)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'text/html')
    res.end("<h1> ola mundo 235</h1>")
});



app.listen(port, '127.0.0.1', ()=>{

    console.log(`server rodando na porta ${port}`);
    console.log(`http://localhost:${port}/`);

});


