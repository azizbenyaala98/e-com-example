const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["created", "canceled"], default: 'created',required:true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
  total: {type: Number, required: false },
  items: {
    type: [
      {
        item: { type: mongoose.Types.ObjectId, ref: "Item" },
        quantity: {
          type: Number
        }
      }
    ]
  },
  
  
});




module.exports = mongoose.model('Order', OrderSchema);
