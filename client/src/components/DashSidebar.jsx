import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice.js';
function DashSidebar() {
    const location = useLocation();
  const [tab,setTab] = useState('');
  const dispatch = useDispatch()
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
        dispatch(signOutSuccess())
      }
  
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
   <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile' >
                <Sidebar.Item 
                 active={tab==="profile"}
                 icon={HiUser} 
                 label={"user"} 
                 labelColor="dark"
                 as="div"
                 >
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut} >
                  Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar
