import React, { useEffect, useState,useContext } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loader from '../Searchdetails/Loader'
import { assets } from '../../assets/assets'

const DevicelistModal = ({onClose, district, statusID}) => {

    const { backendUrl } = useContext(Admincontext)
    const [deviceList, setDeviceList] = useState([])
    const [statusname, setStatusName] = useState('')
    const[query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
      fetchDeviceList()
    },[district,statusID])


    const filteredList = deviceList.filter(item=>item.DEVICE_CODE.toLowerCase().includes(query.toLowerCase()))

    const fetchDeviceList = async()=>{
      setLoading(true)

      try{
        
        const {data} = await axios.get(backendUrl + `/api/admin/deviceList/${district}/${statusID}`)
        if(data.success){
          setDeviceList(data.DeviceList)
          setStatusName(data.status)
        }
        else{
          toast.error(data.message)
          console.log(data.message)
        }

      }catch(error){
        console.log(error.message)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }

    



  return (
    <div onClick={onClose} className='fixed inset-0 flex items-center justify-center bg-black/30 '>
      <div onClick={(e)=>e.stopPropagation()} className='border-2 border-gray-300 p-2 max-md:w-2/3 w-1/3 xl:w-1/4 bg-white rounded flex flex-col items-center]'>
          <div className='w-full px-2 py-1 flex justify-between bg-[#2191c0] items-center text-white rounded'>
            <p>{statusname} List for {district}</p>
            <img onClick={onClose}
              src={assets.close} className='w-4 h-4 cursor-pointer hover:bg-red-500' alt=''/>

          </div>
           
          <div className=' mt-2 bg-[#F2F3FF] rounded border-[3px] border-gray-200'>

          <div className=' rounded py-2 text-center '>
          <input onChange={(e)=>setQuery(e.target.value)}
             type='text' placeholder='Enter Device Code' 
             className=' w-36 md:w-48 px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2'/>
          </div>

         <div className='min-h-[250px] max-h-[400px] overflow-y-auto rounded p-1 font-medium'>

          {loading && < Loader/>}
          
         <div className='flex flex-col  gap-y-2 bg-[#F2F3FF] rounded mt-1 text-center mb-2'>
           {filteredList.map((item)=>(
            <p key={item.DEVICE_CODE}>{item.DEVICE_CODE}</p>
           ))}
            
            
            
            


         </div>
         </div>
         </div> 
      </div>
      
    </div>
  )
}

export default DevicelistModal
