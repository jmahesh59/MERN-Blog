import jwt from 'jsonwebtoken';
import {errorHander} from './error.js';

export const verifyToken =(req,res,next)=>{

    const token = req.cookies.access_token;
    // console.log(token)
    if(!token)return next(errorHander(401,"Unauthorized"))

    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error) return next(401,"unauthorized")
            // console.log(user)
        req.user = user;
        next();
    })
}

