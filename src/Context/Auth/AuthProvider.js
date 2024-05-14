import { createContext, useState,useEffect, useContext } from "react";
import LoginContext from "../LoginProvider";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const {setIsloggin,setUserID}=useContext(LoginContext)
   

    useEffect(()=>{
       const expiration= new Date(auth?.expired_on);
        const currentdate=new Date();
       if( expiration > currentdate )
        {
            setIsloggin(true);
            console.log("userid -> ", auth?.userId);
            setUserID(auth?.userId); 
        
        }
        else {setIsloggin(false);}
        

    },[auth])


    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;