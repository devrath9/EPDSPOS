import React, { useEffect, useState,useRef } from 'react'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { useLocation, useNavigate} from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Admincontext } from '../../../context/Admincontext'
import { useContext } from 'react'
import Appliedfilters from './Appliedfilters'
import { Transcontext } from '../../../context/Transcontext'


const Summaryblocks = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    
   const {selectedcardTypes,selectedTransTypes} = useContext(Transcontext)  //selected filters from all districts page
    

    const {backendUrl} = useContext(Admincontext)

    const [blockTrans, setBlockTrans] = useState([])

    //tableref for excel generation
       const tableRef = useRef(null) 
   
    

    useEffect(()=>{
        fetchBlocks()
    },[])


    const fetchBlocks = async()=>{
         try{

            const {data} = await axios.post(backendUrl +`/api/admin/transactions/blocks/${location.state.Tdistrict}`,
                                                                              {cardType : selectedcardTypes.join(','), 
                                                                                TrxType: selectedTransTypes.join(',')} 
            )
            if(data.success){
                setBlockTrans(data.BlockTransactions)
                // console.log(data.BlockTransactions)
            }
            else{
                console.log(data.message)
            }

         }catch(error){console.log(error.message)}
    }

  return (
    <div className='w-full m-1 p-1'>
        <div className='p-1 border-[1.5px] border-gray-300 rounded'>
        
       <div>
         <button className='bg-[#2191c0] text-white font-semibold w-full mt-0.5 py-2 rounded' disabled>Transaction Summary Report (District)</button>
      </div> 

            <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-sm'>
                     <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                    <p onClick={()=>navigate('/transactionSummary#report')} className='font-semibold underline cursor-pointer'>Entire State</p>
                     <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                    <p className='font-semibold'>{location.state.Tdistrict}</p>
                </div>



                <div className='flex flex-col mt-3 m-1.5 border-[1.5px] border-gray-300 px-4 py-2 rounded text-sm'>
                
                  <Appliedfilters cardfilter={selectedcardTypes} transfilter={selectedTransTypes}/>
                  
                </div>

            
            <div className='w-full overflow-x-auto mt-3 border-[1.5px] p-1 border-gray-300 rounded'>
                <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                    <thead className=''>
                        <tr className='bg-[#2191c0] text-white'>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Sr.No</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Block</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">No. of Transaction</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">WHEAT</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">SUGAR</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">DAAL</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">GHEE</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">OIL</th>


                        </tr>
                        <tr className='bg-[#2191c0] text-white'>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (KL)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (KL)</th>

                        </tr>


                    </thead>
                    <tbody>
                        {blockTrans.slice(0,blockTrans.length-1).map((item, index)=>(<tr key={item.Block_ID}className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                            <td className="text-center px-4 py-2"> {index+1}</td>
                            <td className="text-center px-4 py-2 font-semibold underline cursor-pointer"
                                 onClick={()=>{navigate('/transactionSummary/FPSReport', {state:{TBlock:item.Block_ID, TBlockname:item.Block, TDistrict:item.District}})}}>
                                {item.Block}
                            </td>
                            <td className="text-center px-4 py-2">{item.Total_Trx}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_Quantity}</td>
                        </tr>))}

                        

                    </tbody>
                    <tfoot>
                         {blockTrans.slice(-1).map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-bold text-white bg-[#2191c0]'>
                            <td className="text-center px-4 py-2"></td>
                            <td className="text-center px-4 py-2 ">TOTAL</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Total_Trx}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_Quantity}</td>
                            

                        </tr>))}
                    </tfoot>
                </table>

            </div>

               <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                          
                           <DownloadTableExcel
                                filename="Transaction Summary District Report"
                                sheet="Transaction Report"
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

export default Summaryblocks
