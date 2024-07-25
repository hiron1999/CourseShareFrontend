import { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/Auth/AuthProvider";
import useBaseConnection from "./useBaseConnection";
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = "/auth/invalidateToken";

const useLogout = () => {
    const loginConfig = {
        url: LOGOUT_URL, // Specify the URL
        method: "post", // Specify the HTTP method 
        
        // Additional configuration options can be added here as needed
    };
    
  const {auth,setAuth}=useContext(AuthContext);
  const { response, loadingStatus, error, sendRequest } = useBaseConnection(loginConfig);

  const [logoutResponse,setlogoutResponse]=useState();
  



  const logout = async()=>{
    const requestparams = {
        token : auth?.accessToken
      }
      console.log(requestparams);
       await sendRequest({endpointType:'Private'});
   
  }

  useEffect(()=>{
    console.log("loding status from logoutg-------------------------->",loadingStatus);
    if(loadingStatus === "success"){
        setAuth(undefined);
        
        setlogoutResponse("ok");
    }else if(loadingStatus === "errored"){
        if (!error?.response) {
                    setlogoutResponse("No Server Response");
                  } else if (error.response?.status === 400) {
                    setlogoutResponse("Missing Username or Password");
                  } else if (error.response?.status === 401) {
                    setlogoutResponse("Unauthorized");
                  } else if (error.response?.status === 403) {
                    setlogoutResponse("Invalid Username and password");
                  } else {
                    setlogoutResponse("logout Failed");
                  }
    }

  },[response,loadingStatus,error])

  return {
    logout,
    logoutResponse,
    loadingStatus,
    error,
  };
};

export default useLogout;
