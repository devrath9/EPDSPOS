import jwt from 'jsonwebtoken'
import { sql, poolPromise } from "../config/sqldb.js";

const authAdmin=(req, res, next)=>{

    try{

    const {admintoken} = req.headers

    if(!admintoken){
        return res.json({success:false, message:"Not Authorised, Login Again"})
    }

    const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET)
    console.log(token_decode)

    if(token_decode.userId!==1){
        return res.json({success:false,message:"Invalid Token, Login Again " })
    }

    next()

}catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
}




}

export default authAdmin