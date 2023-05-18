const express = require('express');
const userRouter = require('./routes/usersRoute');
const itemRouter=require('./routes/ItemRoute')
const orderRouter=require('./routes/orderRoute')
const mongoose =require('mongoose');
const cors =require("cors");
const { isAuth } = require('./controllers/authController');
require('dotenv').config()
const app = express()
app.use(cors());
app.use(express.json())
app.use('/api/v1/auth',userRouter);
app.use('/api/v1/items',isAuth,itemRouter);
app.use('/api/v1/orders',isAuth,orderRouter);



try {  mongoose.connect(process.env.mongodb);
    console.log(mongoose.connection.readyState)
} catch (error) {
    console.log(error)
    
}

app.listen(process.env.port,()=>{console.log(`Server is running on http://localhost:${process.env.port}`);
})

