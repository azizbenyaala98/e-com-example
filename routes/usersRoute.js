const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const User = require('../models/userModel')

router.post('/auth/login', async (req, res) => {
    try {
      // req.body email,password
      const { email, password } = req.body;
  
      // Check if client exist
      const finduser = await User.findOne({ email });
  
      if (!finduser) {
        res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
        return;
      }
      // Check password
      const result = await bcrypt.compare(password, finduser.password);
  
      if (!result) {
        res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
        return;
      }
      // if everything true
      // create Token
      const token = jwt.sign(
        {
          id: finduser._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );
      // send the details + a token
      res
        .status(200)
        .send({ msg: "authentification success", user:finduser, token });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ errors: [{ msg: "can not get the User", error }] });
    }
  });

  router.post('/auth/signup', async (req, res) => {
    try {
        console.log(req.body)
        // Check email
        const finduser = await User.findOne({ email: req.body.email })

        if (finduser) {
            return res.status(400).send({ msq: "User already exist! " })
        }

        const user = new User({
            email: req.body.email,
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            role: req.body.role,
            joinedAt: req.body.joinedAt,
            isActive: req.body.isActive
        });

        // Hash password
        const hashedpassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedpassword;


        // create a token using json webtoken
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "2d" }
        );

        await user.save();
        res.status(201).send({ user, token });

    }
    catch (error) {
        res.status(500).json({ error: error.message })

    }

})


module.exports=router