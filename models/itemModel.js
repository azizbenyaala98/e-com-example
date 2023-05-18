const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { required: true, type: String },
  price: { required: true, type: Number },
  description: { type: String },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: {  default: 0, type: Number },
});

module.exports=mongoose.model("Item", itemSchema);