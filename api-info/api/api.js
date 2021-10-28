require('dotenv').config()
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();



const port = 3000;

app.use(express.static("./public"));
app.use(
    express.urlencoded({
      extended: true
    })
  )



app.post("/teste2", (req , res)=> {
    res.statusCode = 200;
    res.end("ola mundo")
    console.log(req)
});

app.get("/send-email", (req , res)=> {

    let mailOptions = {
        from: " 'Matheus'  <matheus1822silva@gmail.com>",
        to: "matheus.barretto2001@gmail.com",
        subject: " mentiras",
        text:"ola mundo  2!",
        html: "<h1>Teste h1</h1>"
    
    };

    transporter.sendMail(mailOptions ,(err , data)=>{
        if(err) {
            console.log("deu ruim", err)
            res.statusCode = 300;
            res.setHeader('Content-Type' , 'text/html')
            res.end("<h1>ruim</h1>")
        } else {
            console.log("mentira enviada")
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'text/html')
            res.end("<h1>bom</h1>")
        }
    })
    
});



app.listen(port, '127.0.0.1', ()=>{

    console.log(`server rodando na porta ${port}`);
    console.log(`http://localhost:${port}/`);

});


