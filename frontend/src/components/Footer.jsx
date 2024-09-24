import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate} from 'react-router'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center relative bottom-0 bg-blue-900'>
        <div className='grid grid-cols-1 sm:grid-cols-3 justify-items-center px-10 w-full'>
            <div className='flex flex-col justify-center items-center sm:items-start'>
                <img src={assets.logo_dark} width={150} alt="" className='cursor-pointer' />
                <p className='text-white font-semibold'>We are also at</p>
                <div className='grid grid-cols-4 gap-4 py-5'>
                    <img src={assets.facebook} width={30} className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110' alt="" />
                    <img src={assets.twitter} width={30} className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110' alt="" />
                    <img src={assets.insta} width={30} className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110' alt="" />
                    <img src={assets.threads} width={30} className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110' alt="" />
                </div>
            </div>
            <div className='text-center mt-[30px] text-white'>
                <h1 className='mb-5 text-yellow-500 text-xl underline underline-offset-10'>Get in touch</h1>
                <p>1800 0000 0000</p>
                <p>support@edumentor.com</p>
            </div>
            <div className='text-white mt-[30px] flex sm:flex-col items-end gap-[2vw] sm:gap-2' >
                <h1 className='hidden sm:block mb-5 text-yellow-500 text-md sm:text-xl underline underline-offset-10'>Links</h1>
                <p onClick={()=> {navigate('/'); scrollTo(0,0)}} className='cursor-pointer text-sm hover:underline underline-offset-4'>Home</p>
                <p onClick={()=>{navigate('/teachers');scrollTo(0,0)}} className='cursor-pointer text-sm hover:underline underline-offset-4'>Teachers</p>
                <p onClick={()=>{navigate('/my-profile');scrollTo(0,0)}} className='cursor-pointer text-sm hover:underline underline-offset-4'>Profile</p>
                <p onClick={()=>{navigate('/about');scrollTo(0,0)}} className='cursor-pointer text-sm hover:underline underline-offset-4'>About</p>
                <p onClick={()=>{navigate('/contact');scrollTo(0,0)}} className='cursor-pointer text-sm hover:underline underline-offset-4'>Contact Us</p>
            </div>
        </div>
        <div className='w-full h-[10px] border-b border-yellow-500'></div>
        <div className='flex gap-2 text-white py-5'>
           <p>© 2024</p>
            <p>All rights reserved</p>
            <p>EduMentor</p>
        </div>
    </div>
  )
}

export default Footer