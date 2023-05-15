const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { required: true, type: String },
  price: { required: true, type: Number },
  description: { type: String },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;