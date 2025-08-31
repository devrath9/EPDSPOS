import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { Admincontext } from '../../context/Admincontext'
import Loader from '../Searchdetails/Loader'
import NotFound from '../NotFound'


const DistrictFPS = () => {

    const {version, district} = useParams()
    const { backendUrl } = useContext(Admincontext)
    const navigate = useNavigate()

    const [fpsData, setFpsData] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetchFPSdata()
    },[version, district])

    const fetchFPSdata = async()=>{

        try{
            const {data} = await axios.get(backendUrl + `/api/admin/allVersions/${version}/${district}`)
            if(data.success){
                setFpsData(data.districtFPS)
                // console.log(data.districtFPS)
            }
            else{

              if(data.errorCode==='NOT_FOUND'){
                setNotFound(true)
              }
              else{
                console.log(data.message)
              }
            }

        }
        catch(error){
            console.log(error.message)
        }finally{
          setLoading(false)
        }
    }



    if(loading) return <Loader/>

    if(notFound) return <NotFound/>  
    


  return (
    <div className='w-full m-1 p-1'>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>

        <div>
          <button className='text-white font-bold bg-[#2191c0] rounded py-1.5 w-full '>FPS Version Detail - {version} - {district}</button>
        </div>

        <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-[15px]'>
            <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
             <p onClick={()=>navigate('/versionDetails')} 
             className='font-semibold underline cursor-pointer'>All Versions</p>
        
             <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
             <p onClick={()=>{navigate(`/versionDetails/${version}`)}}
             className='font-semibold underline cursor-pointer'>{version}</p>

             <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
             <p className='font-semibold'>{district}</p>
             
        </div>



        <div className="overflow-x-auto mx-1 mt-3 border-[1.5px] p-1 border-gray-300 rounded">

           <table className="min-w-full table-fixed border-collapse text-sm">
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
              <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">FPS Code</th>
                <th className="px-4 py-2 ">FPS Owner</th>
                <th className="px-4 py-2 ">Device Code</th>
                <th className="px-4 py-2 ">Device Last Updated on {version}</th>
              </tr>
            </thead>

            <tbody>

              {fpsData.map((item, index)=>(<tr key={item.FPSCode}
                className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                <td className="px-3 py-2">{index+1}</td>
                <td className="px-3 py-2">{item.FPSCode}</td>
                <td className="px-3 py-2">{item.FPS_Owner}</td>
                <td className="px-3 py-2">{item.DEVICE_CODE}</td>
                <td className="px-3 py-2">{item.Device_Last_Updated_On}</td>
                
              </tr>))}
            </tbody>

        </table>
        </div>

     </div>
    </div>
  )
}

export default DistrictFPS
