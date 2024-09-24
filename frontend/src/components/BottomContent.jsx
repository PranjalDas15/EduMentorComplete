import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'

const BottomContent = () => {
    const {isAuthenticated} = useContext(Context)
    const navigate = useNavigate()
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 justify-items-center sm:my-5 mx-10 lg:mx-[5%] lg:gap-2'>
            <div className='lg:px-10 sm:py-5'>
                <div className='w-full'>
                    <img src={assets.banner2} alt="" className='rounded-3xl' />
                </div>
            </div>

            {isAuthenticated 
            ?   <div className='px-10 py-5 flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-center text-[20px] sm:text-[45px] mt-10 text-blue-900'>Manage your appointments with ease.</h2>
                    <button onClick={()=>{navigate('/my_profile'); scrollto(0,0)}} className='bg-blue-900 w-[150px] text-white text-center p-3 my-10 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-yellow-500'>
                        Profile
                    </button>
                </div>
            :   <div className='px-10 py-5 flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-center text-[20px] sm:text-[45px] mt-10 text-blue-900'>Create Account and start making appointments</h2>
                    <button onClick={()=>navigate('/login')} className='bg-blue-900 w-[150px] text-white text-center p-3 my-10 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-yellow-500'>
                        Create Account
                    </button>
                </div>
            }
            
        </div>
  )
}

export default BottomContent