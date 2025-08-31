import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";



export const Admincontext = createContext()

const AdmincontextProvider = (props) => {

     const [admintoken, setAdminToken] = useState(localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') : '')
     

    const[districtData, setDistrictData] = useState([])
    const [dTransactions, setDTransactions] = useState([])
    const [versions, setVersions] = useState([])
    const [versionData, setVersiondata] = useState([])
    const [FPSdateTrans, setFPSdateTrans] = useState([])
    const [byPassRationInfo, setByPassRationInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [cardOptions, setCardOptions] = useState([])
    const [TransOptions, setTransOptions] = useState([])
    const [repairData, setRepairData] = useState([])
     
   
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    //pos data of districts
    const fetchDistrictData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/districts')
            if (data.success) {
                setDistrictData(data.districtData)
                console.log(data.districtData)

            }
            else {
                console.log(data.message)
            }
        } catch (error) {

            console.log(error.message)
        }


    }




   //Transaction summary of all districts
    const fetchTransDistricts = async()=>{
        try{
            const {data} = await axios.get(backendUrl +'/api/admin/transactions/allDistricts')
            if(data.success){
                 setDTransactions(data.disTransactions)
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


    //fetch card types array from api
    const fetchCardTypes = async()=>{
        try{

            const {data}= await axios.get(backendUrl +'/api/admin/cardTypes' )
            if(data.success){
               setCardOptions(data.cardTypes)
            //    console.log(data.cardTypes)
            }
            else{
                console.log(data.message)
            }
        }catch(error){
            console.log(error.message)
        }
    }


    //fetch transaction types array from api
    const fetchTransTypes= async()=>{

        try{

            const {data}= await axios.get(backendUrl +'/api/admin/transTypes' )
            if(data.success){
               setTransOptions(data.TansTypes)
            //    console.log(data.TansTypes)
            }
            else{
                console.log(data.message)
            }
        }catch(error){
            console.log(error.message)
        }
    }





   //fetch data of both versions
    const fetchAllversions = async()=>{
        try{
            const {data} = await axios.get(backendUrl +'/api/admin/allVersions')
            if(data.success){
                 setVersions(data.allVersions)
                 console.log(data.allVersions)
            }
            else {
                console.log(data.message)
            }

        }
        catch(error){
            console.log(error.message)
        }
    }


//fetch data based on version input given
    const fetchSpecificVersion = async(version)=>{
        try{
            const {data} = await axios.get(backendUrl +`/api/admin/allVersions/${version}`)
            if(data.success){
                setVersiondata(data.versionData)
                console.log(data.versionData)
            }
            else{
                console.log(data.message)
            }
        }catch(error){
            console.log(error.message)
        }
    }


    //fpsdatewise details
    const fetchFPSdatewise = async(fpscode, dateID)=>{

        setLoading(true)
        try{

            const {data} = await axios.get(backendUrl + `/api/admin/FPSdaily/${fpscode}/${dateID}`)
            if(data.success){
                 setFPSdateTrans(data.FPSdateData)
                 console.log(data.FPSdateData)
            }
            else{
                console.log(data.message)
            }
        }catch(error){
            console.log(error.message)
        }finally {
        setLoading(false); // Set loading to false after fetching
      }

    }


    //fetch byPassrationHistory of particular ration ration card
     const fetchByPassRation = async(fpscode, rationNumber)=>{

        setLoading(true)
        try{

            const {data} = await axios.get(backendUrl + `/api/admin/RationByPass/${fpscode}/${rationNumber}`)
            if(data.success){
                 setByPassRationInfo(data.ByPassRationData)
                 console.log(data.ByPassRationData)
            }
            else{
                console.log(data.message)
            }
        }catch(error){
            console.log(error.message)
        }finally {
        setLoading(false); // Set loading to false after fetching
      }
     }


     //handles token expiration

     const isTokenExpired=(token)=>{

        if(!token) return true;

        const decoded_token = JSON.parse(atob(token.split('.')[1]));          //decoding payload
        const expiryTime = decoded_token.exp*1000                          //converting to miliseconds
        return expiryTime <Date.now()
     }




    
   //fetch repair summary of all districts

   const fetchRepairSummary = async(req,res)=>{
    try{
     
        const {data} = await axios.get(backendUrl + '/api/admin/statusReport/allDistricts')
        if(data.success){
           setRepairData(data.RepairSummary) 
        //    console.log(data.RepairSummary)
        }
        else{
            toast.error(data.message)
            console.log(data.message)
        }

    }catch(error){
        console.log(error.message)
        toast.error(error.message)

    }
   }

    

    const value = {
        admintoken, setAdminToken, 
        districtData, fetchDistrictData, backendUrl,
        dTransactions, fetchTransDistricts,
         cardOptions, fetchCardTypes,
         TransOptions, fetchTransTypes,
         versions, fetchAllversions,
         versionData, fetchSpecificVersion,
         FPSdateTrans, loading, fetchFPSdatewise,
         byPassRationInfo, fetchByPassRation,
         isTokenExpired,
         repairData, fetchRepairSummary
       
    }

    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )

}
export default AdmincontextProvider