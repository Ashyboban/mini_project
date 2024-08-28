
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
mongoose.connect("mongodb+srv://ashy:ashy@cluster0.7xnsr.mongodb.net/mini_project?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('connected to mongodb');
}).catch((err)=>{
  console.log(err);
});
const app = express();


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use("/server/User",userRouter)