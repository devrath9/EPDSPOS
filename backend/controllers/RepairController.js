import { sql, poolPromise } from "../config/sqldb.js";

//api to get repair status info of districtwise POS

const getStatusReport = async(req, res)=>{
    try{
      
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"All") // Add input parameters as needed (name, type, value)
         .execute('SP_Get_PosRepair_Status');

         console.log(result)
         res.status(200).json({
            success:true, 
            RepairSummary:result.recordset
        })


    }catch(error){
        console.log(error)
        res.json({
            success:false, 
            message : 'Server Error',
            error: error.message
        })
    }
}



//api to get status of particular device code
const getDeviceInfo = async(req, res)=>{
    try{
      
        const {deviceCode} = req.params

        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"All") // Add input parameters as needed (name, type, value)
         .input('DEVICE_CODE', sql.VarChar, deviceCode)
         .execute('SP_Get_PosRepair_Status');
            
         console.log(result)

         if(result && result.recordset.length>0){
         res.status(200).json({
            success:true, 
            DeviceInfo:result.recordset,
            
        })
       }else{
        res.json({
            success:false, 
            DeviceInfo:[],
            message:"No records found"
          })
        }



    }catch(error){
        console.log(error)
        res.json({
            success:false, 
            message : 'Server Error',
            error: error.message
        })
    }
}



//api to get all devices in available, repaired and not verfied category in particular district

const getDeviceList = async(req,res)=>{
   try{

      const {district, statusID} = req.params

      if (!statusID) {
        return res.json({
          success: false,
          message: "statusID not specified"
        });
      }
      
      const pool = await poolPromise;
      const result = await pool.request()
       .input('Action',sql.VarChar,"Device_Detail") // Add input parameters as needed (name, type, value)
       .input('District', sql.VarChar, district)
       .input('Status_ID', sql.Int, statusID)
       .execute('SP_Get_PosRepair_Status');

       console.log(result)

       const [Status, DeviceList] = result.recordsets
       res.status(200).json({
        success:true, 
        district:district,
        status: Status[0].ComplainStatus,
        DeviceList: DeviceList
      })



   }catch(error){
    console.log(error)
    res.json({
        success:false, 
        message : 'Server Error',
        error: error.message
    })
   }
}


export {getStatusReport, getDeviceInfo, getDeviceList}