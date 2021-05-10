const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try{
        const savedUser = await User.create({
          username: 'rasyid',
          password: 'rasyid1234',
          // password: await bcrypt.hash('rasyid1234', 10),
          role: 'admin',
      }, {
          username: 'ridha',
          // password: await bcrypt.hash('rasyid2345', 10),
          password: 'rasyid2345',
          role: 'user',
      });
        res.send({message: 'User Created'});

      res.status(201);
    } catch (err) {
      console.log(err);
    }  
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username: username});

    // const passwordExist = await bcrypt.compare(password, user.password);
    const passwordSame = await password === user.password;

    if (!passwordSame || !user) return res.status(400).send('Username atau password salah!');

    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWS_ACCESS_KEY, { expiresIn: '900s' }, (err, token) => {
      res.json({
        token
      })
    });
});

module.exports = router;
