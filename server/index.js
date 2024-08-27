const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ashy:ashy@cluster0.7xnsr.mongodb.net/mini_project?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('connected to mongodb');
}).catch((err)=>{
  console.log(err);
});
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
