import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'

const Hero = () => {
    const {isAuthenticated} = useContext(Context)
    const navigate = useNavigate()
    const handleChat = () => {
        if (!isAuthenticated) {
          navigate("/login");
        } else navigate('/appointment');}
    return (
        
            <div id='hero' className='grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center sm:my-5 mx-10 lg:mx-[5%] lg:gap-2'>
                <div className='sm:px-10 py-5 flex flex-col justify-center items-center sm:justify-start sm:items-start'>
                    <h2 className='font-bold sm:text-start text-[30px] sm:text-[45px] mt-10 text-blue-900'>Book an Appointment with your Favourite Teacher.</h2>
                    <p className='text-gray-800 mt-10 text-[15px]'>
                    Connect with the teachers who inspire you the most. Whether you need guidance,
                    mentorship, or just a casual chat, booking a personalized session has never been easier.
                    Start your journey towards success by scheduling an appointment today!
                    </p>
                    <button onClick={handleChat} className='bg-blue-900 text-white text-center p-3 my-10 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-yellow-500'>
                        Appoint Now
                    </button>
                </div>
                <div className='lg:px-10 sm:py-5'>
                    <div className='w-full'>
                        <img src={assets.banner1} alt="" className='rounded-3xl' />
                    </div>
                </div>
            </div>  
        
  )
}

export default Hero