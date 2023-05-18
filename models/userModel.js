const mongoose =require("mongoose");

const userschema =new mongoose.Schema({
    email :{required:true,unique: true,type:String},
    username :{type:String},
    fullname:{type:String},
    password:{required:true,type:String},
    role: { type: String, enum: ['owner', 'admin', 'client'] },
    joinedAt:{default: Date.now,type:Date},
    isActive:{ default: true,type:Boolean},
})
module.exports=mongoose.model('User',userschema);