
import React, { useContext, useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Admincontext } from '../../../context/Admincontext'
import { assets } from '../../../assets/assets'
import Loader from '../../Searchdetails/Loader'

const AdhrState = () => {

const {year, month} = useParams()
const {backendUrl} = useContext(Admincontext)
const navigate = useNavigate()


//tableref for excel generation
   const tableRef = useRef(null) 

const[TrData, setTrData] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{
    fetchAllDistricts()
},[year,month])

const fetchAllDistricts = async()=>{
      setLoading(true) 

    try{

        const {data} = await axios.get(backendUrl + `/api/admin/aadharTrans/allDistricts/${year}/${month}`)
        if(data.success){
            setTrData(data.AadharTransactions)
            console.log(data.AadharTransactions)
        }
        else{
             console.log(data.message)
             toast.warn(data.message)
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
                  <p className='font-semibold '>Entire State</p>
          </div>

       <div className=' overflow-x-auto mt-3 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
                 <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                    <thead className=''>
                        <tr className='bg-[#2191c0] text-white'>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">Sr.No</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">District</th>
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
                    { TrData.slice(0,TrData.length-1).map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                            <td className="text-center px-4 py-2"> {index+1}</td>
                            <td onClick={()=>{navigate(`/transactionSummary/ByAadhar/${year}/${month}/${item.District}`)}}
                            className="text-center px-4 py-2 underline cursor-pointer font-semibold">
                                {item.District} 
                            </td>
                            <td className="text-center px-4 py-2">{item.Total_Trx}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_Quantity}</td>
                        </tr>))}

                        

                    </tbody>
                     <tfoot>
                         { TrData.slice(-1).map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-bold text-white bg-[#2191c0]'>
                            <td className="text-center px-4 py-2"></td>
                            <td className="text-center px-4 py-2 ">TOTAL</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Total_Trx}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Kerosene_Quantity}</td>
                           
                            

                        </tr>))
                        }
                    </tfoot> 

                </table>
                {loading && <Loader/>}

            </div>

               <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                                                  
                        <DownloadTableExcel
                                filename="Trans_Summary_byAadhar State Report"
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

export default AdhrState
