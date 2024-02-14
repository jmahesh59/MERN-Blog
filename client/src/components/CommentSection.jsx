import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
function CommentSection({postId}) {
const {currentUser} = useSelector(state=>state.user)
const [comments , setComments] =useState('')
const [commentError ,setCommentError] = useState(null);
const handleSubmit =async(e)=>{
    e.preventDefault();
    setCommentError(null);
   try {
     if(comments.length>200){
         return;
     }
     const res = await fetch(`/api/comment/create`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
         },
         body:JSON.stringify({content:comments,postId,userId:currentUser._id})
     })
     const data = await res.json();
     // console.log(data);
     if(res.ok){
         setComments("")
     }
   } catch (error) {
     setCommentError(error)
   }
}

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {
            currentUser?
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Sign in as:</p>
                <img src={currentUser.profilePicture}  className="h-5 w-5 object-cover rounded-full"  alt="" />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}</Link>
            </div>:(
                <div className="text-sm text-teal-500 flex gap-1 ">
                    You must be signed in to comment.
                    <Link to="/sign-in">Sign In</Link>
                </div>
            )}
            {
                currentUser && (
                    <form className="border border-teal-500  p-3 rounded-md " onSubmit={handleSubmit}>
                        <Textarea
                        placeholder='Add a comment...'
                        rows={"3"}
                        maxLength='200'
                        onChange={(e)=>setComments(e.target.value)}
                        />
                        <div className='flex justify-between items-center m-5'>
                            <p className='text-gray-500 text-xs'>{200-comments.length} Characters remaining</p>
                            <Button outline 
                                gradientDuoTone={'purpleToBlue'}
                                type='submit'
                            >
                                submit
                            </Button>
                        </div>
                        {commentError && <Alert color={"failure"}>
                        {commentError}
                    </Alert>}
                    
                    </form>
                )
            }
    </div>
  )
}

export default CommentSection
