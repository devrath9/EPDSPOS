import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
// import { Admincontext } from '../context/Admincontext'
import axios from 'axios'
import { Admincontext } from '../context/Admincontext'
import { toast } from 'react-toastify'


import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, setAdminToken}= useContext(Admincontext)
  

  // const [state, setState] = useState('Admin')
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
 

  const navigate = useNavigate()

   const onSubmitHandler= async(event)=>{
     event.preventDefault()

     if(username.length===0){
      toast.warn('Username cannot be empty')
     }
     else if(password.length===0){
      toast.warn('Password cannot be empty')
     }
     else{
  
  
     try{
  
       
         
         const {data} = await axios.post(backendUrl +'/api/admin/login', {username, password})
         if(data.success){
           // console.log(data.token)
           localStorage.setItem('admintoken', data.token)
           setAdminToken(data.token)
           navigate('/')
         }else{
           toast.error(data.message)
         }
       
       
  
     }catch(error){
        console.log(error)
       toast.error('Internal server occured')
  
     }
    }
   }

  return (
    


    <div className="w-full flex h-screen justify-center items-center bg-gradient-to-tl from-teal-200 via-yellow-100 to-orange-300">
     <div className="w-[90%] lg:w-4/5 2xl:w-1/2 flex rounded border shadow-2xl gap-1 p-1">


       <div className="max-md:hidden md:w-[55%] px-1 py-1">
        <img className='rounded h-full' src={assets.Loginbanner} />
       </div>


    <form onSubmit={onSubmitHandler} className="w-[100%] md:w-[45%] flex flex-col gap-2 py-1 px-4 md:px-2 ml-2">

       <div className="text-center max-sm:text-xs sm:text-sm">
         <button className="w-full bg-orange-400 px-2 py-1.5 font-semibold rounded mt-1" disabled>Food and Supplies Department</button>
       </div>

       <div className="mt-4 flex justify-center mb-4 ">
        <img className='w-32'src={assets.rajaslogo} />
       </div>


        <div className="flex flex-col gap-1 sm:px-1.5">
          <p className='text-gray-800'>Username</p>
         <div className="relative">
           <input onChange={(e)=>setUsername(e.target.value)} value={username}
            className='border-2 border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full' type="text"/>
           <img src={assets.usericon} className="w-5 absolute left-3 top-1/2 transform -translate-y-1/2"/>
         </div>
        
        </div>


        <div className="flex flex-col gap-1 sm:px-1.5 mt-2">
        <p className='text-gray-800'>Password</p>
          <div className="relative">
           <input onChange={(e)=>setPassword(e.target.value)} value={password}
            className='border-2 border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full' type="password"/>
           <img src={assets.passicon}className="w-5 absolute left-3 top-1/2 transform -translate-y-1/2"/>
          </div>
        </div>

        <div className="text-center">
         <button type='submit' className="w-full md:w-4/5  bg-blue-600 px-2 py-1.5 font-bold text-white rounded mt-8 mb-6">LOGIN</button>
       </div>

    </form>

  </div>
  
</div>

  )
}

export default Login
