import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUser, HiOutlineUserGroup, HiOutlineUsers, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice.js';
function DashSidebar() {
    const location = useLocation();
  const [tab,setTab] = useState('');
  const dispatch = useDispatch();
  const{currentUser} = useSelector((state)=>state.user)
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search])

  const handleSignOut =async()=>{
    try {
  
      const res = await fetch("/api/user/signout",{
        method:"POST",  
      })
      const data = await res.json();
        console.log(data)
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
  
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
   <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile' >
                <Sidebar.Item 
                 active={tab==="profile"}
                 icon={HiUser} 
                 label={currentUser.isAdmin?"Admin":"User"} 
                 labelColor="dark"
                 as="div"
                 >
                    Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin &&( <Link to={'/dashboard?tab=posts'}>
                  <Sidebar.Item
                   active={tab==='posts'}
              
                   icon={HiDocumentText}>Posts</Sidebar.Item>
                </Link>)}
                {currentUser.isAdmin &&( <Link to={'/dashboard?tab=users'}>
                  <Sidebar.Item
                   active={tab==='users'}
              
                   icon={HiOutlineUserGroup}>Users</Sidebar.Item>
                </Link>)}
                {currentUser.isAdmin &&( <Link to={'/dashboard?tab=comments'}>
                  <Sidebar.Item
                   active={tab==='comments'}
              
                   icon={HiAnnotation}>Comments</Sidebar.Item>
                </Link>)}

               
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut} >
                  Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar
