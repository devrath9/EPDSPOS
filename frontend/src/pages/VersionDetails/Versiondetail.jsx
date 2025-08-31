import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useNavigate } from 'react-router-dom'

const Versiondetail = () => {

  const { versions, fetchAllversions } = useContext(Admincontext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllversions()
  }, [])

  

  return (
    <div className='w-full m-1 p-1'>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>

        <div>
          <button className='text-white font-bold bg-[#2191c0] rounded py-1.5 w-full '>FPS Version Detail</button>
        </div>

        <div className="overflow-x-auto mx-1 mt-3 border-[1.5px] p-1 border-gray-300 rounded">

           <div className='flex justify-end mt-1 bg-[#2191c0] py-1 px-2 rounded'>
            <button className='bg-green-600 text-white px-8 py-0.5 font-semibold text-sm rounded border-[1.5px] border-gray-400'>Refresh</button>
           </div>


          <table className="min-w-full table-fixed border-collapse text-sm">
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
              <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">Version</th>
                <th className="px-4 py-2 ">Patch Rollout Date</th>
                <th className="px-4 py-2 ">No. of Devices</th>

              </tr>

            </thead>
            <tbody>

              {versions.slice(0,versions.length-1).map((item, index)=>(<tr key={item.Version}
                className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                <td className="px-3 py-2">{index+1}</td>
                <td className="px-3 py-2 underline cursor-pointer "
                     onClick={()=>{navigate(`/versionDetails/${item.Version}`)}}>
                  {item.Version}
                  </td>
                <td className="px-3 py-2">{item.Patch_RollOut_Date} </td>
                <td className="px-3 py-2 ">{item.Total_Devices}</td>
              </tr>))}
            </tbody>

            <tfoot>
            {versions.slice(-1).map((item, index)=>(<tr key={index}
                className='bg-[#2191c0] font-semibold text-white text-center'>
                <td className="px-3 py-1"></td>
                <td className="px-3 py-1 ">Total</td>
                <td className="px-3 py-1"> </td>
                <td className="px-3 py-1 ">{item.Total_Devices}</td>
              </tr>))}
            </tfoot>
          </table>
        </div>





      </div>
    </div>
  )
}

export default Versiondetail
