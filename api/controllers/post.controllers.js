import Post from "../models/post.model.js"
import { errorHander } from "../utils/error.js"


export const create = async(req,res,next)=>{
    
    if(!req.user.isAdmin){
        return next(errorHander(403,"You are not allowed to create a post"))
    }

    if(!req.body.title || !req.body.content){
        return next(errorHander(400,"Please provide all required all fields"))
    }
    console.log(req.body.title)
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9]/g,'-')
    console.log(slug);

    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id
    })

    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost);
        
    } catch (error) {
        next(error)
    }

}