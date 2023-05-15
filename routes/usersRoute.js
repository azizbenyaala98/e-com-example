const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const User = require('../models/userModel')
router.get('/user/getAll',async(req,res)=>{
    try {
        const data= await User.find()
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        
    }

})
router.get('/user/getbyid/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const data=await User.findById(id)
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        
    }
   
    
})
router.post('/user/add',async (req,res)=>{
    try{
        const user =new User({
            email:req.body.email,
            username:req.body.username,
            fullname:req.body.fullname,
            password:req.body.password,
            role:req.body.role,
            joinedAt:req.body.joinedAt,
            isActive:req.body.isActive

            
        });
        const result=await user.save();
        res.status(200).json(result);

    }
    catch(error){
        res.status(500).json({error:error.message})

    }
    
})
router.put('/user/update/:id',async(req,res)=>{

    try {
        const id=req.params.id;
        const data=req.body;
        const options= {new:true}
        const result=await User.findByIdAndUpdate(id,data,options)
        res.status(200).json(result)  
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
    
})
router.delete('/user/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const result=await User.findByIdAndDelete(id);
        res.status(200).json({message:"deleted succesfully"});
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
        
    }
    



    
})
module.exports=router