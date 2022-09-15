const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here
router.get('/blog',async (req,res)=>{
    let blog;
    try{  
      // console.log(req.params);
      if(req.query.search){
        blog=await Blog.find({
          topic:req.query.search
        }).skip(5*(Number(req.query.page)-1)).limit(5);
      }
      else{
        blog=await Blog.find();
      }
      res.json({
        status:"success",
        result:blog
      })
    }
    catch(err){
      res.status(500).json({
        status:"failed",
        message: err.message
      })
    }
})

router.post("/blog", async (req, res) => {
  try{
    const blog=await Blog.create(req.body);
    res.json({
      status:"success",
      result: blog
    });
  }
  catch(err){
    res.status(500).json({
      status:"failure",
      message:err.message
    })
  }
});

router.put("/blog/:id", async (req, res) => {
  try{  
   const blog=await Blog.updateOne({
    _id:req.params.id
   },{
    $set:{
      topic:req.body.topic,
      description:req.body.description,
      posted_at:req.body.posted_at,
      posted_by:req.body.posted_by
    }
   },{
    runValidators:true
   })
    res.json({
      status:"success",
      result:blog
    })
  }
  catch(err){
    res.status(500).json({
      status:"failed",
      message: err.message
    })
  }
});

router.delete("/blog/:id", async (req, res) => {
  try{
    const blog=await Blog.deleteOne({_id:req.params.id});
    res.json({
      status:"success",
      result:blog
    })
  }
  catch(err){
    res.status(500).json({
      status:"failure",
      message:err.message
    })
  }
});

router.get("*", async (req, res) => {
    res.status(400).json({
      Status: "failure",
      Message: "Give correct path",
    });
  });

module.exports = router;