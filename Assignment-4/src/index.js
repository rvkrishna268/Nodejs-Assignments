const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.use(express.static("public"));
app.set('views','./views');
app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.send("Hello world!");
})
app.get("/form",(req,res)=>{
    res.render("form.ejs");
})
app.post("/add",(req,res)=>{
    //console.log(req.body)
    // console.log(typeof(req.body.num1));
    // console.log(typeof(Number(req.body.num1)));
    let num1=Number(req.body.num1);
    let num2=Number(req.body.num2);
    if(num1<-1000000||num2<-1000000){
        res.status(500).send({
            "status": "error",
            "message": "Underflow",
        })
    }
    else if(num1>1000000||num2>1000000){
        res.status(500).send({
            "status": "error",
            "message": "Overflow",
        })
    }
    else if((Number.isNaN(num1))||(Number.isNaN(num2))){
        console.log("ok");
        res.status(500).send({
            "status": "error",
            "message": "Invalid data types",
        })
    }
    else{
        res.status(200).send({
            "status": "success",
            "message": "the sum of given two numbers",
            "sum": num1+num2
        })
        res.redirect("/")
    }
})
app.post("/sub",(req,res)=>{
    // console.log(req.body)
    let num1=Number(req.body.num1);
    let num2=Number(req.body.num2);
    if(num1<-1000000||num2<-1000000){
        res.status(500).send({
            "status": "error",
            "message": "Underflow",
        })
    }
    else if(num1>1000000||num2>1000000){
        res.status(500).send({
            "status": "error",
            "message": "Overflow",
        })
    }
    else if((Number.isNaN(num1))||(Number.isNaN(num2))){
        res.status(500).send({
            "status": "error",
            "message": "Invalid data types",
        })
    }
    else{
        res.status(200).send({
            "status": "success",
            "message": "the difference of given two numbers",
            "difference": num1-num2
        })
        res.redirect("/")
    }
})
app.post("/multiply",(req,res)=>{
    // console.log(req.body)
    let num1=Number(req.body.num1);
    let num2=Number(req.body.num2);
    if(num1<-1000000||num2<-1000000){
        res.status(500).send({
            "status": "error",
            "message": "Underflow",
        })
    }
    else if(num1>1000000||num2>1000000){
        res.status(500).send({
            "status": "error",
            "message": "Overflow",
        })
    }
    else if((Number.isNaN(num1))||(Number.isNaN(num2))){
        res.status(500).send({
            "status": "error",
            "message": "Invalid data types",
        })
    }
    else{
        res.status(200).send({
            "status": "success",
            "message": "The product of given two numbers",
            "result": num1*num2
        })
        res.redirect("/")
    }
})
app.post("/divide",(req,res)=>{
    // console.log(req.body)
    let num1=Number(req.body.num1);
    let num2=Number(req.body.num2);
    if(num2===0){
            res.status(500).send({
                "status": "error",
                "message": "Cannot divide by zero",
        })
        res.redirect("/")
    }
    else{
        if(num1<-1000000||num2<-1000000){
            res.status(500).send({
                "status": "error",
                "message": "Underflow",
            })
        }
        else if(num1>1000000||num2>1000000){
            res.status(500).send({
                "status": "error",
                "message": "Overflow",
            })
        }
        else if((Number.isNaN(num1))||(Number.isNaN(num2))){
            res.status(500).send({
                "status": "error",
                "message": "Invalid data types",
            })
        }
        else{
            res.status(200).send({
                "status": "success",
                "message": "the division of given two numbers",
                "result": (num1/num2).toFixed(2)
            })
            res.redirect("/")
        }
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;
