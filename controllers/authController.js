const jwt = require("jsonwebtoken");
const User = require('../models/userModel')


exports.isAuth = async (req, res, next) => {
  try {
    SECRET_KEY="123456789azertyuiop"
    
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    const decoded = await jwt.verify(token, SECRET_KEY);
    console.log(decoded)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    req.user = user;
    console.log("auth middelware")

    next();
   
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Unauthorized" }] });
  }
};

exports.hasRole = (role) => {
      return async (req, res, next) => {
        const isValid = role === req.user.role;
        if (!isValid) {
         return res.status(401).json({
           message: "You do not have permission to perform this action",
        });
      }
       next();
       console.log("ahsrole ")
     };
}


 exports.is_Owner = async (req, res, next) => {

    const id = req.params.id;
    const item = await itemModel.findById(id);
    const userId = req.user.id;
    const isValid = item.owner === userId;
    if (!isValid) {
      return res.status(401).json({
      message: "You do not have permission to perform this action",
   });
  }
    next();
  };


   
  