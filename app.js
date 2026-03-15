require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose'); 
const { ErrorHandler} = require('./middlewares/auth');

const usersRoutes = require('./routes/authRoutes')
const productRoutes =require('./routes/productRoutes')
const categoryRoutes=require('./routes/categoryRoutes')

const app = express()

app.use(express.json());

app.use('/auth', usersRoutes)
app.use('/products', productRoutes); 
app.use('/categories', categoryRoutes);

app.use(ErrorHandler)

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

