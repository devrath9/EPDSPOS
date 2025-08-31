import React,{useState, useEffect} from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import Reportsummary from './Report/Reportsummary'
import Reportaadhar from './Reportaadhar'
import Reportration from './Reportration'


const Trsummary = () => {

  const [activeTab, setActiveTab] = useState('report');
  const location = useLocation();

  // Update active tab based on hash or query parameter in the URL
  useEffect(() => {
    const currentTab = location.hash.replace('#', '') || new URLSearchParams(location.search).get('tab') || 'report';
    setActiveTab(currentTab);
  }, [location]);

  const handleTabClick = (tab) => {
    // Update the URL hash or query parameter without reloading the page
    window.location.hash = tab;  // Or use this if you prefer query parameters: history.push(`?tab=${tab}`);
  };
  return (
    <div className='w-full m-1 p-1'>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>
      <div className="tabs">
        <ul className='w-full flex flex-wrap gap-1.5 border-[1.5px] border-gray-300 bg-[#2191c0] pt-1 px-2'>
          <li onClick={() => handleTabClick('report')} className={`border-1 py-2 px-3 lg:px-2 text-sm cursor-pointer rounded-t  ${activeTab === 'report' ? 'bg-green-300  font-semibold' : 'bg-blue-400 '}`}>Transaction Summary Report</li>
          <li onClick={() => handleTabClick('adhar')} className={`border-1 py-2 px-3 lg:px-2 text-sm cursor-pointer rounded-t  ${activeTab === 'adhar' ? 'bg-green-300 font-semibold' : 'bg-blue-400 '}`}>Transaction Summary By Aadhar</li>
          <li onClick={() => handleTabClick('ration')} className={`border-1 py-2 px-3 lg:px-2 text-sm cursor-pointer rounded-t ${activeTab === 'ration' ? 'bg-green-300 font-semibold' : 'bg-blue-400 '}`}>Transaction Summary By Ration</li>
          
        </ul>
      </div>

      <div className="tab-content">
        {activeTab === 'report' && <Reportsummary/>}
        {activeTab === 'adhar' && <Reportaadhar/>}
        {activeTab === 'ration' && <Reportration/>}
      </div>
     </div>
    </div>
  )
}

export default Trsummary
