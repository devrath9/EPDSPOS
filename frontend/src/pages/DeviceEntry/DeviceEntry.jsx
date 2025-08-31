import React from 'react'

const DeviceEntry = () => {
  return (
    <div className='w-full p-1 m-1' >
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>

      <div>
        <button className='w-full bg-[#2191c0] text-white font-bold mb-2 py-2 rounded disabled text-[15px]'>Daily Device Entry</button>
      </div>

      <div className=' overflow-x-auto mt-5 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
                <table className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                    <thead className='border-b-2 border-gray-200'>
                        <tr className='bg-[#2191c0] text-white'>
                            <th rowSpan="2" className="px-4 py-1 border  border-gray-300">District</th>
                            <th rowSpan="2" className="px-4 py-1 border border-gray-300">Block</th>
                            <th colSpan="3" className="px-4 py-1 border border-gray-300  ">Device Details</th>
                            
                       </tr>
                        <tr className='bg-[#2191c0] text-white'>
                            <th className="px-4 py-1 border border-gray-300">Total FPS</th>
                            <th className="px-4 py-1 border border-gray-300">Total Devices Installed (Yesterday)</th>
                            <th className="px-4 py-1 border border-gray-300">Devices Installed Today</th>
                           

                        </tr>
                      
                    </thead>


                    <tbody >
                          <tr>
                          <td className='font-medium text-base'>No records found</td>
                          </tr>
                         
                    </tbody>
                    
                   
                </table>

            </div>

            <div className='mt-5 px-3 py-2 border-[1.5px] border-gray-300 rounded'>
              <p className='font-semibold'>Note</p>

              <ul className='mt-3 ml-3'>
                <li>1. Please enter No. of PoS provided <span className='font-bold text-red-600'>(TODAY only) </span> to FPS owners. </li>
                <li>2. Once entered the value can not be changed. To correct the entries, please mail to 
                    <span className='font-bold'> epdspmu@gmail.com</span> with subject: <br/> 
                    <span className='font-bold ml-1'>"Your Company Name": Incorrect entry in Daily Device Entry"</span></li>
              </ul>
            </div>

      </div>
    </div>
  )
}

export default DeviceEntry
