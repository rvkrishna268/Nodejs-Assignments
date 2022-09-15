const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');
const {check,body,validationResult}=require("express-validator");
// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario",async (req,res)=>{
    try{
        const marioData=await marioModel.find();
        res.json({
            status:"success",
            marioData
        })
    }catch(err){
        res.json({
            status:"failure",
            message:err.message
        })
    }
})

app.get("/mario/:id",async (req,res)=>{
    try{
        const marioData=await marioModel.find({_id:req.params.id});
        res.json({
            status:"success",
            marioData
        })
    }catch(error){
        res.status(400).json({
            status:"failure",
            message:error.message
        })
    }
})
//,body("weight").isNumeric()
app.post("/mario",body("name").isAlpha().withMessage('name is missing'),body("weight").isNumeric().withMessage('number is missing'),async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const marioData=await marioModel.create(req.body);
        res.status(201).json({
            status:"success",
            marioData
        })
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
})

app.patch("/mario/:id", async (req, res) => {
    try{  
     const marioData=await marioModel.updateOne({
      _id:req.params.id
     },{
      $set:{
        name:req.body.name,
        weight:req.body.weight,
        }
     })
      res.json({
        status:"success",
        result:marioData
      })
    }
    catch(err){
      res.status(400).json({
        status:"failed",
        message: err.message
      })
    }
  });

  app.delete("/mario/:id", async (req, res) => {
    try{
      const marioData=await marioModel.deleteOne({_id:req.params.id});
      res.status(200).json({
        status:"success",
        message:"character deleted",
        marioData
      })
    }
    catch(err){
      res.status(500).json({
        status:"failure",
        message:err.message
      })
    }
  });

module.exports = app;