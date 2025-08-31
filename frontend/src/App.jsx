import React, { useContext, useEffect, useState } from 'react'
import { Buffer } from 'buffer';

// Make Buffer globally available in the browser
window.Buffer = Buffer;
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import DeviceEntry from './pages/DeviceEntry/DeviceEntry'
import Posregistered from './pages/RegisteredPOS/Posregistered'
import Repairstatus from './pages/Repairs/Repairstatus'
import StatusReport from './pages/RepairSummary/StatusReport'
import Trsummary from './pages/Transactions/Trsummary'
import Versiondetail from './pages/VersionDetails/Versiondetail'
import Searchdetails from './pages/Searchdetails/Searchdetails'
import Reportsummary from './pages/Transactions/Report/Reportsummary'
import Reportaadhar from './pages/Transactions/Reportaadhar'
import Reportration from './pages/Transactions/Reportration'
import Blockdata from './pages/RegisteredPOS/Blockdata'
import POSvendors from './pages/RegisteredPOS/POSvendors'

import Summaryblocks from './pages/Transactions/Report/Summaryblocks'
import SummaryFPS from './pages/Transactions/Report/SummaryFPS'
import Summaryration from './pages/Transactions/Report/Summaryration'
import SpecificVersion from './pages/VersionDetails/SpecificVersion'
import DistrictFPS from './pages/VersionDetails/DistrictFPS'
import Login from './pages/Login'
import { Admincontext } from './context/Admincontext'
import { useNavigate } from 'react-router-dom';
import AdhrState from './pages/Transactions/Aadhar/AdhrState';
import AdhrDistrict from './pages/Transactions/Aadhar/AdhrDistrict';
import AdhrBlock from './pages/Transactions/Aadhar/AdhrBlock';
import AdhrFpsTrans from './pages/Transactions/Aadhar/AdhrFpsTrans';
import ModalSidebar from './components/ModalSidebar';
import { useScrollLockSidebar } from './hooks/useScrollLockSidebar';
import NotFound from './pages/NotFound';





const App = () => {

  const {admintoken} = useContext(Admincontext)

 
  // useEffect(()=>{
  //   if(isTokenExpired(admintoken)){
  //      localStorage.removeItem('admintoken')
  //      }
  // },[admintoken, isTokenExpired])

  const[isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen)
      
  }

   //custom hook to scroll capability in small and large screen whenever modalsidebar opens or closes
    useScrollLockSidebar(isSidebarOpen)

  
  
    return admintoken ? (
    <div className='bg-[#F2F3FF] overflow-x-hidden'>
     <Navbar toggleSidebar={toggleSidebar}/>
    
    <div className=' flex items-start '>
      
        <Sidebar/>
         <ModalSidebar showMenu={isSidebarOpen} onClose={toggleSidebar} />
    
     
     <div className='w-full flex justify-center'>
     <Routes>

        {/**------ ROUTES----------- */}

        {<Route path='/' element={<StatusReport/>}/>}
        {<Route path='/repairStatus' element={<Repairstatus/>}/>}
       {<Route path='/deviceEntry' element={<DeviceEntry/>}/>}


        {/**POS REGISTERED PAGES */}
        {<Route path='/POSregistered' element={<Posregistered/>}/>}
        {<Route path='/POSregistered/:district' element={<Blockdata/>}/>}
        {<Route path='/POSregistered/:district/:blockId' element={<POSvendors/>}/>}


         {/**TRANSACTION SUMMARY PAGES */}
        {<Route path='/transactionSummary' element={<Trsummary/>}/> }
        
        {<Route path='/transactionSummary/blockReport' element={<Summaryblocks/>}/>}
        {<Route path='/transactionSummary/FPSReport' element={<SummaryFPS/>}/>}
        {<Route path='/transactionSummary/rationReport' element={<Summaryration/>}/>}

        {<Route path='/transactionSummary/ByAadhar/:year/:month' element={<AdhrState/>}/>}
        {<Route path='/transactionSummary/ByAadhar/:year/:month/:district' element={<AdhrDistrict/>}/>}
        {<Route path='/transactionSummary/ByAadhar/:year/:month/:district/:blockID' element={<AdhrBlock/>}/>}
        {<Route path='/transactionSummary/ByAadhar/:year/:month/:district/:blockID/:fpscode' element={<AdhrFpsTrans/>}/>}


        
         {/**VERSION DETAILS PAGES */}
        {<Route path='/versionDetails' element={<Versiondetail/>}/>}
        {<Route path='/versionDetails/:version' element={<SpecificVersion/>}/>}
        {<Route path='/versionDetails/:version/:district' element={<DistrictFPS/>}/>}



         {/**SEARCH DETAILS PAGE */}
        {<Route path='/searchDetails' element={<Searchdetails/>}/>}

       
        <Route path='/*' element={<NotFound/>}/>


     </Routes>
     </div>
     </div>
    </div>
  ):(
    <Login/>
  )
}

export default App

