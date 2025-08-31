import React, {useState, useEffect} from 'react'
import { assets } from '../assets/assets'
 import { useContext} from 'react'
// import { Admincontext } from '../context/Admincontext'
 import { useNavigate } from 'react-router-dom'
import { Admincontext } from '../context/Admincontext'
import { Transcontext } from '../context/Transcontext'



const Navbar = ({toggleSidebar}) => {

   const {admintoken, setAdminToken} = useContext(Admincontext)
   const [username, setUsername] = useState('');
   const [isHover, setIsHover] = useState(false)
   const {setselectedCardTypes, setselectedTransTypes} = useContext(Transcontext)

   useEffect(() => {
     
     if (admintoken) {
       const decodedToken = JSON.parse(atob(admintoken.split('.')[1])); // Decode the JWT token
       setUsername(decodedToken.username);
     }
   }, []);
  
   const navigate = useNavigate()
   const logout=()=>{
       navigate('/')
       admintoken && setAdminToken('')
       admintoken && localStorage.removeItem('admintoken')
       setselectedCardTypes([])
       setselectedTransTypes([])



  

  }
  return (
    <div className='flex justify-between items-center px-4 py-2 sm:px-10 border-b bg-[#F8F9FD]'>
      <div className='flex items-center gap-4'>
        <img onClick={toggleSidebar} className='max-lg:flex hidden h-7 w-7 rounded cursor-pointer' src={assets.Menu_Icon} alt=''/>
        <img className = 'w-32 h-12' src={assets.admin_logo} alt=''/>

       
      </div>

     <div className='hidden sm:block text-center'>
      <div className='text-sm'>Government of Rajasthan</div>
     <div className='text-xl font-semibold'>Food and Civil Supplies Department</div>
     </div>
      

      <div className='flex gap-2 items-center'>
      <p>{username}</p>
      <div className=' relative inline-block mt-2 logoutcontainer' onMouseEnter={()=>setIsHover(true)}>
      <button onClick={logout} className=''><img  className='w-8'src={assets.logout} alt=''/></button>
      {isHover && <div className='tooltip'> Logout</div>}
      </div>
      </div>
      
    </div>
    
  )
}

export default Navbar
