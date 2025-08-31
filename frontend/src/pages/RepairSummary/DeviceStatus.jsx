import React,{useState, useContext} from 'react'
import axios from 'axios'
import { Admincontext } from '../../context/Admincontext/'
import {toast} from 'react-toastify'

const DeviceStatus = () => {

    
    const [isOpen,setIsopen] = useState(false)
    const [isTableOpen, setIsTableOpen] = useState(false)
    const [deviceCode, setDeviceCode] = useState('')
    const [deviceInfo, setDeviceInfo] = useState([])

    const { backendUrl } = useContext(Admincontext)


   

    const fetchDeviceInfo =async(e)=>{
      e.preventDefault()
       try{

        const {data} = await axios.get(backendUrl +`/api/admin/deviceStatus/${deviceCode}`)
        if(data.success){
          setDeviceInfo(data.DeviceInfo)
          setIsopen(true)

        }else{
            //  toast.warn(data.message)
             setDeviceInfo(data.DeviceInfo)
             setIsopen(true)
             console.log(data.message)
        }
       }catch(error){
        console.log(error)
        alert(error.message)
       }
      

    }


  return (
    <div className='flex flex-col'>
       <form onSubmit={fetchDeviceInfo} className='flex flex-wrap items-center gap-3 border-[1.5px] border-gray-400 py-2 px-2 rounded'>
           
         <input type='text' placeholder='Enter Device Code' required
              onChange={(e)=>setDeviceCode(e.target.value)} value={deviceCode}
           className='px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2'/>
    

   
          <button type='submit' className='bg-green-600 text-white font-semibold px-3 rounded py-1 '>Get details</button>
          <button onClick={()=>{setIsopen(false);setIsTableOpen(false);setDeviceCode('')}}
          type='button' className='bg-[#2191c0] text-white font-semibold px-3 rounded py-1 '>RESET</button>
    
       </form>


       {isOpen && <div className='mt-3 border-[1.5px] border-gray-400 px-2 py-1 rounded '>

          <button onClick={()=>setIsTableOpen(!isTableOpen)}
          className='bg-[#2191c0] px-2 py-1 text-white font-semibold text-sm rounded mx-2 mt-1 '> 
           Device Status Report {isTableOpen ? " - " :" + "}
          </button>


          {isTableOpen && <div className=' overflow-x-auto mt-1 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
               <table className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm 2xl:text-md ">
                   <thead className=''>
                       <tr className='bg-[#2191c0] text-white'>
                           <th  className="px-3 py-1 border-b border-gray-300">Sr.No</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Device Code</th>
                           <th  className="px-3 py-1 border-b border-gray-300">District</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Status</th>
                        </tr>
                       

                   </thead>
                   <tbody className='bg-white'>
                   {deviceInfo.length>0 ?  deviceInfo.map((item, index)=>(<tr key={item.DEVICE_CODE} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                           <td className="text-center px-3 py-2"> {index+1}</td>
                           <td className="text-center px-3 py-2">{item.DEVICE_CODE} </td>
                           <td className="text-center px-3 py-2">{item.District}</td>
                           <td className="text-center px-3 py-2">{item.Status}</td>
                           
                          </tr>))
                          :<td colSpan="4" className="text-center py-1">No records found</td>}

                       

                  </tbody>
                  
               </table>
               </div>}

        </div>}
    </div>
  )
}

export default DeviceStatus
