const mongoose = require('mongoose');

const ItemOrderSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
  total: {type: Number, required: true,default:0 },
  items: [ItemOrderSchema],
  
  
});




module.exports = mongoose.model('Order', OrderSchema);
