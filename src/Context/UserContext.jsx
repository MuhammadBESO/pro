import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext= createContext()
export default function UserContextProvider({children}){


const [userData,setUserData]=useState(null)

useEffect(()=>{
    if(localStorage.getItem("userToken")!=null){
        setUserData(localStorage.getItem("userToken"))
    }
    // }else if( localStorage.getItem("userToken")!=undefined){
    //     setUserData( localStorage.setItem("userToken",null))
    // }
},[])


  return  <UserContext.Provider value={{userData, setUserData}}>
{children}
    </UserContext.Provider>
}