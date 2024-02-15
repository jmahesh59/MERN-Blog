import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({post}) {
  return (
   <div className="group relative w-full border border-teal-500 hover:bottom-2 h-[350px] overflow-hidden rounded-lg sm:w-[350px]  transition-all duration-300" >
     <Link to={`/post/${post.slug}`}>
        <img src={post.image} className='h-[260px] w-full object-cover group-hover:h-[200px] translate-all duration-300 z-20'/>
    </Link>
    <div className="p-3 flex flex-col gap-2 ">
        <p className='text-lg font-semibold line-clamp-2 '>{post.title}</p>
        <span className='italic text-sm'>{post.Category}</span>
        <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-t-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center rounded-md !rounded-tl-none m-2'>
            Read article
        </Link>

    </div>
   </div>

  )
}

export default PostCard
