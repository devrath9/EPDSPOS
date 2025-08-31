import React, { useContext, useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Admincontext } from '../../../context/Admincontext'
import { assets } from '../../../assets/assets'
import Loader from '../../Searchdetails/Loader'

const AdhrBlock = () => {

    const {year,month, district, blockID} = useParams()
    const {backendUrl} = useContext(Admincontext)
     const navigate = useNavigate()

     //tableref for excel generation
        const tableRef = useRef(null) 

  const[TrBlock, setTrBlock] = useState([])
  const[blockname, setBlockName] = useState('')
  const [loading, setLoading] = useState(false)


useEffect(()=>{
    fetchBlockData()
},[year,month, blockID])

const fetchBlockData = async()=>{
      setLoading(true) 

    try{

        const {data} = await axios.get(backendUrl + `/api/admin/blockaadharTrans/${blockID}/${year}/${month}`)
        if(data.success){
            setTrBlock(data.BlockAadharTrans)
            setBlockName(data.BlockAadharTrans[0].Block)
            console.log(data.BlockAadharTrans)
        }
        else{
            console.log(data.message)
        }
    }catch(error){
        console.log(error)
        
    }finally{
        setLoading(false)
    }
}


  return (
    <div className='w-full m-1 p-1'>

    <div className='p-1 border-[1.5px] border-gray-300 rounded'>

       <div>
         <button className='text-white font-bold bg-[#2191c0] rounded py-2 w-full text-left pl-4 text-sm '>
            Transaction Summary By Aadhar : {month} {year} </button>
       </div>

         <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-[14px]'>
                 <img onClick={()=>navigate('/transactionSummary#adhar')}
                   className='w-5 h-5 mt-0.5 cursor-pointer'src={assets.home} alt=''/>
                
                 <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                 <p onClick={()=>navigate(`/transactionSummary/ByAadhar/${year}/${month}`)} 
                 className='font-semibold underline cursor-pointer'>Entire State</p>

                 <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                 <p onClick={()=>navigate(`/transactionSummary/ByAadhar/${year}/${month}/${district}`)}
                 className='font-semibold underline cursor-pointer'>{district}</p>

                 <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                 <p className='font-semibold '>{blockname}</p>


         </div>

      <div className=' overflow-x-auto mt-3 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
               <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                   <thead className=''>
                       <tr className='bg-[#2191c0] text-white'>
                           <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">Sr.No</th>
                           <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">FPS Code</th>
                           <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">FPS Owner</th>
                           <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">FPS Location</th>
                           <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">No. of Transaction</th>
                           <th colSpan="2" className="px-4 py-1 border border-gray-300  ">WHEAT</th>
                           <th colSpan="2" className="px-4 py-1 border border-gray-300  ">SUGAR</th>
                           <th colSpan="2" className="px-4 py-1 border border-gray-300  ">KEROSENE</th>


                       </tr>
                       <tr className='bg-[#2191c0] text-white'>
                           <th className="px-4 py-1 border border-gray-300">TX</th>
                           <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                           <th className="px-4 py-1 border border-gray-300">TX</th>
                           <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                           <th className="px-4 py-1 border border-gray-300">TX</th>
                           <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                          

                       </tr>


                   </thead>
                   <tbody>
                   {TrBlock.map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                           <td className="text-center px-4 py-2"> {index+1}</td>
                           <td onClick={()=>navigate(`/transactionSummary/ByAadhar/${year}/${month}/${district}/${blockID}/${item.FPSCode}`)}
                           className="text-center px-4 py-2 underline cursor-pointer font-semibold">
                               {item.FPSCode} 
                           </td>
                           <td className="text-center px-4 py-2">{item.FPS_Owner}</td>
                           <td className="text-center px-4 py-2">{item.FPS_Location}</td>
                         
                           <td className="text-center px-4 py-2">{item.Total_Trx}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_TRX}</td>
                           <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_Quantity}</td>
                       </tr>))}

                       

                   </tbody>
                  
               </table>
               {loading && <Loader/>}

           </div>

               <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                                                             
                        <DownloadTableExcel
                            filename="Trans_Summary_byAadhar Block Report"
                            sheet="Transaction Report By Aadhar"
                            currentTableRef={tableRef.current}>
                                      
                            <button className='px-2 py-1 bg-[#2191c0] rounded'>
                                 Excel
                            </button>
                                                                 
                        </DownloadTableExcel>
                </div>
     </div>
   </div>
  )
}

export default AdhrBlock
