import React, {useContext, useEffect, useState, useRef} from 'react'
import DeviceStatus from './DeviceStatus'
import { Admincontext } from '../../context/Admincontext'
import DevicelistModal from './DevicelistModal'
import { generatePOSStatusPDF } from './GeneratePDF'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import useCurrentTime from '../../hooks/useCurrentTime'

const StatusReport = () => {

   const { repairData, fetchRepairSummary} = useContext(Admincontext)

   const[openModal, setOpenModal] = useState(false)
   const[districtname, setDistrictName] = useState('')
   const [status, setStatus] = useState('')

   const closeModal=()=>{
    setOpenModal(false)
   }

   //hook for setting currenttime used in pdf generation
     const currentTime = useCurrentTime()

   //TABLEREF for EXCEL   
     const tableRef = useRef(null)
   

   useEffect(()=>{
    fetchRepairSummary()
   },[])
    

      
  return (
    <div className='w-full p-1 m-1  text-sm'>
         <div className='p-1 border-[1.5px] border-gray-300 rounded'>
        <div>
          <button className='w-full bg-[#2191c0] text-white font-bold mb-2 py-2 rounded disabled text-[15px]'>POS Status Report</button>
        </div>

       

        
        {<DeviceStatus/>}

        {openModal && <DevicelistModal onClose={closeModal} district={districtname} statusID={status}/>}


        <div className='overflow-x-auto mt-3  border-[1.5px] p-1 border-gray-300 rounded '>


          <table ref={tableRef} className="min-w-full table-fixed border-collapse text-sm border border-gray-300 ">
            <thead className=" text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300">
            <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">District</th>
                <th className="px-4 py-2 ">Ordered POS</th>
                <th className="px-4 py-2 ">Registered POS</th>
                <th className="px-4 py-2 ">Available POS</th>
                <th className="px-4 py-2 ">In Repair</th>
                <th className="px-4 py-2 ">Repair not verified</th>
                <th className="px-4 py-2 ">Irreparable</th>
                
            </tr>
            </thead>
            <tbody className='text-center font-semibold text-gray-600 '>
              {repairData.slice(0,repairData.length-1).map((item,index)=>(<tr key={item.District} className='border-b-2 border-gray-300'>
                <td className=" px-4 py-2">{index+1}</td>

                <td className=" px-4 py-2">{item.District}</td>

                <td className=" px-4 py-2">{item.Ordered_Pos}</td>

                <td className=" px-4 py-2">{item.Registered_Pos}</td>

                <td className="px-4 py-2">
                  <span onClick={()=>{setDistrictName(item.District); 
                                       setStatus(1);
                                        item.Available_Pos!==0 && setOpenModal(true)}}
                                        
                     className={`${item.Available_Pos!==0 ? 'underline cursor-pointer font-extrabold italic  ' :''}`} >
                    {item.Available_Pos}
                  </span>
                </td>


                <td className= "px-4 py-2">
                  <span onClick={()=>{setDistrictName(item.District); 
                                       setStatus(2);
                                      item.In_Repair!==0 && setOpenModal(true)}}

                   className={` ${item.In_Repair!==0 ? 'underline cursor-pointer font-extrabold italic ' :''}`}>
                  {item.In_Repair}
                  </span>
                </td>


                <td className="px-4 py-2" >
                  <span onClick={()=>{setDistrictName(item.District); 
                                       setStatus(3);
                                      item.RepairNot_Verified!==0 && setOpenModal(true)}}

                    className={`${item.RepairNot_Verified!==0 ? 'underline cursor-pointer font-extrabold italic' :''}`}>
                   {item.RepairNot_Verified}
                  </span>
                </td>


                <td className="px-4 py-2">
                  <span onClick={()=>{setDistrictName(item.District); 
                                       setStatus(4);
                                      item.Damaged!==0 && setOpenModal(true)}}

                    className={`${item.Damaged!==0 ? 'underline cursor-pointer font-extrabold italic' :''}`}>
                    {item.Damaged}
                  </span>
                </td>
               </tr>))}
              




            </tbody>
            <tfoot className='text-center font-semibold text-white bg-[#2191c0]'>
              {repairData.slice(-1).map((item,index)=>(<tr key={index} className=''>
               <td className=" px-4 py-2"></td>
               <td className=" px-4 py-2">TOTAL</td>
               <td className=" px-4 py-2">{item.Ordered_Pos}</td>
               <td className=" px-4 py-2">{item.Registered_Pos}</td>
               <td className=" px-4 py-2">{item.Available_Pos}</td>
               <td className=" px-4 py-2">{item.In_Repair}</td>
               <td className=" px-4 py-2">{item.RepairNot_Verified}</td>
               <td className=" px-4 py-2">{item.Damaged}</td>
             </tr>))}
            </tfoot>
          </table>
        </div>


        {/**----------------DOWNLOAD BUTTONS-------------------------- */}

        <div className='flex gap-2 text-white font-semibold mt-2'>

         <DownloadTableExcel
                filename="POS Status Repot"
                sheet="POS Report"
                currentTableRef={tableRef.current}>
                         
            <button className='px-2 py-1 bg-[#2191c0] rounded cursor-pointer'> Excel </button>
                         
          </DownloadTableExcel>



          <button onClick={()=>{generatePOSStatusPDF(repairData, currentTime)}}
          className='px-2 py-1 bg-[#2191c0] rounded'>Pdf</button>
        </div>
        </div>
      </div>
  )
}

export default StatusReport
