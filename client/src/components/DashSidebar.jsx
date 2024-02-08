import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
function DashSidebar() {
    const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search])
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
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer">
                  Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar
