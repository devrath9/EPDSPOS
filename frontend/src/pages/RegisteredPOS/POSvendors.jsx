import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import { Admincontext } from '../../context/Admincontext'
import { useContext } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import useCurrentTime from '../../hooks/useCurrentTime'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { generateBlockPDF } from './AllPDF/GeneratePDF'


const POSvendors = () => {

    const navigate = useNavigate()
    

    const tableRef = useRef(null)


    const currentTime = useCurrentTime()   //setting time for pdf created via custom hook useCurrentTime()
    


  //for API CALLING
    const {district, blockId}  = useParams()

    const {backendUrl} = useContext(Admincontext)
    const [vendorData, setVendorData]  = useState([])
    const [block, setBlock] = useState()

    useEffect(()=>{
      
      
        fetchVendors()
      
    },[])


    const fetchVendors = async()=>{
        try{
         
            const {data} = await axios.get(backendUrl + `/api/admin/blocks/${blockId}`)
            if(data.success){
                setVendorData(data.VendorData)
                console.log(data.VendorData)
                setBlock(data.VendorData[0].Block_Name)

            }
            else{
                console.log(data.message)
            }

        }catch(error){console.log(error.message)}
    }

  return  (
  <div className='w-full p-1 m-1 text-sm'>
    <div className='p-1 border-[1.5px] border-gray-300 rounded'>
      
    <div>
      <button className='w-full bg-[#2191c0] text-white font-bold mb-2 py-2 rounded text-[15px]' disabled>Device Register Report</button>
    </div>

    <div className='w-full border-[1.5px] py-2 flex flex-start items-center bg-[#2191c0] text-white gap-2 px-2  mt-1 rounded font-semibold'>
         <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
        <p onClick={()=>navigate('/POSregistered')} className='font-semibold underline cursor-pointer'>{district}</p>
         <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
        <p onClick={()=>{navigate(`/POSregistered/${district}`)}}  className='font-semibold underline cursor-pointer'>{block}</p>
    </div>

    <div className='mt-2 overflow-x-auto border-[1.5px] p-1 mx-1 border-gray-300 rounded'>


      <table ref={tableRef} className="table-auto xl:table-fixed w-full bg-white border-b-2 border-gray-400 ">
        <thead className="bg-[#2191c0] text-white">
          <tr>
            <th className=" px-4 py-1.5 w-14 ">
              S.No
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              FPS Code
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Shop No
            </th>

            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              FPS owner
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Address
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Mobile Numer
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Device Code
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Install Date
            </th>
          </tr>
        </thead>
        <tbody className='text-center font-bold text-gray-600 text-xs 2xl:text-sm'>
          {vendorData.map((item, index)=>(<tr key={index} className='text-center border-b-2 border-gray-300' >
            <td className=" px-4 py-2">
              {index+1}
            </td>
            <td className=" px-4 py-2">
              {item.FPSCode}
            </td>
            <td className=" px-4 py-2">
            {item.Shop_No}
            </td>
            <td className=" px-4 py-2">
            {item.FPS_Ouner}
            </td>
            <td className=" px-4 py-2">
            {item.Address}
            </td>
            <td className=" px-4 py-2">
            {item.MobileNo}
            </td>

            <td className=" px-4 py-2 ">
            {item.Device_Code}
            </td>
            <td className=" px-4 py-2">
           
            {new Date(item.Install_Date).toDateString()}
            </td>

          </tr>))}
          

          
       </tbody>
      </table>
    </div>

    <div className='flex gap-2 text-white font-semibold mt-2'>
         <DownloadTableExcel
                            filename="Registered POS Block Report"
                            sheet="POS Report"
                            currentTableRef={tableRef.current}
                            >
                
                            <button className='px-2 py-1 bg-[#2191c0] rounded cursor-pointer'> Excel </button>
                
          </DownloadTableExcel>
        

        

           <button onClick={()=>generateBlockPDF(vendorData, currentTime)}
             className='bg-[#2191c0] px-2 py-1 rounded cursor-pointer'>PDF</button>
       
    </div>
    </div>
  </div>
  )
}

export default POSvendors
