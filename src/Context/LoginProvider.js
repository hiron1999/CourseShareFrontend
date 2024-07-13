import { createContext, useState,useEffect } from "react";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
    const [FormControl, SetFromControl] = useState("login");
    const [isLoggin,setIsloggin]=useState(()=>{
       const loginValue = localStorage.getItem('isLoggin');
        return loginValue !==null ? JSON.parse(loginValue) : false;
    });
    const [userId,setUserID]=useState();
    const [showModal, setShowModal] = useState(false);
    
    console.log("show prompt form :",showModal);
   useEffect(()=>{
        localStorage.setItem('isLoggin',JSON.stringify(isLoggin));
   },[isLoggin])


    return (
        <LoginContext.Provider value={{
            FormControl ,SetFromControl,
            isLoggin,setIsloggin,
            showModal,setShowModal,
            userId,setUserID,
         }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;