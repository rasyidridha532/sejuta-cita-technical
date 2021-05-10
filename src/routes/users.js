const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verify = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.get('/', verify, async (req, res) => {

  const { _id, role } = req.user;  

  let user;  

  if (role === 'admin') {
    user = await User.find({});

    res.json(user);
  } else {
    user = await User.findOne({_id : _id});
    res.json(user);
  }  
});

router.patch('/:idUser', verify, async (req, res) => {
  const { idUser } = req.params;
  const { role } = req.user;  

  if (role === 'user') {
    res.sendStatus(403);
  }

  await User.findByIdAndUpdate(idUser, req.body);

  res.status(200);
})

router.delete('/:idUser', verify, async (req, res) => {
  const { idUser } = req.params;
  const { role } = req.user;

  if (role === 'user') {
    res.status(403);
  }

  await User.findByIdAndDelete(idUser);
  res.status(200);
})

module.exports = router;
