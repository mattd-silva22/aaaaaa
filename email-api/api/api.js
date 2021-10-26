const express = require("express");
const app = express();


const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "matheus1822silva@gmail.com",
        pass: "teste@19141918"
    }
})

let mailOptions = {
    from: " 'Matheus'  <matheus1822silva@gmail.com>",
    to: "matheus.barretto2001@gmail.com",
    subject: " mentiras",
    text:"ola mundo !",
    html: "<h1>Teste h1</h1>"

};


const port = 3000;

app.use(express.static("./public"));



app.get("/teste", (req , res)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'text/html')
    res.end("<h1> ola mundo 235</h1>")
});

app.get("/email", (req , res)=> {
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


