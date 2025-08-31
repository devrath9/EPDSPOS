import React from 'react'

const Modal = ({onClose}) => {
  return (
    <div onClick={onClose} className='fixed inset-0 visible bg-black/30 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='w-3/4 bg-white px-0.5 py-0.5'>
               <div className='overflow-x-auto'>
               <table className="min-w-full table-fixed border-collapse text-sm">
               <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
               <tr className="bg-[#2191c0] text-white">
                <th className="px-6 py-2 ">User</th>
                <th className="px-6 py-2 ">Status</th>
                <th className="px-6 py-2 ">Date</th>
                <th className="px-6 py-2 ">Date</th>
                <th className="px-6 py-2 ">Remark</th>
                 </tr>
               </thead>
               <tbody>

              <tr
                className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                <td className="px-6 py-2">District Supply Officer, Rajsamand</td>
                <td className="px-6 py-2">In Repair</td>
                <td className="px-6 py-2">08-10-2024 11:44:40</td>
                <td className="px-6 py-2"></td>
                <td className="px-6 py-2">OK</td>
                
              </tr>
            </tbody>

               </table>
               </div>
                

                


                

            </div>

        </div>
  )
}

export default Modal
