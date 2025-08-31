import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {

    
return (
        <div className=' hidden lg:block min-h-screen bg-white border-2 mt-1'>
            {
                <ul className='text-gray-700 flex flex-col gap-1 mt-5 items-center justify-center font-semibold w-56'>
                    <button className='px-2 bg-[#2191c0] w-36 text-center py-2 font-semibold text-white mb-4 rounded-lg'>MENU</button>
                    <div className='flex flex-col items-center justify-center'>
                        <button className='px-2 bg-[#2191c0] min-w-52 text-center py-2 font-semibold text-white rounded' disabled>Transaction Report</button>
                          
                        

                        <NavLink className={({ isActive }) => ` ml-2 mt-1 mb-1 flex items-center justify-center  lg:min-w-48 py-2.5 px-3 lg:px-2 text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300 font-bold rounded' : ''} `} to={'/transactionSummary'} >
                           <p className='hidden lg:flex'>Transaction Summary</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center  lg:min-w-48 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded ' : ''}`} to={'/deviceEntry'}>
                            <p className='hidden lg:flex'>Daily Device Entry</p>
                        </NavLink>

                        <button className='px-2 bg-[#2191c0] min-w-52 text-center py-2 font-semibold text-white rounded' disabled>POS Report</button>

                        <NavLink className={({ isActive }) => `ml-2 mt-1 mb-1 flex items-center justify-center lg:min-w-48 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/POSregistered'}>
                           <p className='hidden lg:flex'>Registered POS</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center lg:min-w-48 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/'}>
                             <p className='hidden lg:flex'>POS Repair Summary</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center  lg:min-w-48 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/repairStatus'}>
                             <p className='hidden lg:flex'>POS Repair Status</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center  lg:min-w-48 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/versionDetails'}>
                             <p className='hidden lg:flex'>FPS Version Detail</p>
                        </NavLink>


                        <NavLink className={({ isActive }) => ` mb-1 flex items-center justify-center gap-1  lg:min-w-52 py-2.5 px-3 lg:px-2  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : 'border-1 rounded'}`} to={'/searchDetails'}>
                              <img className='w-5' src={assets.search} alt='' /> 
                              <p className='hidden lg:flex'>Search Details </p>
                        </NavLink>

                        
                    </div>

                </ul>}


        </div>
    )
}

export default Sidebar
