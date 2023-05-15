const express = require('express');
const userRouter = require('./routers/usersRoute');
const itemRouter=require('./routers/ItemRoute')
const orderRouter=require ('./routers/')
const mongoose =require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use('/api',userRouter);
app.use('/api',itemRouter);


try {  mongoose.connect(process.env.dburl);
    console.log(mongoose.connection.readyState)
} catch (error) {
    console.log(error)
    
}

app.listen(process.env.port,()=>{console.log(`Server is running on http://localhost:${process.env.port}`);
})

