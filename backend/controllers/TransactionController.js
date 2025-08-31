import { sql, poolPromise } from "../config/sqldb.js";

//1)transaction summary api based on cardtype and transaction type filter

 

//api to get all card types

const getCardTypes = async(req, res)=>{
    try{
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('SP_GET_CARD_TYPE');

        // console.log(result)

        res.status(200).json({
            success:true, 
            cardTypes:result.recordset
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


//api to get all trans types
const getTransTypes = async(req, res)=>{
    try{
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('SP_GET_TRX_TYPE');

        // console.log(result)

        res.status(200).json({
            success:true, 
            TansTypes:result.recordset
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


//a) api to get all districts

const getTransactionDistricts = async(req, res)=>{
    try{

        const {cardType, TrxType} = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"All_District") // Add input parameters as needed (name, type, value)
        //  .input('District',sql.VarChar,"")
        //  .input('Block',sql.VarChar,"ARAEE" )
        .input('CARD_TYPE', sql.VarChar, cardType)
         .input('TRX_TYPE', sql.NVarChar, TrxType)
        
        .execute('SP_Get_TransactionSummary');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            disTransactions:result.recordset
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

// b) api to get districtwise transactions
const getTransactionsBlocks = async(req, res)=>{
    try{
        const {district} = req.params;
        const {cardType, TrxType} = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"All_Block") // Add input parameters as needed (name, type, value)
          .input('District',sql.VarChar,district)
           .input('CARD_TYPE', sql.VarChar, cardType)
           .input('TRX_TYPE', sql.NVarChar, TrxType)
        .execute('SP_Get_TransactionSummary');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            BlockTransactions:result.recordset
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

// c) api to get all FPS inside a block
const getFPStransactions = async(req, res)=>{
    try{
        const {blockID} = req.params;
        const {cardType, TrxType} = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"All_FPS") // Add input parameters as needed (name, type, value)
          .input('District',sql.VarChar," ")
          .input('Block_ID',sql.Int,blockID )
          .input('CARD_TYPE', sql.VarChar, cardType)
          .input('TRX_TYPE', sql.NVarChar, TrxType)
        
        .execute('SP_Get_TransactionSummary');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            FPSTransactions:result.recordset
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


// d) api to get ration wise transactions based on fps
const getRationTransactions= async(req, res)=>{
    try{
        const {fpscode} = req.params;
        const {cardType, TrxType} = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
         .input('Action',sql.VarChar,"FPS_Wise") // Add input parameters as needed (name, type, value)
          .input('District',sql.VarChar,"")
          .input('Block_ID',sql.VarChar,"" )
          .input('FPSCode',sql.VarChar, fpscode )
          .input('CARD_TYPE', sql.VarChar, cardType)
          .input('TRX_TYPE', sql.NVarChar, TrxType)
          
          
        
        .execute('SP_Get_TransactionSummary');
    
       
        console.log(result)

        res.status(200).json({
            success:true, 
            RationTransactions:result.recordset
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


//Transaction summary APIs by Aadhar based on year and month filter
  //a) for all districts transactions
     const getAadharTransactions = async(req, res)=>{
        try{

            const{year, month} = req.params

            const pool = await poolPromise;
            const result = await pool.request()
             .input('Action',sql.VarChar,"All_District") // Add input parameters as needed (name, type, value)
             .input('Year', sql.VarChar, year)
             .input('Month', sql.VarChar, month)
             .execute('SP_Get_TransactionSummaryBY_Aadhar');

             console.log(result)

             if(result&&result.recordset.length>1){
             
             return res.status(200).json({
                success:true, 
                AadharTransactions:result.recordset
            })
        }else{
            return res.json({ success:false, AadharTransactions:null,message: 'No records found !!.' });
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


     //b) aadhar transactions for particular district

     const getDistrictAadharTrans = async(req, res)=>{

        try{
         
            const{district, year, month} = req.params

            const pool = await poolPromise;
            const result = await pool.request()
             .input('Action',sql.VarChar, "All_Block") // Add input parameters as needed (name, type, value)
             .input('District', sql.VarChar, district)
             .input('Year', sql.VarChar, year)
             .input('Month', sql.VarChar, month)
             .execute('SP_Get_TransactionSummaryBY_Aadhar');

             console.log(result)
             
             res.status(200).json({
                success:true, 
                DistrictAadharTrans:result.recordset
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


     //c) aadhar transactions for particular block

     const getBlockAadharTransactions = async(req,res)=>{
        try{
 
            const {blockID, year, month} = req.params

            const pool = await poolPromise;
            const result = await pool.request()
             .input('Action',sql.VarChar, "All_FPS") // Add input parameters as needed (name, type, value)
             .input('Block_ID', sql.Int, blockID)
             .input('Year', sql.VarChar, year)
             .input('Month', sql.VarChar, month)
             .execute('SP_Get_TransactionSummaryBY_Aadhar');

             console.log(result)
             
             res.status(200).json({
                success:true, 
                BlockAadharTrans:result.recordset
            }) 




        }catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'Server Error',
                error: error.message
            })
        }
     }

     //c) aadhar transactions for particular fpscode

     const getFPSaadharTransactions = async(req, res)=>{
        try{
            
            const {fpscode, year, month} = req.params

            const pool = await poolPromise;
            const result = await pool.request()
             .input('Action',sql.VarChar, "FPS_Wise") // Add input parameters as needed (name, type, value)
             .input('FPSCode', sql.Int, fpscode)
             .input('Year', sql.VarChar, year)
             .input('Month', sql.VarChar, month)
             .execute('SP_Get_TransactionSummaryBY_Aadhar');

             console.log(result)
             
             res.status(200).json({
                success:true, 
                FPSTrans:result.recordset
            }) 
           



        }catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'Server Error',
                error: error.message
            })
        }
     }




export {
    getCardTypes, getTransTypes,
    getTransactionDistricts,getTransactionsBlocks,getFPStransactions,getRationTransactions,
    getAadharTransactions,getDistrictAadharTrans,getBlockAadharTransactions,getFPSaadharTransactions
}     