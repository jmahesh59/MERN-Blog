import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import  { Button, Spinner }  from  'flowbite-react'
import CallToAction from '../components/CallToAction';
function PostPage() {
    const { postSlug } = useParams();
    const [loading,setLoading]=useState(true);
    const [error,setError] = useState(false);
    const [post,setPosts] = useState(null);
    useEffect(()=>{
        const fetchPost =async ()=>{
            try {
                setLoading(true);
                const res= await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data = await res.json();

                if(!res.ok){
                    setLoading(false);
                    setError(true);
                    return;
                }
                if(res.ok){
                    setLoading(false);
                    setPosts(data.posts[0]);
                    setError(false);
                }
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchPost();
    },[postSlug])
 
    if(loading) return(
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl'/>
        </div>
    )
    return(
        <main className='p-3 flex flex-col max-w-6xl mx-auto' >
            <h1 className='text-3xl p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link to={`/serach?category=${post && post.Category}`} className='m-5 self-center '>
            <Button color='gray' pill size="xs">{post && post.Category}</Button>
            </Link>
            <img src={post && post.image} alt="posttitle" className='mt-10 p-3 max-h-[600px] w-full object-cover' />
          <div className="flex justify-between border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{post && (post.content.length/1000).toFixed(0)} mins read</span>
          </div>

          <div className='p-3 max-w-2xl mx-auto w-full post-content ' dangerouslySetInnerHTML={{__html: post && post.content}}>

          </div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction/>
          </div>
        </main>
    )
  
}

export default PostPage
