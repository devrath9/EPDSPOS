import React, { useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import { Admincontext } from '../../context/Admincontext'
import { useContext } from 'react'
import { assets } from '../../assets/assets'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import useCurrentTime from '../../hooks/useCurrentTime'
import { generateDistrictPDF } from './AllPDF/GeneratePDF'



const Blockdata = () => {
    
    const navigate = useNavigate()
   
    
    const {district} = useParams()
    const tableRef = useRef(null);
   

    const {backendUrl} = useContext(Admincontext)
    const [blockData, setBlockData] = useState([])
    // console.log(distoken)
    // const distoken = localStorage.getItem('district')


    
  
   const currentTime = useCurrentTime()   //setting time for pdf created via custom hook useCurrentTime()
   
    

    useEffect(()=>{
        fetchBlocks()
    },[])

    const fetchBlocks = async()=>{
        try{
            
            const {data} = await axios.get(backendUrl + `/api/admin/district/${district}`)
            if(data.success){
                setBlockData(data.districtData)
                console.log(data.districtData)

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

    <div className='w-full border-[1.5px] py-2 flex flex-start items-center gap-2 px-2 bg-[#2191c0] text-white  mt-1 rounded  font-semibold'>
        <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
        <p onClick={()=>navigate('/POSregistered')} className='font-semibold underline cursor-pointer'>{district}</p>
    </div>

    <div className='mt-2 overflow-x-auto border-[1.5px] p-1 mx-1 border-gray-300 rounded'>


      <table ref={tableRef} className="table-auto xl:table-fixed w-full bg-white border-b-2 border-gray-400">
        <thead className="bg-[#2191c0] text-white">
          <tr>
            <th className=" px-4 py-1.5 ">
              S.No
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Phase
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Block
            </th>

            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Total FPS
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              Registered FPS
            </th>
            <th className=" px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
              % Registered FPS
            </th>
          </tr>
        </thead>
        <tbody className='text-center font-semibold text-gray-600'>
          {blockData.slice(0, blockData.length-1).map((item, index)=>(<tr key={item.Block_id} className='text-center border-b-2 border-gray-300'>
            <td className=" px-4 py-2">
              {index + 1}
            </td>
            <td className=" px-4 py-2">
              phase1
            </td>
            <td className=" px-4 py-2 underline cursor-pointer"
            onClick={()=>{navigate(`/POSregistered/${district}/${item.Block_id}`)}}>
              {item.Block}
            </td>
            <td className=" px-4 py-2">
             {item.Total_FPS}
            </td>
            <td className=" px-4 py-2">
              {item.Registered}
            </td>
            <td className=" px-4 py-2">
            {Math.floor((item.Registered*100/item.Total_FPS)*100)/100}%
            </td>
          </tr>))}
          
        </tbody>
        <tfoot>
          { blockData.slice(-1).map((item, index)=>(<tr key={index}className='bg-[#2191c0] text-center font-semibold text-white text-sm'>
            <td className=" px-4 py-2">
              
            </td>
            <td className=" px-4 py-2">
              Totals
            </td>
            <td className=" px-4 py-2">
              
            </td>
            <td className="border-b-2 border-gray-400 px-4 py-2">
            {item.Total_FPS}
            </td>
            <td className="border-b-2 border-gray-400 px-4 py-2">
            {item.Registered}
            </td>
            <td className="border-b-2 border-gray-400 px-4 py-2">
              
            </td>
          </tr>)) }
        </tfoot>
      </table>
    </div>

    <div className='flex gap-2 text-white font-semibold mt-2'>
        <DownloadTableExcel
                            filename="Registered POS District Report"
                            sheet="POS Report"
                            currentTableRef={tableRef.current}
                        >
        
                    <button className='px-2 py-1 bg-[#2191c0] rounded cursor-pointer'> Excel </button>
        
        </DownloadTableExcel>


        

        <button onClick={()=>generateDistrictPDF(blockData, currentTime)}
        className='bg-[#2191c0] px-2 py-1 rounded cursor-pointer'>PDF</button>
        
    </div>
    </div>
  </div>
  )
}

export default Blockdata
