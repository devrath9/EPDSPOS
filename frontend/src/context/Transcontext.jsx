import { createContext, useState } from "react";

export const Transcontext = createContext()

const TranscontextProvider = (props)=>{

    //saved as global context so that selected filters at first transaction page can be used at deeper levels as req.body
    const [selectedcardTypes, setselectedCardTypes] = useState([])
    const [selectedTransTypes, setselectedTransTypes] = useState([])

   


    
const handlecardTypechange = (value)=>{
    if (selectedcardTypes.includes(value)) {              // Check if the value is already in the state
        setselectedCardTypes(selectedcardTypes.filter((item) => item !== value));     // If already in the state, remove it
    } else {
       setselectedCardTypes([...selectedcardTypes, value]);       // If not in the state, add it
    }
}

const handletransTypechange = (value)=>{
    if(selectedTransTypes.includes(value)){
        setselectedTransTypes(selectedTransTypes.filter(item=>item!==value))
    }else{
        setselectedTransTypes([...selectedTransTypes, value])
    }
}








    const value={
         selectedcardTypes, handlecardTypechange , setselectedCardTypes, setselectedTransTypes,
         selectedTransTypes, handletransTypechange
    }

    return (
        <Transcontext.Provider value={value} >
            {props.children}
        </Transcontext.Provider>
    )
}

export default TranscontextProvider