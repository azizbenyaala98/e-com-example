const jwt = require("jsonwebtoken");
const User = require('../models/userModel')


exports.isAuth = async (req, res, next) => {
  try {
    
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    req.user = user;
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


   
  