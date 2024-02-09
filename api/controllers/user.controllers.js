import { errorHander } from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
export const test = (req,res)=>{
    res.json({message:"Api is working well"})
}


/*export const updateUser = async(req,res,next)=>{
    if(req.user.id!==req.params.userId){
        return next(errorHander(403,"You are not allowed to update this user"));
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHander(400,"Password must be at least 6 characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }

    // if(req.body.username.includes(' ')){
    //     return next(errorHander(400,'Username cannot contain spaces'));
    // }
    if(req.body.username!== req.body.username){
        return next(errorHander(400,'user name should be lowercase'));
    }
    if(!req.body.username.match((/^[a-zA0-9]+$/))){
        return next(errorHander(400,'username can only contain letters and numbers'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            }},{new:true})

            const{password,...rest} = updatedUser._doc;

            res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}*/



export const updateUser = async (req, res, next) => {
    try {
      if (req.user.id !== req.params.userId) {
        return next(errorHander(403, "You are not allowed to update this user"));
      }
  
      if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHander(400, "Password must be at least 6 characters"));
        }
        req.body.password = await bcryptjs.hash(req.body.password, 10);
      }
  
      // Uncomment this block if you want to check for spaces in the username
      /*
      if (req.body.username.includes(' ')) {
        return next(errorHander(400, 'Username cannot contain spaces'));
      }
      */
  
      // Convert username to lowercase if you want to enforce lowercase usernames
      req.body.username = req.body.username.toLowerCase();
  
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHander(400, 'Username can only contain letters and numbers'));
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next( errorHander(403, 'You are not allowed to delete this user'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('User has been deleted');
    } catch (error) {
      next(error);
    }
  };


 export const signOut = (req,res,next)=>{
   try {
       res.clearCookie('access_token').status(200).json("User has been SignOut")
   } catch (error) {
    next(error)
   }
 }