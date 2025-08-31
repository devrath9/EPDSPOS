import express from 'express'
import { getAllDistricts, getDistrictData, getBlockData, 
         getAllversions, getVersionData, getDistrictFps,getSearchdetails, getFPSMonthlyData, 
        getFPSdatewise, multisearch, getRationByPassHistory,
       } from '../controllers/adminController.js'

import {
        getCardTypes, getTransTypes,
        getTransactionDistricts,getTransactionsBlocks,getFPStransactions,getRationTransactions,
        getAadharTransactions,getDistrictAadharTrans,getBlockAadharTransactions,getFPSaadharTransactions
     } from '../controllers/TransactionController.js' 
     
import {getStatusReport, getDeviceInfo, getDeviceList} from '../controllers/RepairController.js'     
     
import { loginAdmin } from '../controllers/adminLogin.js'   
import authAdmin from '../middleware/authAdmin.js'

// import authAdmin from '../middlewares/authAdmin.js'




 const adminRouter = express.Router()

 adminRouter.post('/login', loginAdmin)


 adminRouter.get('/districts', getAllDistricts)
 adminRouter.get('/district/:district', getDistrictData)
 adminRouter.get('/blocks/:blockId', getBlockData)

 adminRouter.post('/transactions/allDistricts', getTransactionDistricts)
 adminRouter.get('/cardTypes', getCardTypes)
 adminRouter.get('/transTypes', getTransTypes)
 adminRouter.post('/transactions/blocks/:district', getTransactionsBlocks)
 adminRouter.post('/transactions/FPS/:blockID', getFPStransactions)
 adminRouter.post('/transactions/rationwise/:fpscode', getRationTransactions)

 adminRouter.get('/aadharTrans/allDistricts/:year/:month',getAadharTransactions )
 adminRouter.get('/disaadharTrans/:district/:year/:month',getDistrictAadharTrans )
 adminRouter.get('/blockaadharTrans/:blockID/:year/:month',getBlockAadharTransactions )
 adminRouter.get('/fpsaadharTrans/:fpscode/:year/:month',getFPSaadharTransactions )


 adminRouter.get('/statusReport/allDistricts', getStatusReport )
 adminRouter.get('/deviceStatus/:deviceCode', getDeviceInfo)
 adminRouter.get('/deviceList/:district/:statusID?', getDeviceList)      //? makes statusID optional enabling null check in api


 adminRouter.get('/allVersions', getAllversions)
 adminRouter.get('/allVersions/:versioncode',getVersionData )
 adminRouter.get('/allVersions/:versioncode/:district', getDistrictFps )

 adminRouter.get('/searchDetails/:option/:input', getSearchdetails )  //This is not the version used for search page
 adminRouter.get('/multisearch/:option/:input', multisearch)
 adminRouter.get('/FPSmonthly/:fpscode/:monthID', getFPSMonthlyData)
 adminRouter.get('/FPSdaily/:fpscode/:dateID', getFPSdatewise)
 adminRouter.get('/RationByPass/:fpscode/:rationNumber', getRationByPassHistory)

 
 
 

 export default adminRouter