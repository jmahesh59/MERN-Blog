import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId:{
            type:String,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default:"https://www.shutterstock.com/image-photo/blogging-blog-word-coder-coding-260nw-520314613.jpg"
        },
        Category:{
            type:String,
            default:"uncategorized"
        },
        slug:{
            type:String,
            unique:true,
        },


    }
,{timestamps:true})


  const Post = mongoose.model("Post",postSchema)


  export default Post