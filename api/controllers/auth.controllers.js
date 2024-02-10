import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHander } from '../utils/error.js'
import jwt from 'jsonwebtoken';

 export const signup = async (req,res,next)=>{
    const {username ,email,password} = req.body

    if(!username ||!email ||!password||username===""||password===""||email===""){
        return next(errorHander(400,"All fields are required"))
    }

    const hashPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
        username,
        email,
        password:hashPassword,
    })

  try {
      await newUser.save();
     res.json("signup successfull")
  
  } catch (error) {
    next(error)  
  }
}


export const signin =async(req,res,next)=>{
  const {email , password} = req.body;
  try {
    if(!email || !password || email==="" ||password==="") return next(errorHander(401,"bad credentials"))
    
    const validUser = await User.findOne({email});
    console.log(validUser)
    
    if(!validUser) return next(errorHander(404 ,"user not found"))
    const passCheck = bcryptjs.compareSync(password,validUser.password);
     
    if(!passCheck) return next(errorHander(401,"unauthorized"))
     
    const {password:pass,...rest}= validUser._doc;
    const token = jwt.sign(
           {
            id:validUser._id , isAdmin:validUser.isAdmin
           },
           process.env.JWT_SECRET
      )
     res.status(200).cookie('access_token',token,{
            httpOnly:true,
           }).json(rest)

    

    } catch (error) {
     next(error)
  }
}