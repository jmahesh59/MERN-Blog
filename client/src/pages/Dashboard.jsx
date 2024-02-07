import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
function Dashboard() {
  const location = useLocation();
  // console.log(location)
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    // console.log(urlParams)
    const tabFormUrl = urlParams.get('tab')
    // console.log(tabFormUrl);
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
      {/* {sidebar} */}
      <DashSidebar/>
      </div>
      {/* {profile ...} */}
        {tab==='profile' && <DashProfile/> }
    </div>
  )
}

export default Dashboard
