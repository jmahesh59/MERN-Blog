import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row border  border-teal-500 p-3 gap-5 justify-center align-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className="flex flex-col sm:flex-col  justify-center gap-2 flex-1">
            <h2 className='text-2xl'>Want to learn more about Javascript</h2>
            <p className='text-gray-500'>
                Checkout these resources 100js projects
            </p>
            <Button gradientDuoTone={"purpleToPink"} className='rounded-lg'><a href='https://www.100jsprojects.com' target='_black'>100 Javascript Projects</a></Button>
        </div>
        <div className="flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_3840,q_auto" alt="" />
        </div>
      
    </div>
  )
}

export default CallToAction
