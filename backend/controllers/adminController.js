import { sql, poolPromise } from "../config/sqldb.js";


//1)Registered POS api

//api to get district data
const getAllDistricts = async(req, res)=>{
    try{
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"DistrictWise") // Add input parameters as needed (name, type, value)
        //  .input('District',sql.VarChar,"")
        //  .input('Block',sql.VarChar,"ARAEE" )
        
        .execute('SP_RegisteredPoS');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            districtData:result.recordset
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

//api to get district specific data
const getDistrictData = async(req, res)=>{
    try{
        const {district} = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
          .input('Action',sql.VarChar,"AllBlockWise") // Add input parameters as needed (name, type, value)
          .input('District',sql.VarChar,district)
        //  .input('Block',sql.VarChar,"ARAEE" )
        
        .execute('SP_RegisteredPoS');
    
       
        // console.log(result)

        res.status(200).json({
            success:true, 
            districtData:result.recordset
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

//api to get blockwise data
const getBlockData = async(req, res)=>{
    try{
        const {blockId} = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
          .input('Action',sql.VarChar,"FPSWiseRegistered") // Add input parameters as needed (name, type, value)
        //   .input('District',sql.VarChar, "")
          .input('Block_id',sql.VarChar, blockId)
        
        .execute('SP_RegisteredPoS');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            VendorData:result.recordset
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







//2)api for version details

 //api to get both version details
  const getAllversions = async(req, res)=>{
    try{
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"GetALL") // Add input parameters as needed (name, type, value)
        //  .input('District',sql.VarChar,"")
       
        .execute('SP_Get_Version');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            allVersions:result.recordset
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


  //api to get Districtwise Data of particular version
    const getVersionData = async(req, res)=>{

        try{
            const {versioncode} =req.params;
            const pool = await poolPromise;
            const result = await pool.request()
             .input('Action',sql.VarChar,"GetVersion") // Add input parameters as needed (name, type, value)
             .input('Version',sql.VarChar, versioncode)
           
            .execute('SP_Get_Version');
        
           
            const versionData = result.recordset
              
            if(versionData.length===0){
                return res.json({
                    success: false,
                    errorCode: "NOT_FOUND",
                    message: "Version does not exist",
                  });
            }

    
             res.status(200).json({
                success:true, 
                versionData
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

//api to get blockwise Data of particular district
  const getDistrictFps = async(req,res)=>{
    try{
        const {versioncode, district} =req.params;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"District_Wise") // Add input parameters as needed (name, type, value)
         .input('Version',sql.VarChar, versioncode)
         .input('District', sql.VarChar, district)
       
        .execute('SP_Get_Version');
    
       
        console.log(result)
        const districtFPS = result.recordset

        if(districtFPS.length===0){
            return res.json({
                success: false,
                errorCode: "NOT_FOUND",
                message: "Version/district does not exist",
              });
        }


        return res.status(200).json({
            success:true, 
            districtFPS
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



  //api to get search details

  const getSearchdetails = async(req, res)=>{
    try{
        const { option, input} = req.params;


        if (!input || isNaN(input) || input <= 0) {
            return res.json({ message: 'Invalid FPS. It must be a positive integer.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,option) // Add input parameters as needed (name, type, value)
         .input('FPSCode',sql.VarChar,input)
         .execute('SP_GetDataBY_Search');

            
         const allRecordsets = result.recordsets.map((recordset, index) => {
              return {
              Index: index + 1, // Index for identifying the result set
              data : recordset
            };
            });

            
        res.status(200).json({
            success:true, 
            Searchresult : allRecordsets
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


//api to get multi search details
   const multisearch = async(req, res)=>{
        
    try{
        const { option, input} = req.params;
        let key='';

        if(option==='FPS'){
            key='FPSCode';
            if (!input || isNaN(input) || input <= 0 || input.length>5) {
                return res.json({ success:false, message: 'Invalid FPS. It must be a positive integer of 0-5 digits.' });
            }
           
        }
        else if(option==='Ration'){
            key='Ration_No';
            if (!input || isNaN(input) || input <= 0 || input.length !==12) {
                return res.json({ success: false, message: 'Invalid Ration. It must be a positive integer of 12 digits.' });
            }
           
        }

        else if(option==='DeviceCode'){
            key='Device_Code';
            
        }

        else if(option==='Aadhaar'){
            key='Aadhaar_No';
            if (!input || isNaN(input) || input <= 0 || input.length !==12) {
                return res.json({ success: false, message: 'Invalid Aadhar. It must be a positive integer of 12 digits.' });
            }

        }

        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,option) // Add input parameters as needed (name, type, value)
         .input(key, sql.VarChar, input)
         .execute('SP_GetDataBY_Search');

         const allRecordsets = result.recordsets.map((recordset, index) => {
            return {
            Index: index + 1, // Index for identifying the result set
            res : recordset
          };
          });

          

         if (allRecordsets && allRecordsets[0].res.length > 0) {
           
            // Return the data if record exists
            return res.status(200).json({
                success:true, 
                SearchResult : allRecordsets,
                nonIndexedresult: result.recordsets
            })
        } else {
            return res.json({ success:false, message: 'No records found !!.' });
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


 //api to get monthly data for FPS transactions 

  const getFPSMonthlyData = async(req, res)=>{
      try{
        
        const { fpscode, monthID} = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,'FPS') // Add input parameters as needed (name, type, value)
          .input('FPSCode',sql.VarChar,fpscode)
          .input('month',sql.VarChar,monthID )
        //   .input('Date',sql.VarChar, "" )
        
        .execute('SP_GetDataBY_Search');
    
       
        console.log(result); 
        
            res.status(200).json({
            success:true, 
            FPSmonthlyData:result.recordset,
            
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


  

  //api to get datewise data for FPS search details

  const getFPSdatewise = async(req, res)=>{

    try{
        
        const { fpscode, dateID} = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,'FPS') // Add input parameters as needed (name, type, value)
          .input('FPSCode',sql.VarChar,fpscode)
        //   .input('month',sql.VarChar,monthID )
          .input('Date',sql.VarChar, dateID )
        
        .execute('SP_GetDataBY_Search');
    
       
        console.log(result); 
        
            res.status(200).json({
               success:true, 
            FPSdateData:result.recordset,
            
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


  //api to get byPass data of a particular ration card from bypassRation History Table
  const getRationByPassHistory =async(req, res)=>{
    try{
      
        const{fpscode, rationNumber} = req.params
        const pool = await poolPromise;

        const result = await pool.request()
         .input('Action',sql.VarChar,'FPS') // Add input parameters as needed (name, type, value)
         .input('FPSCode',sql.VarChar,fpscode)
         .input('Ration_No',sql.VarChar,rationNumber )
         .execute('SP_GetDataBY_Search');

          console.log(result); 
        
          res.status(200).json({
             success:true, 
             ByPassRationData:result.recordset,
            
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

export {getAllDistricts, getDistrictData, getBlockData,
       getAllversions, getVersionData, getDistrictFps,
       getSearchdetails, getFPSMonthlyData, getFPSdatewise, multisearch, getRationByPassHistory,
    

}