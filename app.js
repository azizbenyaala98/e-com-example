const express = require('express');
const userRouter = require('./routes/usersRoute');
const itemRouter=require('./routes/ItemRoute')
const orderRouter=require('./routes/orderRoute')
const mongoose =require('mongoose');
require('dotenv').config()
const app = express()
app.use(express.json())
app.use('/api',userRouter);
app.use('/api',itemRouter);
app.use('/api',orderRouter);


try {  mongoose.connect(process.env.mongodb);
    console.log(mongoose.connection.readyState)
} catch (error) {
    console.log(error)
    
}

app.listen(process.env.port,()=>{console.log(`Server is running on http://localhost:${process.env.port}`);
})

