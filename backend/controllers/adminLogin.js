import { sql, poolPromise } from "../config/sqldb.js";
import jwt from 'jsonwebtoken'


const loginAdmin= async(req,res)=>{
    try{

    const {username, password} = req.body

    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserName',sql.VarChar, username) // Add input parameters as needed (name, type, value)
      .input('Password', sql.NVarChar, password)
      .execute('SP_Get_UserDetail');

       const userInfo = result.recordset[0]
      

       if(!userInfo){
        return res.json({success:false, message:'Invalid Credentials'})
       }

       if(password===userInfo.Password && username===userInfo.USER_NAME){
        const token = jwt.sign({userId:userInfo.USER_ID, username:userInfo.USER_NAME}, process.env.JWT_SECRET)
        res.json({success:true, token})
       }
       else{
         res.json({success:false, message:'Invalid Credentials'})
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

export {loginAdmin}