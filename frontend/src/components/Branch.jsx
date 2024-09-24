import React from 'react'
import { branch } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Branch = () => {
  return (
        <div className='lg:mx-[5%]'>
            <p id='branch' className='text-blue-900 text-center text-xl font-semibold py-10'>Select the branch you want to explore</p> 
            <div id='subjects' className='my-5 px-10 grid grid-cols-3 md:grid-cols-4 lg:md:grid-cols-8 justify-items-center gap-2 w-full '>
                {branch.map((item, index)=>(
                    <Link key={item.branch || index} to={`/teachers/${item.branch}`}>
                        <div  className='flex flex-col justify-start items-center py-5 cursor-pointer w-[20vw] sm:w-[10vw]  transition-all duration-150 ease-in-out hover:scale-125'>
                            <img src={item.image} width={30} alt="" className='pb-3' />
                            <p className='text-blue-900 text-sm text-center'>{item.branch}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
  )
}

export default Branch