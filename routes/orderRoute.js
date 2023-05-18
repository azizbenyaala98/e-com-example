const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Create an order
router.post('/order/add', async (req, res) => {
  try {
    const {items} = req.body;

    // Calculate the total of the order based on the items
    let x = 0;
    for (const item of items) {
      item.total = item.total + (item.quantity * item.price); // Assuming each item has a 'price' property
    }

    // Create the order
    const order = new Order({
      items
    
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the order' });
  }
});

// Read all orders
router.get('/order/getall', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific order
router.get('/order/getorder/:id', async (req, res) => {
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
router.put('/order/update/:id', async (req, res) => {
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
router.delete('/order/delete/:id', async (req, res) => {
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
router.patch('/order/patch/:id', async (req, res) => {
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
