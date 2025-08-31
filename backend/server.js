import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
// import bodyParser from 'body-parser'
import {sql, poolPromise} from './config/sqldb.js'
import adminRouter from './routes/Adminroute.js'

//config
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const port = process.env.PORT ||5000

//endpoints
 app.use('/api/admin', adminRouter) 



app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})

