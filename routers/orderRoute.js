const express = require('express');
const Order = require('../models/orderModel');

const router =express.Router()

const order = [];

// get all orders 

router.get('/order/getAll',async(req,res)=>{
    try {
        order= Order.find().exec()
        res.status(200).json(order);
    } catch (error) {
            res.status(400).json({error:error.message})
        
    }
})

// creation d'un ordre 
  
router.post('/order/add',async (req,res)=>{
    try{
        const Neworder = Order.create(req.body)
        const result = Neworder.save();
        res.status(201).json(result);
        
    }
    catch(error){
        res.status(400).json({error:error.message})

    }
    
})

// get order by id

router.get('/order/getbyid/:id', (req, res) => {
    try {
    order= Order.findById(req.params.id)
    res.status(200).json(order);
        
    }
    catch(error){
        res.status(400).json({error:error.message})

    }
})

// Update order

router.put('/order/update/:id',async(req,res)=>{

    try {
        const id=req.params.id;
        order=req.body;
        const options= {new:true}
        const result=await User.findByIdAndUpdate(id,order,options)
        res.status(203).json(result)  
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
    
})