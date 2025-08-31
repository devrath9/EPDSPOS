import React from 'react'
import Fpssearch from './Fpssearch'
import { useState } from 'react';
import {toast} from 'react-toastify'
import Loader from './Loader';
import { useContext } from 'react'
import axios from 'axios'
import { Admincontext } from '../../context/Admincontext'
import Rationsearch from './Rationsearch';

const Searchdetails = () => {

  const [selectedOption, setSelectedOption] = useState("");
  const[inputval, setInputval] = useState("")
   const[showFPS, setShowFps] = useState(false)
   const [showRation, setShowRation] = useState(false)
  const [loading, setLoading] = useState(false)

//states for storing fps/device code search response
  const [fpsDetails, setFpsDetails] = useState([])
  const [transactions, setTransactions] = useState([])
  const [rationData, setRationData] = useState([])
  const [byPassdetails, setByPassDetails] = useState([])
 
//state for storing ration/aadhar search response
  const[rationsearchResult, setRationsearchResult] = useState([])


  const { backendUrl } = useContext(Admincontext)

  

  const handlesubmit = async(e)=>{
      e.preventDefault()
      setLoading(true)

      try{
        
        const {data} = await axios.get(backendUrl + `/api/admin/multisearch/${selectedOption}/${inputval}`)
        if(data.success){

           if(selectedOption==='FPS' ||selectedOption==='DeviceCode'){
             setFpsDetails(data.SearchResult[0].res)
             setByPassDetails(data.SearchResult[1].res)
             setTransactions(data.SearchResult[2].res)
             setRationData(data.SearchResult[3].res)
             setShowFps(true)
             setShowRation(false)
           }
             
            
             else if(selectedOption ==='Ration' ||selectedOption==='Aadhaar') {

              setRationsearchResult(data.SearchResult)
              setShowRation(true)
              setShowFps(false)
             
             }
             
             
         }
         else {
          console.log(data.message)
          toast.error(data.message)
          setShowRation(false)
          setShowFps(false)

          
        }
        
      }catch(error){
        console.log(error)
      } finally {
        setLoading(false); // Set loading to false after fetching
      }

  }

  
  
  return (
    
    <div className='w-full p-1 m-1' >
    <div className=''>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>

        <div className=''>
          <button className='bg-[#2191c0] text-white font-semibold w-full mt-0.5 py-2 px-2 rounded' disabled>Search Details</button>
        </div>

        <form onSubmit={handlesubmit}  className="flex flex-col md:flex-row gap-2 mt-3 ml-2 md:ml-5 ">
          <div className='flex flex-col md:flex-row gap-2  '>
            
             <p className='flex items-center font-semibold'>Criteria: </p>

             <select onChange={(e)=>{setSelectedOption(e.target.value)}} value={selectedOption} required
                className=" px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2">
               <option value="" >SELECT </option>
               <option value="FPS" className="hover:bg-indigo-100">FPS</option>
               <option value="Ration" className="hover:bg-indigo-100">Ration</option>
               <option value="Aadhaar" className="hover:bg-indigo-100">Aadhaar</option>
               <option value="JanAadhar" className="hover:bg-indigo-100">Jan Aadhar</option>
               <option value="DeviceCode" className="hover:bg-indigo-100">Device Code</option>
            
            </select>

             <input type='text' onChange={(e)=>setInputval(e.target.value)} value={inputval} required
               className='px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2'/>
          
          </div>
          
          <div className='flex gap-2 text-sm items-center'>
            <button type='submit' className='px-3 h-6 rounded text-white bg-[#2191c0] w-24 '>Get Details</button>
            <button onClick={()=>{setShowFps(false);setShowRation(false);setInputval("");setSelectedOption("")}}
            type='button'className='px-3 h-6 rounded text-white bg-[#2191c0]'>RESET</button>
          </div>
        </form>

       
         { showFPS  && <Fpssearch fpsInfo={fpsDetails}  byPassInfo = {byPassdetails}   TransactionInfo = {transactions} 
                                  RationInfo={rationData}/>}

         {showRation && <Rationsearch  rationResult = {rationsearchResult}/>}

         {loading && <Loader/>}


      </div>

    </div>
    </div>
  )
}

export default Searchdetails
