const express=require("express");
const {auth}=require("../middlewares/auth");
const {CakeModel,validateCake}=require("../models/cakeModel");
const router=express.Router();

router.get("/", async(req,res)=>{
    let perPage=req.query.perPage||5;
    let page=req.query.page||1;

    try{
        let data=await CakeModel.find({})
        .limit(perPage)
        .skip((page-1)*perPage)
        .sort({_id:-1})
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"There is an error try again later", err})
    }
})

router.post("/", auth, async(req,res) => {
    let validateBody = validateCake(req.body);
    if(validateBody.error){
      return res.status(400).json(validateBody.error.details)
    }
    try{
      let cake = new CakeModel(req.body);
      
      cake.user_id = req.tokenData._id;
      await cake.save();
      res.status(201).json(country)
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"There is an error please try again",err})
    }
  })
  
  router.put("/:idEdit", async(req,res) => {
    let validateBody = validateCake(req.body);
    if(validateBody.error){
      return res.status(400).json(validateBody.error.details)
    }
    try{
      let idEdit = req.params.idEdit
      let data = await CakeModel.updateOne({_id:idEdit},req.body)
      // modfiedCount:1 - אם יש הצלחה
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  router.delete("/:idDel",auth, async(req,res) => {
    try{
      let idDel = req.params.idDel
      // כדי שמשתמש יוכל למחוק רשומה הוא חייב 
      // שלרשומה יהיה את האיי די ביוזר איי די שלו
      let data = await CakeModel.deleteOne({_id:idDel,user_id:req.tokenData._id})
      // "deletedCount": 1 -  אם יש הצלחה של מחיקה
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  module.exports = router;

