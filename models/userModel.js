const mongoose =require("mongoose");
const Roles = require("./roles");
const schema =new mongoose.Schema({
    email :{required:true,type:String},
    username :{required:true,type:String},
    fullname:{type:String},
    password:{required:true,type:String},
    role: { type: String, enum: ['owner', 'admin', 'client'] },
    joinedAt:{type:Date},
    isActive:{type:Boolean},
})

const User =module.exports=mongoose.model('user',schema);
module.exports = User;
