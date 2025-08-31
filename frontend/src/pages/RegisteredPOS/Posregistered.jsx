import React, { useEffect,useRef,useState } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import useCurrentTime from '../../hooks/useCurrentTime'
import { generateAllDistrictsPDF } from './AllPDF/GeneratePDF';

const Posregistered = () => {

  const {districtData, fetchDistrictData} = useContext(Admincontext)
  const navigate = useNavigate()
  const tableRef = useRef(null);



  
   const currentTime = useCurrentTime()   //setting time for pdf created via custom hook useCurrentTime()



   
   useEffect(()=>{
     fetchDistrictData()
  },[])


  return (
    <div className='w-full p-1 m-1 text-sm'>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>
      <div>
        <button className='w-full bg-[#2191c0] text-white font-bold mb-2 py-2 rounded disabled text-[15px]'>Device Register Report</button>
      </div>

      <div className='flex flex-wrap gap-2 border-[1.5px] border-gray-400 py-2 px-2 rounded'>
        <div><span className='font-semibold'>From :</span> <input type='date' className='w-36 px-2 py-1 rounded' /></div>
        <div><span className='font-semibold'>To : </span><input type='date' className='w-36 px-2 py-1 rounded' /></div>
        <div className='flex gap-2'>
          <button className='bg-[#2191c0] text-white font-semibold px-3 rounded'>GO</button>
          <button className='bg-[#2191c0] text-white font-semibold px-3 rounded '>Reset</button>
        </div>
      </div>

      <div className='mt-2 overflow-x-auto border-[1.5px] p-1 border-gray-300 rounded'>


        <table ref={tableRef} className=" table-auto xl:table-fixed w-full bg-white border border-gray-300">
          <thead className="bg-[#2191c0] text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-1.5 ">
                S.No
              </th>
              <th className="border border-gray-300 px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
                Phase
              </th>
              <th className="border border-gray-300 px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
                District
              </th>

              <th className="border border-gray-300 px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
                Total FPS
              </th>
              <th className="border border-gray-300 px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
                Registered FPS
              </th>
              <th className="border border-gray-300 px-4 py-1.5 hover:bg-blue-200 cursor-pointer">
                % Registered FPS
              </th>
            </tr>
          </thead>
          <tbody className='text-center font-semibold text-gray-600'>
            {districtData.slice(0,districtData.length-1).map((item, index)=>(<tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {index+1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Phase 1
              </td>
              <td className="border border-gray-300 px-4 py-2 underline cursor-pointer"
                  onClick={()=>{navigate(`/POSregistered/${item.District}`);
                  //  localStorage.setItem('district', item.District)
                   }}>
                {item.District}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.Total_FPS}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.Registered}
              </td>
              <td className="border border-gray-300 px-4 py-2">
              {Math.floor((item.Registered*100/item.Total_FPS)*100)/100}%
              </td>
            </tr>))}
          </tbody>
          <tfoot>
            { districtData.slice(-1).map((item, index)=>(<tr key={index} className='bg-[#2191c0] text-white text-sm text-center font-semibold'>
              <td className=" px-4 py-2">
                
              </td>
              <td className=" px-4 py-2">
                Totals
              </td>
              <td className=" px-4 py-2">
                
              </td>
              <td className="border border-gray-300 px-4 py-2">
              {item.Total_FPS}
              </td>
              <td className="border border-gray-300 px-4 py-2">
              {item.Registered}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                
              </td>
            </tr> )) }

          </tfoot>
        </table>
      </div>


    {/**------------------DOWNLOAD BUTTONS---------------------------------------- */}
      <div className='flex gap-2 text-white font-semibold mt-2'>
      <DownloadTableExcel
                    filename="Registered POS"
                    sheet="POS Report"
                    currentTableRef={tableRef.current}
                >

                   <button className='px-2 py-1 bg-[#2191c0] rounded cursor-pointer'> Excel </button>

      </DownloadTableExcel>

      
     {/**instead of PDFLinkDownloader, function is used so that pdf is not generated along with page loading
      * but only when function is called on BUTTON CLICK
      */}
     <button onClick={()=>generateAllDistrictsPDF(districtData, currentTime)}
       className='bg-[#2191c0] px-2 py-1 rounded cursor-pointer'>
      PDF
      </button>
     

          
      </div>
      </div>
    </div>



  )
}

export default Posregistered
