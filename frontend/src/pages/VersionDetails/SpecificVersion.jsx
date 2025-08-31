import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Admincontext } from '../../context/Admincontext'
import { useContext } from 'react'
import Loader from '../Searchdetails/Loader'

const SpecificVersion = () => {

    const { version } = useParams()
    const { backendUrl } = useContext(Admincontext)
     const [disData, setDisData] = useState([])
     const [notFound, setNotFound] = useState(false)
     const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        // fetchDistrictData()
        fetchSpecificVersion()

       
    },[])

     const fetchSpecificVersion = async()=>{
          
      setLoading(true)
         try{
             const {data} = await axios.get(backendUrl +`/api/admin/allVersions/${version}`)
             if(data.success){
                setDisData(data.versionData)
             //    console.log(data.versionData)
             }
             else{
                 if(data.errorCode==='NOT_FOUND'){
                    setNotFound(true)
                 }else{
                 console.log(data.message)}
             }
         }
         catch(error){
             console.log(error.message)
         }finally{
          setLoading(false)
         }
     }

  if(loading) return <Loader/>

  if(notFound) return <><p>Not found</p></>   

    


  return (
    <div className='w-full m-1 p-1'>
      <div className='p-1 border-[1.5px] border-gray-300 rounded'>

        <div>
          <button className='text-white font-bold bg-[#2191c0] rounded py-1.5 w-full '>FPS Version Detail - {version}</button>
        </div>

        <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-[15px]'>
          <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
          <p onClick={()=>navigate('/versionDetails')} className='font-semibold underline cursor-pointer'>All Versions</p>

          <img className='w-2 h-2 mt-0.5'src={assets.arrow} alt=''/>
          <p className='font-semibold'>{version}</p>
        </div>



        <div className="overflow-x-auto mx-1 mt-3 border-[1.5px] p-1 border-gray-300 rounded">

           <table className="min-w-full table-fixed border-collapse text-sm">
            <thead className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-300'>
              <tr className="bg-[#2191c0] text-white">
                <th className="px-2 py-2 ">Sr.No</th>
                <th className="px-4 py-2 ">District</th>
                <th className="px-4 py-2 ">Total Devices on Version {version}</th>
              </tr>
            </thead>

            <tbody>

              {disData.map((item, index)=>(<tr key={item.District}
                className='bg-white border-b-2 border-gray-300 font-semibold text-gray-700 text-center'>
                <td className="px-3 py-2">{index+1}</td>
                <td className="px-3 py-2 underline cursor-pointer"
                     onClick={()=>{navigate(`/versionDetails/${version}/${item.District}`)}}>
                     {item.District}
                  </td>
                <td className="px-3 py-2">{item.Total_Devices}</td>
                
              </tr>))}
            </tbody>

        </table>
        </div>

     </div>
    </div>
  )
}

export default SpecificVersion
