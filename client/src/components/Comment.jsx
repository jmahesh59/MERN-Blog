import React, { useState } from 'react'
import moment from 'moment'
function Comment({comment}) {
    // console.log(comments)
    const [user , setuser] = useState({})
    useState(()=>{
      const  getUser = async ()=>{
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json();
                // console.log(data);
                if(!res.ok){
                    console.log(data.message)
                }
                else{
                    setuser(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    },[comment])

    console.log(user)
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className="flex-shrink mr-3">
            <img className='h-10 w-10 rounded-full bg-gray-200' src={user.profilePicture} alt="" />
        </div>
        <div className="flex-1">
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>{user?`@${user.username}`:"anonymous user"}</span>
                <span className='text-gray-500 text-sm'>
                 {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            <p className='text-gray-500'>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment
