import React,{useEffect} from 'react'

export const useScrollLockSidebar = (isSidebarOpen) => {
    const BREAKPOINT = 1024;

    useEffect(()=>{
        
        const handleresize=()=>{

            const isSmallScreen = window.innerWidth < BREAKPOINT;

            if(!isSmallScreen){
                document.body.style.overflow = 'auto';
            }
            else{
                if(isSidebarOpen){
                    document.body.style.overflow = 'hidden';
                  }
                  else{
                    document.body.style.overflow = 'auto';
                  }
            }
        }

        handleresize();

        window.addEventListener('resize' ,handleresize)

        return()=>{
            window.addEventListener('resize' ,handleresize)
            document.body.style.overflow = 'auto';
        }

    },[isSidebarOpen])
}


