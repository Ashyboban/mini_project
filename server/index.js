
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect("mongodb+srv://ashy:ashy@cluster0.7xnsr.mongodb.net/mini_project?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log('connected to mongodb');
}).catch((err)=>{
  console.log(err);
});
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use("/server/User",userRouter)
app.use('/server/auth',authRouter);
app.use((err,req,res,next)=>
{
const statusCode=err.statusCode||500;
const message=err.message||'internal server error';
return res.status(statusCode).json({
  success:false,
  statusCode,
  message,
});
});