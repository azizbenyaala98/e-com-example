const express = require("express");
const router = express.Router();
const Item = require('../models/itemModel');
const{isAuth,hasRole} =require ('../controllers/authController')

router.get('/getAll',hasRole("admin"), async (req, res) => {
  try {
    const data = await Item.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/getById/:id',hasRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Item.findById(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/add',hasRole("admin"), async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      owner: req.body.owner,
      quantity: req.body.quantity,
    });
    const result = await item.save();
    
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id',hasRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const result = await Item.findByIdAndUpdate(id, data, options);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id',hasRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
