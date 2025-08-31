import React from 'react'
import { useState } from 'react'

const Rationsearch = ({rationcard, fpsInfo, ByPassHistory, RationFamily, EntitlementDetail, TransSummary, IMPDS,
                        rationResult}) => {

   const[openStock, setOpenStock] = useState(false)
   const [openBypass, setOpenbypass] = useState(false)
   const [openNFSA, setOpenNFSA] = useState(false)
   const [openSummary, setOpenSummary] = useState(false)
   const [openImpds, setOpenImpds] = useState(false)


  return (
    <div className='w-full p-1 overflow-x-auto m-0.5'>
      <div className='flex flex-col mt-3 border-[1.5px] border-gray-300 p-1 text-sm rounded'>
        
        <div className='w-full overflow-x-auto m-0.5'>
 
         <div className='flex flex-wrap gap-8 mt-3 p-1 md:p-4 text-sm '>

            {/**---------------------------------RATION CARD DETAILS------------------------------ */}
            <div className='flex flex-col gap-2 border-[1.5px] border-gray-300 p-1 w-[300px] rounded'>

               
                <button className='text-white font-semibold bg-[#2191c0] px-3 py-1 rounded' disabled>
                  Ration Card Details
                </button>
                

                <table className="table-fixed border-collapse text-sm  ">
                 {rationResult[0].res.map((item, index)=>(<tbody key={item.Ration_No}>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Ration Card No</th>
                    <td className='py-1.5'>{item.Ration_No}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Card Type</th>
                    <td className='py-1.5'>{item.CARD_TYPE}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>NFSA Status</th>
                    <td className='py-1.5'>{item.NFSA_Status}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Gas Connection</th>
                    <td className='py-1.5'>{item.Gas_Connection}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Bypass Status</th>
                    <td className='py-1.5'>{item.Bypass_Status}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Bypass By</th>
                    <td className='py-1.5'>{item.Bypass_By}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Bypass Date</th>
                    <td className='py-1.5'>{item.ByPassDate}</td>
                 </tr>
                 
                 </tbody>))}
                  
                    
            </table>
        </div>



       {/**------------------------------FPS DETAILS--------------------------------------------------- */}
        <div className='flex flex-col md:flex-row items-center gap-5 mt-3 border-[1.5px] border-gray-300 p-1.5 md:p-4 text-sm rounded'>
        
          <div className='flex flex-col gap-2 border-[1.5px] border-gray-300 p-1 w-[310px] sm:w-[330px] rounded'>

                <div className='px-0.5 sm:px-0'>
                <button className='text-white font-semibold bg-[#2191c0] px-3 py-1 rounded w-full' disabled>
                  FPS Details
                </button>
                </div>
                

                <table className="table-fixed border-collapse text-xs sm:text-sm  ">
                 {rationResult[1].res.map((item, index)=>(<tbody key={item.FPSCode}>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>FPS Code</th>
                    <td className='py-1.5'>{item.FPSCode}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Owner Name</th>
                    <td className='py-1.5'>{item.Owner_Name}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Owner Contact</th>
                    <td className='py-1.5'>{item.Owner_Contact}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Status</th>
                    <td className='py-1.5'>{item.Status}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Device Code</th>
                    <td className='py-1.5'>{item.DEVICE_CODE}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Address</th>
                    <td className='py-1.5'>{item.Address}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>Block</th>
                    <td className='py-1.5'>{item.Block}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>District</th>
                    <td className='py-1.5'>{item.District}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>ByPassRationCardCount</th>
                    <td className='py-1.5'>{item.ByPassRationCardCount}</td>
                 </tr>
                 <tr>
                    <th className='py-1.5 flex flex-start px-3'>AbeyanceRationCount</th>
                    <td className='py-1.5'></td>
                 </tr>
                 </tbody>))}
                  
                    
            </table>
        </div>









       {/**--------------------------STOCK STATUS------------------------------------------------- */}

        <div className=' border-[1.5px] border-gray-300 p-1 w-[300px] rounded'>
                 <button onClick={()=>setOpenStock(!openStock)} 
                       className={`${openStock ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-3 py-1 rounded w-36`}>
                 {openStock ? "-":"+"} Stock Status 
                </button>

                {openStock &&
                  <div className="overflow-x-auto mt-3">
                  <table className="table-fixed border-collapse text-sm border border-gray-300 ">
                  <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                    <tr className="bg-[#2191c0] text-white">
                      <th className="px-3 py-2 ">Commodity</th>
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
       </div>
     </div>









     {/** ----------------------BYPASS RATION HISTORY------------------------------------------------ */}
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
                <th className="px-4 py-2 ">ByPassDoneBy</th>
                <th className="px-4 py-2 ">Office Name</th>
                <th className="px-4 py-2 ">Date History</th>
                <th className="px-4 py-2 ">Reason</th>
                <th className="px-4 py-2 ">ByPassStatus</th>
       
              </tr>

           </thead>
           <tbody>
    
             {rationResult[2].res.map((item, index)=>(<tr  key={item.Ration_No}
             className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
              <td className="px-3 py-2">{index+1}</td>
              <td className="px-3 py-2 ">{item.Ration_No}</td>
              <td className="px-3 py-2"> {item.Bypass_By}</td>
              <td className="px-3 py-2 ">{item.OfficeName}</td>
              <td className="px-3 py-2 ">{(item.DateHistory).slice(0,10)}</td>
              <td className='px-3 py-2 w-64'>{item.Reason}</td>
              <td className="px-3 py-2 ">{item.Bypass_Status} </td>

            </tr>))}
     
     
     
           </tbody>
        </table>
        </div>}

      </div>





     {/**----------------------RATION CARD FAMILY DETAILS TABLE-------------------------------------------- */}
     {<div className='w-full mt-3 border-[1.5px] p-1 border-gray-300 rounded'>
        <div>
          <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>Ration Card Details</button>
        </div>

          <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm'>
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
             <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">Family Member</th>
                <th className="px-4 py-2 ">Relation</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-4 py-2 ">NFSA Status</th>
                <th className="px-4 py-2 min-w-36 ">Aadhar</th>
                
              </tr>
            </thead>

            <tbody>
             {rationResult[3].res.map((item, index)=>(<tr key={item.Aadhar}
                     className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                        <td className="px-3 py-2">{index+1}</td>
                        <td className="px-3 py-2 ">{item.Family_Member}</td>
                        <td className="px-3 py-2 ">{item.Relation}</td>
                        <td className="px-3 py-2"> {item.Status}</td>
                        <td className="px-3 py-2 ">{item.NFSA_Status}</td>
                        <td className="px-3 py-2"> {item.Aadhar}</td>
                        
                        
       
                  </tr>))}
             </tbody>

          </table>
          </div>
        </div>}








        {/**----------------------ENTITLEMENT DETAILS TABLE-------------------------------------------- */}
     {<div className='w-full mt-6 border-[1.5px] p-1 border-gray-300 rounded'>
        <div>
          <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>Entitlement Detail of Family</button>
        </div>

          <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm'>
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
             <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">Commodity</th>
                <th className="px-4 py-2 ">Month</th>
                <th className="px-4 py-2 ">Quantity</th>
                <th className="px-4 py-2 ">Disbursed</th>
                <th className="px-4 py-2 min-w-36 ">Balance Entitlement</th>
                
              </tr>
            </thead>

            <tbody>
             {rationResult[5].res.map((item, index)=>(<tr 
                     className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                        <td className="px-3 py-2">{index+1}</td>
                        <td className="px-3 py-2 ">{item.Commodity}</td>
                        <td className="px-3 py-2 ">{item.Month}</td>
                        <td className="px-3 py-2">{item.Quantity_For_The_Month} </td>
                        <td className="px-3 py-2 ">{item.Disbursed_In_This_Month} </td>
                        <td className="px-3 py-2"> {item.Balance_Entitlement}</td> 
                      
                        
                         
              </tr>))}
                  
             </tbody>
          </table>
         
          </div>
        </div>}









     

       {/**-------------------------------NFSA Ration Report------------------------------------------- */}
        <div className='flex flex-col mt-5 border-[1.5px] border-gray-300 p-1 text-sm rounded'>

          <button onClick={()=>setOpenNFSA(!openNFSA)} 
               className={`${openNFSA ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-40`}>
                 {openNFSA ? "-":"+"} NFSA Ration Report
         </button>

          {openNFSA &&
            <div className="w-full mt-2">

            <div>
               <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>NFSA Change Detail</button>
            </div>

             <div className='overflow-x-auto'>
              <table className="min-w-full table-fixed border-collapse text-xs 2xl:text-sm border border-gray-300">
                <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                  <tr className="bg-[#2191c0] text-white">
                    <th className="px-2 py-1.5 border-[] border-gray-300 ">Sr.No</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Seeding Type</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Old Value</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">New Value</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Order No</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Officer Name</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">NFSA Scheme</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Updated On</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Action</th>
                 </tr>

                 </thead>
                 <tbody>

                   <tr  
                    className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300">1</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">Aadhaar Seeding </td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300"> 782847787297</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">840809282820</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 "></td>
                      <td className='px-3 py-2 border-[1.5px] border-gray-300 w-48'>ANIMESH SHARMA</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 "></td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">12/01/2024 15:51:46</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">
                        <button className='bg-green-500 text-white px-2 py-0.5 rounded'>Download</button>
                      </td>

                  </tr>


                 </tbody>
               </table>
               </div>

               </div>}
               
               </div>  











      {/**------------------------------Transaction Summary------------------------------------------------ */}
        <div className='flex flex-col mt-5 border-[1.5px] border-gray-300 p-1 text-sm rounded'>

          <button onClick={()=>setOpenSummary(!openSummary)} 
               className={`${openSummary ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-48`}>
                 {openSummary ? "-":"+"} Transaction Summary
         </button>

          {openSummary &&
            <div className="w-full mt-2">

            <div>
               <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>Transaction Detail of Family</button>
            </div>

             <div className='overflow-x-auto'>
              <table className="min-w-full table-fixed border-collapse text-xs 2xl:text-sm border border-gray-300">
                <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                  <tr className="bg-[#2191c0] text-white">
                    <th className="px-2 py-1.5 border-[] border-gray-300 ">Sr.No</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">FPS Code</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Receiver</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Aadhar</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">TransactionBY</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Commodity</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">QTY</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Issue Date</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Bill No</th>
                 </tr>

                 </thead>
                 <tbody>

                   {rationResult[4].res.map((item, index)=>(<tr key={item.Bill_No} 
                    className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300">{index+1}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.FPSCode}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300"> {item.Receiver}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Aadhar}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.TransactionBY}</td>
                      <td className='px-3 py-2 border-[1.5px] border-gray-300 w-48'>{item.CommodityItem}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Quantity}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Issue_Date}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Bill_No}</td>

                  </tr>))}


                 </tbody>
               </table>
               </div>

               </div>}
               
               </div>  









       {/**----------------------------IMPDS Transaction Summary Report------------------------------- */}  
       <div className='flex flex-col mt-5 border-[1.5px] border-gray-300 p-1 text-sm rounded'>

          <button onClick={()=>setOpenImpds(!openImpds)} 
               className={`${openImpds ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-2 py-1 rounded w-64`}>
                 {openImpds ? "-":"+"} IMPDS Transaction Summary Report
         </button>

          {openImpds &&
            <div className="w-full mt-2">

            <div>
               <button className='bg-[#2191c0] text-white font-bold w-full mt-0.5 py-1 rounded' disabled>Transaction Detail of Family</button>
            </div>

             <div className='overflow-x-auto'>
              <table className="min-w-full table-fixed border-collapse text-xs 2xl:text-sm border border-gray-300">
                <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
                  <tr className="bg-[#2191c0] text-white">
                    <th className="px-2 py-1.5 border-[] border-gray-300 ">Sr.No</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Sale State FPS </th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Sale State Name</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Receiver</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Aadhaar</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">TransactionBY</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Commodity</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Qty</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Issue Date</th>
                    <th className="px-4 py-1.5 border-[1.5px] border-gray-300 ">Bill Number</th>
                 </tr>

                 </thead>
                 <tbody>

                   {rationResult[6].res.map((item, index)=>(<tr key={item.Bill_No} 
                    className=' border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300">{index+1}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Sale_State_FPS_Code}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300"> {item.Sale_State_Name}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Receiver}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Aadhar}</td>
                      <td className='px-3 py-2 border-[1.5px] border-gray-300 w-48'>{item.TransactionBY}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Commodity}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Quantity}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{(item.Issue_Date).slice(0,10)}</td>
                      <td className="px-3 py-2 border-[1.5px] border-gray-300 ">{item.Bill_No}</td>


                  </tr>))}


                 </tbody>
               </table>
               </div>

               </div>}
               
               </div>      








               










     
      
   




   </div>
 </div>


  )
}

export default Rationsearch
