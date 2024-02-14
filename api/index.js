import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import postRoute from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDb is connected")
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json())
app.listen(3000,()=>{
    console.log("app is running in port 3000")
})
app.use(cookieParser())

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes )
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoutes)
app.use((err,req,res,next)=>{
    const statusCode =err.statusCode||500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
   
})
    
