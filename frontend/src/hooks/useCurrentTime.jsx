import React, {useState, useEffect} from 'react'

const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(Date.now())
  
    useEffect(()=>{
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    
      // Return the cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    },[])

    return currentTime
}

export default useCurrentTime
