import React from 'react'
import { useState } from 'react'
import Fpsmonthmodal from './Fpsmonthmodal'
import ByPassmodal from './ByPassmodal'

const Fpssearch = ({fpsInfo, byPassInfo, TransactionInfo, RationInfo }) => {

    const [openFps, setOpenFps] = useState(true)
    const [openBypass, setOpenbypass] = useState(false)
    const[openTransHis, setOpenTransHis] = useState(false)
    const[openStock, setOpenStock] = useState(false)


    //states for opening modals
    const [openFPSmonthlymodal, setOpenFPSmonthlymodal] = useState(false)
    const[ openbyPassmodal, setOpenbypassModal] = useState(false)

    
   //functions for closing modals
    const handleClose=()=>{setOpenFPSmonthlymodal(false)}
    const closeByPassModal=()=>{setOpenbypassModal(false)}


  //states sent to modals via props for their API parameters
    const[monthID, setMonthID] = useState('')
    const [fpsCode, setFpscode] = useState('')
    const [rationNo, setRationNo] = useState('')
    console.log(fpsCode, rationNo, monthID)

    



  return (
    <div className='w-full overflow-x-auto m-0.5'>
      <div className='flex flex-col mt-3 border-[1.5px] border-gray-300 p-1 text-sm rounded'>
        
      <button onClick={()=>setOpenFps(!openFps)} 
            className={`${openFps ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-36`}>
                 {openFps ? "-":"+"} Show FPS Details 
     </button>

     {openFps &&
        <div className='w-full overflow-x-auto m-0.5 p-0.5'>
           <div className='flex flex-col md:flex-row items-center gap-5 mt-3 border-[1.5px] border-gray-300 p-4 text-sm rounded'>
            <div className='flex flex-col gap-2 border-[1.5px] border-gray-300 p-1 w-[310px] sm:w-[350px] rounded'>

                <div className='px-0.5'>
                <button className='text-white font-semibold bg-[#2191c0] px-2 py-1 rounded w-full' disabled>FPS Details</button>
                </div>

                <table className="table-fixed border-collapse text-xs sm:text-sm  ">
                 {fpsInfo.map((item, index)=>(<tbody key={item.FPSCode}>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>FPS Code</th>
                    <td className='py-1.5'>{item.FPSCode}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Owner Name</th>
                    <td className='py-1.5'>{item.Owner_Name}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Owner Contact</th>
                    <td className='py-1.5'>{item.Owner_Contact}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Status</th>
                    <td className='py-1.5'>{item.Status}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Device Code</th>
                    <td className='py-1.5'>{item.DEVICE_CODE}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Address</th>
                    <td className='py-1.5'>{item.Address}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>Block</th>
                    <td className='py-1.5'>{item.Block}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>District</th>
                    <td className='py-1.5'>{item.District}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>ByPassRationCardCount</th>
                    <td className='py-1.5'>4</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-5'>AbeyanceRationCount</th>
                    <td className='py-1.5'>28</td>
                 </tr>
                 </tbody>))}
                  
                    
            </table>
        </div>





      


         {/**----------------------------Stock status------------------------------------------------ */}
            <div className=' border-[1.5px] border-gray-300 p-1 w-[300px] rounded'>
                 <button onClick={()=>setOpenStock(!openStock)} 
                       className={`${openStock ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-36`}>
                 {openStock ? "-":"+"} Stock Status 
                </button>

                {openStock &&
                  <div className="overflow-x-auto mt-3 ">
                  <table className="table-fixed border-collapse text-sm border border-gray-300 ">
                  <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                    <tr className="bg-[#2191c0] text-white">
                      <th className="px-2 py-2 ">Commodity</th>
                      <th className="px-4 py-2 ">Quantity</th>
                    </tr>
              
                  </thead>
                  <tbody>
                    
                    <tr 
                     className=' border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Wheat/BPL/SB/AAY</td>
                      <td className="px-3 py-1 font-semibold ">842 Kg</td>
                    </tr>
                    <tr 
                     className='border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Wheat,APL</td>
                      <td className="px-3 py-1 font-semibold ">1149 Kg</td>
                    </tr>
                    <tr 
                     className='border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Wheat-Addl-NFSA,BPL/SB/AAY</td>
                      <td className="px-3 py-1 font-semibold ">0 Kg</td>
                    </tr>
                    <tr 
                     className=' border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Wheat-Addl-NFSA,APL</td>
                      <td className="px-3 py-1 font-semibold">0 Kg</td>
                    </tr>
                    <tr 
                     className='border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Food Packet</td>
                      <td className="px-3 py-1 font-semibold ">0</td>
                    </tr>
                    <tr 
                     className='border-b-2 border-gray-300  text-gray-900 text-center'>
                      <td className="px-3 py-1">Oil Packet</td>
                      <td className="px-3 py-1 font-semibold">0 </td>
                    </tr>
                    
                  </tbody>
                </table>
                </div>
                }
            </div>

           </div>












         {/**------------------------------------Bypass Ration Detail---------------------------------------- */}
           <div className='flex flex-col mt-3 border-[1.5px] border-gray-300 p-1 text-sm rounded'>

             <button onClick={()=>setOpenbypass(!openBypass)} 
                 className={`${openBypass ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-40`}>
                 {openBypass ? "-":"+"} BypassRationDetail 
              </button>

              {openBypass&&
              <div className="w-full overflow-x-auto mt-3">
              <table className="min-w-full table-fixed border-collapse text-sm border border-gray-300">
                <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                  <tr className="bg-[#2191c0] text-white">
                    <th className="px-2 py-2 ">Sr.No</th>
                    <th className="px-4 py-2 ">Ration Card</th>
                    <th className="px-4 py-2 ">Family Head</th>
                    <th className="px-4 py-2 ">Present Address</th>
                    
                </tr>
            
                </thead>
                <tbody>
                 
                  {byPassInfo.map((item, index)=>(<tr key={item.Ration_No}  
                   className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                    <td className="px-3 py-2">{index+1}</td>
                    <td className="px-3 py-2 ">
                       <span className='underline cursor-pointer'
                             onClick={()=>{setOpenbypassModal(true);
                            setFpscode(fpsInfo[0].FPSCode); setRationNo(item.Ration_No)
                         }}>

                        {item.Ration_No}
                      </span>
                    </td>
                    <td className="px-3 py-2"> {item.Head_Of_Family}</td>
                    <td className="px-3 py-2 ">{item.Present_Address} </td>
                    
                   
                  </tr>))}
                  
                  
                  
                </tbody>
              </table>
            </div>}

           </div>









           {/**----------------------------Transaction History------------------------------------------ */}
           <div className='flex flex-col mt-3 border-[1.5px] border-gray-300 p-1 text-sm rounded'>

               <button onClick={()=>setOpenTransHis(!openTransHis)} 
                 className={`${openTransHis ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-40`}>
                 {openTransHis ? "-":"+"} Transaction History 
              </button>

              {openTransHis&&
             <div className='w-full overflow-x-auto mt-3 border-[1.5px] p-1 border-gray-300 rounded'>
             <table className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                 <thead className=''>
                     <tr className='bg-[#2191c0] text-white'>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Sr.No</th>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Month</th>
                         <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Total Ration</th>
                         <th rowSpan="2" className="px-4 py-1 border border-gray-300 ">Total Trans</th>
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
                     {TransactionInfo.slice(0, TransactionInfo.length-1).map((item, index)=>(<tr key={item.Month} className='border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                         <td className=" px-4 py-2"> {index+1}</td>
                         <td className=" px-4 py-2">{item.Month}</td>
                         <td className=" px-4 py-2">{item.TotalRation}</td>
                         <td className=" px-4 py-2 underline cursor-pointer"
                            onClick={()=>{setOpenFPSmonthlymodal(true); 
                              setMonthID((item.Month).split(" ").join(""))
                              setFpscode(fpsInfo[0].FPSCode)
                              

                            }}>
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
                 <tfoot>
                      {TransactionInfo.slice(-1).map((item, index)=>(<tr  key={item.Month} className='border-b-2 border-gray-300 font-bold text-white bg-[#2191c0] text-center'>
                        <td className=" px-4 py-2"></td>
                         <td className=" px-4 py-2">{item.Month}</td>
                         <td className=" px-4 py-2">{item.TotalRation}</td>
                         <td className=" px-4 py-2">{item.TotalTrx}</td>
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
                 </tfoot>
             </table>

         </div>}

        </div>

      </div>
     }
      {/**----------------------------Completion of FPS details------------------------------------------------ */}










       {/**------------------------------------RATION CARDS------------------------------------------------ */}

       {<div className='w-full mt-3 border-[1.5px] p-1 border-gray-300 rounded'>
        <div>
          <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>RATION CARDS : {RationInfo.length}</button>
        </div>

          <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm'>
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
             <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">Ration Card</th>
                <th className="px-4 py-2 ">Ration Card Owner</th>
                <th className="px-4 py-2 ">Card Type</th>
                <th className="px-4 py-2 ">NFSA</th>
                <th className="px-4 py-2 ">Aadhar</th>
                
              </tr>
            </thead>

            <tbody>
             {RationInfo.map((item, index)=>(<tr key={item.Aadhar} 
                     className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                        <td className="px-3 py-2">{index+1}</td>
                        <td className="px-3 py-2 ">{item.Ration_No}</td>
                        <td className="px-3 py-2 ">{item.Ration_CardOwner}</td>
                        <td className="px-3 py-2"> {item.CARD_TYPE}</td>
                        <td className="px-3 py-2 "> {item.NFSA_Status}</td>
                        <td className="px-3 py-2">  {item.Aadhar}</td>
                        {/**<td>
                         * <span onClick={fetchRationInfo}>{item.Ration}<span>
                         * </td> */}
                        
                        
       
                  </tr>))}
             </tbody>

          </table>
          </div>
        </div>}

        {openFPSmonthlymodal && <Fpsmonthmodal onClose={handleClose} monthID={monthID} fpsCode={fpsCode}/>}
        {openbyPassmodal && <ByPassmodal onClose={closeByPassModal} fpsCode={fpsCode} ration={rationNo}/>}
      </div>
    </div>
  )
}

export default Fpssearch
