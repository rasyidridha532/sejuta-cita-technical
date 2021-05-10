const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, () => {  
  console.log('Connected to DB!');
})  

// middlewares
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// default routes
app.get('/', (req, res) => {
  res.status(404);
  res.send('Silahkan Login terlebih dahulu!, jika tidak bisa login silahkan registrasi terlebih dahulu!');
});

app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000');
});
