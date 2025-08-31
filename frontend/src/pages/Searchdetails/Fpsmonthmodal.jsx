import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Admincontext } from '../../context/Admincontext'
import Loader from './Loader'
import Fpsdatemodal from './Fpsdatemodal'


const Fpsmonthmodal = ({onClose, monthID, fpsCode}) => {

    const { backendUrl } = useContext(Admincontext)
    const [monthData, setMonthData] = useState([])
    const[openModal, setOpenModal] = useState(false)

   //to be sent to date modal API 
    const[dateID, setDateID] = useState('')
    console.log(dateID)

    const[loading, setLoading] = useState(false)

    const closemodal=()=>{setOpenModal(false)}
    

    useEffect(()=>{
      fetchMonthData()

    },[monthID, fpsCode])


   const fetchMonthData = async()=>{

     setLoading(true)
    try{

      const {data} = await axios.get(backendUrl + `/api/admin/FPSmonthly/${fpsCode}/${monthID}`) 
      if(data.success){
        setMonthData(data.FPSmonthlyData)
        console.log(data.FPSmonthlyData)
      } 
      else{
        console.log(data.message)
      }

    }catch(error){
        console.log(error)
    }finally {
        setLoading(false); // Set loading to false after fetching
      }
   }

  return (
    <>
    <div className='fixed inset-0 visible bg-black/30 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='w-4/5 bg-white px-0.5 py-0.5 rounded'>
               <div className=''>

               <div className='bg-[#2191c0] text-white font-semibold w-full flex justify-between items-center px-3 py-1.5 rounded'>
                 <p>Transactions of <i className='font-extrabold'>{monthID}</i>&nbsp;
                  for FPS CODE :&nbsp;<i className='font-extrabold'>{fpsCode}</i>
                 </p> 
                
                <img onClick={onClose} className='w-4 h-4 cursor-pointer hover:bg-red-500'src={assets.close} alt=''/>
              </div>

              <div className='overflow-x-auto max-h-[300px] overflow-y-auto'>
               <table className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-xs mt-1">
                  <thead className=''>
                     <tr className='bg-[#2191c0] text-white'>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Sr.No</th>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Date</th>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Total Ration</th>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Total Trans</th>
                         <th colSpan="3" className="px-4 py-1 border border-gray-300 ">WHEAT</th>
                         <th colSpan="3" className="px-4 py-1 border border-gray-300 ">SUGAR</th>
                         <th colSpan="3" className="px-4 py-1 border border-gray-300 ">KEROSENE</th>
                         


                     </tr>
                     <tr className='bg-[#2191c0] text-white'>
                         <th className="px-4 py-1 border border-gray-300 ">RC</th>
                         <th className="px-4 py-1 border border-gray-300 ">TX</th>
                         <th className="px-4 py-1 border border-gray-300 ">Qty</th>
                         <th className="px-4 py-1 border border-gray-300 ">RC</th>
                         <th className="px-4 py-1 border border-gray-300 ">TX</th>
                         <th className="px-4 py-1 border border-gray-300 ">Qty</th>
                         <th className="px-4 py-1 border border-gray-300 ">RC</th>
                         <th className="px-4 py-1 border border-gray-300 ">TX</th>
                         <th className="px-4 py-1 border border-gray-300 ">Qty</th>
                         
                         

                     </tr>


                 </thead>
                 <tbody>
                     {monthData.map((item, index)=>(<tr key={item.Date} className='border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                         <td className=" px-4 py-2"> {index+1}</td>
                         <td className=" px-4 py-2">{(item.Date).slice(0,10).split("-").reverse().join("-")}</td>
                         <td className=" px-4 py-2">{item.TotalRation}</td>
                         <td className=" px-4 py-2 underline cursor-pointer"
                             onClick={()=>{setOpenModal(true); setDateID((item.Date).slice(0,10))}}>
                          {item.TotalTrx}
                          </td>
                         <td className=" px-4 py-2 border border-gray-300">{item.RCWheat}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.RCSugar}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.RCKerosene}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Kerosene_TRX}</td>
                         <td className=" px-4 py-2 border border-gray-300">{item.Kerosene_Quantity}</td>
                         
                     </tr>))}
                     

                     

                 </tbody>
                 </table>
                 </div>
               </div>
                

                


                

            </div>
              {openModal && <Fpsdatemodal Close={closemodal} dateID={dateID} fpsCode={fpsCode}/>}
        </div>
        {loading && <Loader/>}
        </>
  )
}

export default Fpsmonthmodal
