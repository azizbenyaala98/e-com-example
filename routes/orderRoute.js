const express = require('express');
const { hasRole } = require('../controllers/authController');
const router = express.Router();
const Order = require('../models/orderModel');


router.post('/add',hasRole("client")
, async (req, res) => {
  try {
    // Extract order details from the request body
    const { date, status, client, total, items } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      date: date,
      status: status,
      client: client,
      total: total,
      items: items
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add the order' });
  }
});

// Read all orders
router.get('/getall',hasRole("client"), async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific order
router.get('/getorder/:id',hasRole("client"), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an order
router.put('/update/:id',hasRole("client"), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order
router.delete('/delete/:id',hasRole("client"), async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


// Update order status and quantity
router.patch('/patch/:id',hasRole("client"), async (req, res) => {
    try {
      const { id } = req.params;
      const { status, quantity } = req.body;
  
      // Update order status
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update quantity in the store collection
      const itemOrders = order.items;
      for (const itemOrder of itemOrders) {
        const itemId = itemOrder.item;
        const itemQuantity = itemOrder.quantity;
  
        // Find and update the quantity in the store collection
        await Store.findByIdAndUpdate(itemId, { $inc: { quantity: -itemQuantity } });
      }
  
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
 

});







module.exports = router;
