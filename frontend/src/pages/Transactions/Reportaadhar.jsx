import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const Reportaadhar = () => {

  const navigate = useNavigate()

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() ; // will give currentMonth-1, bcoz monthindex starts from 0

  //states for selected year and month
  const[selectedYear, setSelectedYear] = useState('')
  const[selectedMonth, setSelectedMonth] = useState('')

  const YearRange=[]
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  for(let year=2020; year<=currentYear; year++){
   YearRange.push(year)
  }

  const availableMonths = selectedYear===currentYear
                         ? months.slice(0,currentMonth)
                         :months;
  
  
  const handleSearch=()=>{

    if(selectedMonth && selectedYear){
    
    navigate(`/transactionSummary/ByAadhar/${selectedYear}/${selectedMonth}`)}
    else{
      toast.warn('Please select month and year to proceed')
    }
  }                       
   
  return (

    <div className='w-full m-1 p-1'>
    <div className=''>
      
     <div  className='flex flex-wrap gap-3 md:ml-3 mt-1 items-center'>
      {/**-----------------year dropdown---------------- */}

      <p className='font-semibold'>Criteria:</p>

      <select onChange={(e)=>{setSelectedYear(Number(e.target.value))}} value={selectedYear} required
        className=" px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2">
        <option value=''>Select Year</option>
        { 
          YearRange.map((year)=>(
            <option key={year} value={year}>{year}</option>
          ))
        }
      </select>

      <select onChange={(e)=>setSelectedMonth(e.target.value)} value={selectedMonth} disabled={!selectedYear} required
        className=" px-2 py-1.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 hover:bg-indigo-50 border-b-2">
        <option value=''>MONTH</option>
        { selectedYear &&
          availableMonths.map((month)=>(
            <option key={month} value={month}>{month}</option>
          ))
        }
      </select>

      <button onClick={handleSearch} className='px-3 h-6 rounded text-white bg-[#2191c0] text-sm font-semibold'>
        Get Details</button>
      
      
      </div> 


      

    </div>
    </div>
  )
}

export default Reportaadhar
