import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const ModalSidebar = ({showMenu, onClose}) => {
  return (
    <div className={`${showMenu ? 'block' :'hidden'}`}>

      <div onClick={onClose} className={`fixed inset-0 left-0 bottom-0 top-16  bg-black/30  max-lg:block hidden `}
         >
       <div onClick={(e)=>e.stopPropagation()}
         className='bg-white px-0.5 py-0.5 rounded fixed overflow-y-auto sidebar w-64 '
         style={{ height: 'calc(100vh - 4rem)' }}>

        <ul className='text-gray-700 flex flex-col gap-1 mt-5 items-center justify-center font-semibold '>
            <button className='px-2 bg-[#2191c0] w-36 text-center py-2 font-semibold text-white mb-4 rounded-lg'>MENU</button>
                <div className='flex flex-col items-center justify-center'>
                    <button className='px-2 bg-[#2191c0] min-w-52 text-center py-2 font-semibold text-white rounded' disabled>Transaction Report</button>
                               
                             
     
                        <NavLink onClick={onClose}
                          className={({ isActive }) => ` ml-2 mt-1 mb-1 flex items-center justify-center w-48  py-2.5 px-3 text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300 font-bold rounded' : ''} `} to={'/transactionSummary'} >
                           <p className=''>Transaction Summary</p>
                        </NavLink>

                        <NavLink onClick={onClose}
                         className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center w-48  py-2.5 px-3   text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded ' : ''}`} to={'/deviceEntry'}>
                            <p className=''>Daily Device Entry</p>
                        </NavLink>

                        <button className='px-2 bg-[#2191c0] min-w-52 text-center py-2 font-semibold text-white rounded' disabled>POS Report</button>

                        <NavLink onClick={onClose}
                         className={({ isActive }) => `ml-2 mt-1 mb-1 flex items-center justify-center w-48 py-2.5 px-3   text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/POSregistered'}>
                           <p className=''>Registered POS</p>
                        </NavLink>

                        <NavLink onClick={onClose}
                         className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center w-48 py-2.5 px-3   text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/'}>
                             <p className=''>POS Repair Summary</p>
                        </NavLink>

                        <NavLink onClick={onClose}
                          className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center w-48 py-2.5 px-3   text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/repairStatus'}>
                             <p className=''>POS Repair Status</p>
                        </NavLink>

                        <NavLink onClick={onClose}
                          className={({ isActive }) => `ml-2 mb-1 flex items-center justify-center w-48 py-2.5 px-3  text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : ''}`} to={'/versionDetails'}>
                             <p className=''>FPS Version Detail</p>
                        </NavLink>


                        <NavLink onClick={onClose}
                          className={({ isActive }) => ` mb-1 flex items-center justify-center w-48 gap-1 py-2.5 px-3   text-sm cursor-pointer hover:bg-green-200 rounded ${isActive ? 'border-1 bg-green-300  font-bold rounded' : 'border-1 rounded'}`} to={'/searchDetails'}>
                              <img className='w-5' src={assets.search} alt='' /> 
                              <p className=''>Search Details </p>
                        </NavLink>
     
                             
                         </div>
     
                     </ul>
    </div>

   </div>
   </div>
  )
}

export default ModalSidebar
