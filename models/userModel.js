const mongoose =require("mongoose");
const Roles = require("./roles");
const schema =new mongoose.Schema({
    email :{required:true,type:String},
    username :{required:true,type:String},
    fullname:{type:String},
    password:{required:true,type:String},
    role:{type:String},
    joinedAt:{type:Date},
    isActive:{type:Boolean},
})
module.exports=mongoose.model('user',schema);