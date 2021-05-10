const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },  
  role: {
    type: String,
    required: true,
  },
}, {collection: 'users'});

module.exports = mongoose.model('Users', postSchema);
