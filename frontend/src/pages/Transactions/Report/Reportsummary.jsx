import React from 'react'
import { useState,useEffect, useCallback,useRef } from 'react'
import { Admincontext } from '../../../context/Admincontext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Transcontext } from '../../../context/Transcontext'
import Piegraph1 from '../../../components/Piegraph1'
import Piegraph2 from '../../../components/Piegraph2'
import {assets} from '../../../assets/assets'



const Reportsummary = () => {

  const navigate = useNavigate()
  const{cardOptions, fetchCardTypes, TransOptions, fetchTransTypes, backendUrl} = useContext(Admincontext)
  const {selectedcardTypes, handlecardTypechange,selectedTransTypes, handletransTypechange} = useContext(Transcontext)


  
  const [openfilter, setOpenFilter] = useState(false)
  const [openGraph, setOpenGraph] = useState(false)
  const [disTransactions, setDisTransactions] = useState([])


  //variables for pie graphs
   const[PieTrxNumber, setPieTrxNumber] = useState([])
   const[PieQtyData, setPieQtyData] = useState([])


  //tableref for excel generation
   const tableRef = useRef(null) 
   

   //graph function to show graph and set graph data from api response
   const handleGraph=()=>{
    const totalObject = disTransactions.find(item => item.District === 'ZZ.Total');

    // Extract the transaction values
    const trxData = [
      totalObject.Wheat_TRX,
      totalObject.Sugar_TRX,
      totalObject.Daal_TRX,
      totalObject.Ghee_TRX,
      totalObject.Oil_TRX
    ];

    const quantityData = [
      totalObject.Wheat_Quantity,
      totalObject.Sugar_Quantity,
      totalObject.Daal_Quantity,
      totalObject.Ghee_Quantity,
      totalObject.Oil_Quantity
    ]

    // Set the pieData and show the graph
    setPieTrxNumber(trxData); setPieQtyData(quantityData)
    setOpenGraph(!openGraph)
   }


   //on button click, api will run on changed cardtypes and trans types

   const handleFilterClick=()=>{
         fetchTransDis(selectedcardTypes, selectedTransTypes)
  
   }
  




//api call to fetch all distirct data along with filtering option
   const fetchTransDis =  async(cardTypes,TransTypes)=>{
     try{
         const {data} = await axios.post(backendUrl +'/api/admin/transactions/allDistricts', 
                                                      {cardType : cardTypes.join(','), 
                                                        TrxType: TransTypes.join(',')})
         if(data.success){
              setDisTransactions(data.disTransactions)
              console.log(data.disTransactions)
         }
         else {
             console.log(data.message)
         }
    }
     catch(error){
         console.log(error.message)
     }
 }  

 



   //ONLOAD FUNCTIONS

   useEffect(()=>{
    // fetchTransDistricts()
     fetchTransDis(selectedcardTypes,selectedTransTypes)
     setOpenGraph(false)
  },[])    //it will run only once depending on what value is in cardtypes and transtypes at the moment
                       
  useEffect(()=>{
    fetchCardTypes()
   
  },[])

  useEffect(()=>{
    fetchTransTypes()
  },[])


  

  return (
    <div className='w-full overflow-x-auto m-1'>
            

            <div className='flex flex-col mt-3 m-1.5 border-[1.5px] border-gray-300 p-1'>
                
                <div className='flex gap-2 max-sm:text-xs text-sm'>
                  <button onClick={()=>setOpenFilter(!openfilter)} 
                     className={`${openfilter ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-4 py-1 rounded w-24`}>
                     Filters {openfilter ? "-":"+"} 
                  </button>

                  <button onClick={handleGraph}
                    className={`${openGraph ? 'bg-green-500' :'bg-[#2191c0]'} text-white font-semibold px-4 py-1 rounded w-64`}>
                    Transaction Summary Pie Graph {openGraph ? "-" :"+"} 
                  </button>

                 
                </div>

                  
                {openfilter && <div className='flex flex-col mt-5 px-4  border-[1.5px] border-gray-400 py-3 rounded text-sm '>
                    <div className='font-semibold'>Transaction Type</div>
                     <div className='flex flex-wrap gap-x-4 gap-y-2 mt-2 ' >
                     {TransOptions.map((item) => (
                        <div key={item.TRX_TYPE} >
                             <label>
                                <input className='mr-1'
                                  type="checkbox"
                                  value={item.TRX_TYPE}
                                  onChange={()=>handletransTypechange(item.TRX_TYPE)}
                                  checked={selectedTransTypes.includes(item.TRX_TYPE)}
                                  />
                                  {item.TRX_TYPE}
                              </label>
                          </div>
                      ))}
                
                     </div>

                     <div className='font-semibold mt-3'>Card Type </div>
                     <div className='flex flex-wrap gap-x-4 gap-y-2 mt-1 ' >
                     {cardOptions.map((item) => (
                        <div key={item.CARD_TYPE} >
                             <label>
                                <input className='mr-1'
                                  type="checkbox"
                                  value={item.CARD_TYPE}
                                  onChange={()=>handlecardTypechange(item.CARD_TYPE)}
                                  checked={selectedcardTypes.includes(item.CARD_TYPE)}
                                  />
                                  {item.CARD_TYPE}
                              </label>
                          </div>
                      ))}
                      </div>

                      <button onClick={handleFilterClick}
                      className='mt-4 w-32 bg-[#2191c0] text-white px-2 py-1 rounded text-sm font-semibold'>
                        Filter</button>




                </div>}

               {openGraph&&
                <div className='border-1 border-gray-400 p-2 mt-5 rounded flex flex-wrap justify-center lg:justify-around '>
                <div>
                <p className='mb-5 text-center'>Transaction Number Graph</p>
                <Piegraph1 graphdata={PieTrxNumber}/>
                </div>
      
                <div>
                <p className='mb-5 text-center'>Quantity Disbursed Graph</p>
                <Piegraph2 graphdata={PieQtyData}/>
                </div>
                
           </div>
               }
            </div>
            <div className=' overflow-x-auto mt-5 mx-1 border-[1.5px] p-1 border-gray-300 rounded'>
                <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                    <thead className='border-b-2 border-gray-200'>
                        <tr className='bg-[#2191c0] text-white'>
                            <th rowSpan="2" className="px-4 py-1 border-b  border-gray-300">Sr.No</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">District</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300">No. of Transaction</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300  ">WHEAT</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300  ">SUGAR</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300  ">DAAL</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300  ">GHEE</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300  ">OIL</th>


                        </tr>
                        <tr className='bg-[#2191c0] text-white'>
                            <th className="px-4 py-1 border border-gray-300">TX</th>
                            <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300">TX</th>
                            <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300">TX</th>
                            <th className="px-4 py-1 border border-gray-300">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300">TX</th>
                            <th className="px-4 py-1 border border-gray-300">Qty (KL)</th>
                            <th className="px-4 py-1 border border-gray-300">TX</th>
                            <th className="px-4 py-1 border border-gray-300">Qty (KL)</th>

                        </tr>


                    </thead>
                    <tbody>
                        {disTransactions.slice(0,disTransactions.length-1).map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                            <td className="text-center px-4 py-2"> {index+1}</td>
                            <td className="text-center px-4 py-2 underline cursor-pointer font-semibold"
                                 onClick={()=>{navigate('/transactionSummary/blockReport', 
                                              {state:{Tdistrict:item.District}})}}>
                                {item.District} 
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
                         {disTransactions.length!==1 ? disTransactions.slice(-1).map((item, index)=>(<tr key={index} className='border-b-2 border-gray-300 font-bold text-white bg-[#2191c0]'>
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
                            

                        </tr>))
                        :<tr className=''>No records found</tr>}
                    </tfoot>
                </table>

            </div>

             <div className='ml-2 mt-1 text-sm font-semibold text-white'>
              
               <DownloadTableExcel
                    filename="Transaction Summary Report"
                    sheet="Transaction Report"
                    currentTableRef={tableRef.current}>
                  
                  <button className='px-2 py-1 bg-[#2191c0] rounded'>
                    Excel
                  </button>
                  
               </DownloadTableExcel>
             </div>
        </div>
  )
}

export default Reportsummary
