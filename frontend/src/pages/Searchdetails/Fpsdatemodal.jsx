import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { Admincontext } from '../../context/Admincontext'
import Loader from './Loader'

const Fpsdatemodal = ({Close, fpsCode, dateID}) => {

   const {FPSdateTrans, fetchFPSdatewise, loading} = useContext(Admincontext)

   useEffect(()=>{
    fetchFPSdatewise(fpsCode, dateID)
   },[fpsCode,dateID])

  return (
    <div className='fixed inset-0 visible bg-black/30 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='w-3/4 bg-white px-0.5 py-0.5 rounded'>
               <div className=' '>

                <div className='bg-[#2191c0] text-white font-semibold w-full flex justify-between px-3 py-1.5 rounded'>
                    <p>FPS Datewise</p> 
                    <img onClick={Close} className='w-4 h-4 cursor-pointer hover:bg-red-500'src={assets.close} alt=''/>
                </div>

                <div className='overflow-x-auto max-h-[300px] overflow-y-auto '>
               <table className="min-w-full table-fixed border-collapse text-xs">
               <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
               <tr className="bg-[#2191c0] text-white">
                <th className="px-4 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">Ration Card</th>
                <th className="px-4 py-2 ">Commodity Issued to</th>
                <th className="px-4 py-2 ">Commodity</th>
                <th className="px-4 py-2 ">Price</th>
                <th className="px-4 py-2 ">Qty</th>
                <th className="px-4 py-2 ">Received Money</th>
                <th className="px-4 py-2 ">Date</th>
                </tr>
               </thead>
               <tbody>

              {FPSdateTrans.map((item, index)=>(<tr key={index}
                className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                <td className="px-4 py-2">{index+1}</td>
                <td className="px-4 py-2">{item.Ration_No}</td>
                <td className="px-4 py-2">{item.CommodityIssueTo}</td>
                <td className="px-4 py-2">{item.Commodity}</td>
                <td className="px-4 py-2">{item.Price}</td>
                <td className="px-4 py-2">{item.Quantity}</td>
                <td className="px-4 py-2">{item.Received_Money}</td>
                <td className="px-4 py-2">{item.Date}</td>
                
              </tr>))}

            </tbody>

            </table>
            </div>
            </div>
                

        </div>

            {loading && <Loader/>}
    </div>
  )
}

export default Fpsdatemodal
