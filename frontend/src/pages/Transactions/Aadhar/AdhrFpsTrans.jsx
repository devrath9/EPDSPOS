import React, { useContext, useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Admincontext } from '../../../context/Admincontext'
import { assets } from '../../../assets/assets'
import Loader from '../../Searchdetails/Loader'

const AdhrFpsTrans = () => {

    const {year, month, district, blockID, fpscode} = useParams()
    const {backendUrl} = useContext(Admincontext)
    const navigate = useNavigate()


    //tableref for excel generation
       const tableRef = useRef(null)

    const[TrFPS, setTrFPS] = useState([])
    const[blockname, setBlockName] = useState('')
    const [loading, setLoading] = useState(false)


useEffect(()=>{
   fetchFPSData()
},[year,month, fpscode])

const fetchFPSData = async()=>{
     setLoading(true) 

   try{

       const {data} = await axios.get(backendUrl + `/api/admin/fpsaadharTrans/${fpscode}/${year}/${month}`)
       if(data.success){
           setTrFPS(data.FPSTrans)
           setBlockName(data.FPSTrans[0].Block)
           console.log(data.FPSTrans)
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
                 <p onClick={()=>navigate(`/transactionSummary/ByAadhar/${year}/${month}/${district}/${blockID}`)}
                 className='font-semibold underline cursor-pointer '>{blockname}</p>

                 <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                 <p className='font-semibold'>{fpscode}</p>




         </div>

      <div className=' overflow-x-auto mt-3 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
               <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm 2xl:text-md ">
                   <thead className=''>
                       <tr className='bg-[#2191c0] text-white'>
                           <th  className="px-3 py-1 border-b border-gray-300">Sr.No</th>
                           <th  className="px-3 py-1 border-b border-gray-300">SRDH ID</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Ration</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Receiver</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Aadhar</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Bill Date</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Bill No</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Commodity</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Qty</th>
                           <th  className="px-3 py-1 border-b border-gray-300">Amt(₹)</th>


                       </tr>
                       

                   </thead>
                   <tbody>
                   {TrFPS.map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                           <td className="text-center px-3 py-2"> {index+1}</td>
                           <td className="text-center px-3 py-2">{item.SRDH_ID} </td>
                           <td className="text-center px-3 py-2">{"'" + item.Ration_No}</td>
                           <td className="text-center px-3 py-2">{item.Receiver}</td>
                           <td className="text-center px-3 py-2">{"'" + item.Aadhar}</td>
                           <td className="text-center px-3 py-2">{item.BillDate}</td>
                           <td className="text-center px-3 py-2">{"'" + item.Bill_No}</td>
                           <td className="text-center px-3 py-2">{item.CommodityItem}</td>
                           <td className="text-center px-3 py-2">{item.Quantity}</td>
                           <td className="text-center px-3 py-2">{item.Amount}</td>
                           
                       </tr>))}

                       

                  </tbody>
                  
               </table>
               {loading && <Loader/>}

           </div>


               <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                                                             
                            <DownloadTableExcel
                                filename="Trans_Summary_byAadhar FPS Report"
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

export default AdhrFpsTrans
