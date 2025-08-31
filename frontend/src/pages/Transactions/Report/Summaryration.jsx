import React from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import { Admincontext } from '../../../context/Admincontext'
import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Transcontext } from '../../../context/Transcontext'
import Appliedfilters from './Appliedfilters'
import { assets } from '../../../assets/assets'

const Summaryration = () => {

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state)

    
    //tableref for excel generation
      const tableRef = useRef(null) 
    


    const {backendUrl} = useContext(Admincontext)
    const {selectedcardTypes,selectedTransTypes} = useContext(Transcontext)  //selected filters from all districts page

    const [rationTrans, setRationTrans] = useState([])

    useEffect(()=>{
        fetchRationDetails()
    },[])

    const fetchRationDetails = async()=>{
        try{
          
            const {data} = await axios.post(backendUrl + `/api/admin/transactions/rationwise/${location.state.TFps}`,
                                                                              {cardType : selectedcardTypes.join(','), 
                                                                              TrxType: selectedTransTypes.join(',')}
            )
            if(data.success){
               setRationTrans(data.RationTransactions)
               console.log(data.RationTransactions) 
            }
            else{
                console.log(data.message)
            }

        }catch(error){
            console.log(error.message)
        }
    }

  return (
    
    <div className='w-full m-1 p-1'>
       <div className='p-1 border-[1.5px] border-gray-300 rounded'>
   
    <div>
    <button className='bg-[#2191c0] text-white font-semibold w-full mt-0.5 py-2 rounded' disabled>Transaction Summary Report (FPS)</button>
   </div> 

   <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-sm'>
                            <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                           <p onClick={()=>navigate('/transactionSummary#report')} className='font-semibold underline cursor-pointer'>
                            Entire State
                            </p>

                            <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                           <p onClick={()=>{navigate('/transactionSummary/blockReport', {state:{Tdistrict:location.state.TDistrict}})}}
                           className='font-semibold underline cursor-pointer'>{location.state.TDistrict}</p>

                           <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                           <p onClick={()=>{navigate('/transactionSummary/FPSReport', {state:{TBlock:location.state.TBlock,TDistrict:location.state.TDistrict, TBlockname:location.state.TBlockname}})}}
                           className='font-semibold underline cursor-pointer'>{location.state.TBlockname}</p>

                           <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
                            <p className='font-semibold'>{location.state.TFps}</p>
    </div>



       <div className='flex flex-col mt-3 m-1.5 border-[1.5px] border-gray-300 px-4 py-2 rounded text-sm'>
                
                <Appliedfilters cardfilter={selectedcardTypes} transfilter={selectedTransTypes}/>
                
        </div>

   
  <div className="overflow-x-auto mt-3  border-[1.5px] p-1 border-gray-300 rounded ">
  <table ref={tableRef} className="min-w-full table-fixed border-collapse text-sm border border-gray-300">
    <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
      <tr className="bg-[#2191c0] text-white">
        <th className="px-2 py-2 ">Sr.No</th>
        <th className="px-4 py-2 ">Ration No</th>
        <th className="px-4 py-2 ">UID Owner</th>
        <th className="px-4 py-2 ">Aadhar</th>
        <th className="px-4 py-2 ">Bill Date</th>
        <th className="px-4 py-2 ">Bill No</th>
        <th className="px-4 py-2 ">Commodity</th>
        <th className="px-4 py-2 ">Quantity</th>
        <th className="px-4 py-2 ">Amount</th>
    </tr>

    </thead>
    <tbody>
      {rationTrans.map((item, index)=>
      (<tr key={item.Ration_No} 
       className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
        <td className="px-3 py-2">{index+1}</td>
        <td className="px-3 py-2 ">{"'" +item.Ration_No}</td>
        <td className="px-3 py-2"> {item.UID_Owner}</td>
        <td className="px-3 py-2 "> {"'" +item.Aadhar}</td>
        <td className="px-3 py-2">  {item.BillDate}</td>
        <td className="px-3 py-2 "> {"'" +item.Bill_No}</td>
        <td className="px-3 py-2 "> {item.CommodityItem}</td>
        <td className="px-3 py-2">  {item.Quantity}</td>
        <td className="px-3 py-2">{item.Amount}</td>
       
      </tr>))}
      
      
      
      </tbody>
    </table>
  </div>
      <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                                      
                         <DownloadTableExcel
                                filename="Transaction Summary FPS Report"
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

export default Summaryration
