import { createContext, useState,useEffect, useContext } from "react";
import LoginContext from "../LoginProvider";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(()=>{
        const localAuth =localStorage.getItem('auth');
        return localAuth !==null ? JSON.parse(localAuth) : undefined;
    });
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
        else {
            console.log("setting login status ---->false");
            
            setIsloggin(false);
        }
        localStorage.setItem('auth',JSON.stringify(auth));

    },[auth])


    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;