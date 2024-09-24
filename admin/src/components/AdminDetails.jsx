import React from 'react'
import { useContext } from 'react'
import { Context } from '../main'

const AdminDetails = () => {
    const { admin } = useContext(Context)
  
    return (
    <>
        <div className='w-full p-5  text-white'>
            <h1 className='font-bold text-[40px] text-center'>{admin?.firstName} {admin?.lastName}</h1>
            <p className='text-sm text-center'>{admin?.email}</p>
            <div className='flex gap-3 my-3 justify-evenly'>
                <p className='font-semibold'>{admin?.phone}</p>
                <p className='font-semibold'>{admin?.dob.slice(0,10)}</p>
                <p className='font-semibold'>{admin?.gender}</p>
            </div>

        </div>
    
    </>
  )
}

export default AdminDetails