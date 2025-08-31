import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar2 = () => {
  return (
    <div className='w-full flex flex-wrap gap-1 border-[1.5px] border-gray-300 bg-[#2191c0] pt-1 px-2'>
         
        <NavLink className={({ isActive }) => ` py-2 px-3 lg:px-2 text-sm cursor-pointer font-semibold ${isActive ? 'border-1 bg-green-300 font-bold rounded-t' : ' bg-blue-400 text-white rounded-t'}`} to={'report'} >
            <p className=''>Transaction Summary Report</p>
        </NavLink>

        <NavLink className={({ isActive }) => `   py-2 px-3 lg:px-2 text-sm cursor-pointer font-semibold ${isActive ? 'border-1 bg-green-300 font-bold rounded-t' : ' bg-blue-400 text-white rounded-t'}`} to={'aadhar'} >
            <p className=''>Transaction Summary by Aadhar</p>
        </NavLink>

        <NavLink className={({ isActive }) => ` py-2 px-3 lg:px-2 text-sm cursor-pointer font-semibold ${isActive ? 'border-1 bg-green-300 font-bold rounded-t' : ' bg-blue-400 text-white rounded-t'}`} to={'ration'} >
            <p className=''>Transaction Summary by Ration Card</p>
        </NavLink>              

        <NavLink className={({ isActive }) => ` py-2 px-3 text-sm cursor-pointer font-semibold ${isActive ? 'border-1 bg-green-300 font-bold rounded-t' : ' bg-blue-400 text-white rounded-t'}`} to={'offline'} >
            <p className=''>Offline Transaction Summary</p>
        </NavLink>          

      
    </div>
  )
}

export default Navbar2
