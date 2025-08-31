import sql from 'mssql'
import 'dotenv/config' 

//configuration for mssql server
const config={
    server: process.env.DB_SERVER,
    database : process.env.DB_DATABASE,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    options:{
        encrypt : false,
        enableArithAbort : true,
        trustedConnection: true,
        trustServerCertificate : true

    },
    port : parseInt(process.env.DB_PORT)
}

//create a connection pool and return it as a promise
const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool=>{
    console.log('Connected to Database')
    return pool
})
.catch(err=>{
    console.log('Database connection failed :', err)
    throw err;
})

export {config,sql, poolPromise}