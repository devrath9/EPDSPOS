import React, { useState } from 'react'
import Modal from './Modal'

const Repairstatus = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [modalOpen, setmodalOpen] = useState(false)
  
    const handleclose = () => { setmodalOpen(false) }

  return (
    <div className='overflow-x-auto  m-0.5 p-0.5'>
      <div className='w-full lg:w-[calc(100vw-16rem)] p-1 border-[1.5px] border-gray-300 rounded '>
   
       <div className='px-1'>
         <button className='bg-[#2191c0] text-white font-semibold w-full mt-0.5 py-2 rounded'>Device Repair Status</button>
      </div> 

       <div className='flex gap-2 border-[1.5px] border-gray-400 py-2 px-3 mt-1 mx-1 text-sm rounded'>
          <div>
            <label htmlFor="district" className='font-semibold'>District: </label>
            <select className='w-32 bg-white rounded border-[1.5px] border-gray-400 px-3 py-0.5' name="district" id="district">
              <option value="">Select District</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Ajmer">Ajmer</option>
              <option value="Jodhpur">Jodhpur</option>
              <option value="Udaipur">Udaipur</option>
            </select>
          </div>

          <div className=''>
            <button className='bg-[#2191c0] text-white font-semibold px-3 rounded py-1 '>Get details</button>
          </div>
        </div>

        <div className='mt-3 mx-1 border-[1.5px] border-gray-400 px-1 py-1 rounded flex gap-2 '>
          
          <div className='ml-1 flex items-center'>
            <button className='bg-green-500 px-3 py-0.5 font-semibold rounded text-white text-sm'
                    onClick={()=>setIsOpen(!isOpen)}>▼ Filters
            </button>
          </div>

          {isOpen && <div className='flex gap-4 ml-3'>
            <div>
              <input id="first" type="checkbox" className="w-4 h-4 bg-blue-800 accent-green-300" />
              <label htmlFor="first" className="ms-0.5 text-sm font-medium">
                Repaired need verification
              </label>
            </div>
            <div>
              <input id="second" type="checkbox" className="w-4 h-4 text-blue-800 accent-green-300" />
              <label htmlFor="second" className="ms-0.5 text-sm font-medium">
                In Repair
              </label>
            </div>
          </div>}
        </div>
   
  <div className="overflow-x-auto  mx-2 mt-3">
  <table className="min-w-full table-fixed 2xl:table-auto border-collapse text-sm border border-gray-200">
    <thead className='text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 ">User</th>
        <th className="px-4 py-2 ">Sr.No</th>
        <th className="px-4 py-2 ">Ticket Id</th>
        <th className="px-4 py-2 ">Date</th>
        <th className="px-4 py-2 ">Device Code</th>
        <th className="px-4 py-2 ">Status</th>
        <th className="px-4 py-2 ">Pending Days</th>
        <th className="px-4 py-2 ">DSO Remarks</th>
        <th className="px-4 py-2 ">Vendor Remarks</th>
        <th className="px-4 py-2 ">Action</th>
        
      </tr>
    </thead>
    <tbody>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center '>
        <td className="px-4 py-2">
          <button onClick={()=>setmodalOpen(true)}
          className='px-2 rounded font-bold text-white bg-green-500'>+</button>
        </td>
        <td className="px-4 py-2 ">1</td>
        <td className="px-4 py-2 ">RAJ241008114440</td>
        <td className="px-4 py-2">08/10/2024 11:44:40</td>
        <td className="px-10 py-2">1707372671</td>
        <td className="px-4 py-2 ">
        <select className='w-48 bg-white rounded border-[1.5px] border-gray-400 px-3 py-0.5' name="" id="">
                      <option value="g">In Repair</option>
                      <option value="h">Verification for repaired</option>
                    </select>
        </td>
        <td className="px-16 py-2 ">0</td>
        <td className="px-16 py-2 "> OK</td>
        <td className="px-4 py-2 ">
           <input type='text' className='w-48 rounded border-2 border-gray-400 px-1 py-1'/>           
        </td>
        <td className="px-4 py-2">
        <button className='bg-green-400 text-white px-3 py-1 rounded'>Submit</button>
        </td>
       
      </tr>
      
      
      
    </tbody>
  </table>
</div>
</div>
{modalOpen && <Modal onClose={handleclose}/>}
</div>
  )
}

export default Repairstatus
