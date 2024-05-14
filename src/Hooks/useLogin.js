import { useState, useContext, useEffect } from "react";
import axios from "./Connection/axios";
import AuthContext from "../Context/Auth/AuthProvider";
import useBaseConnection from "./useBaseConnection";

const LOGIN_URL = "/auth/token";

const useLogin = (email, pwd) => {

  const loginConfig = {
    url: LOGIN_URL, // Specify the URL
    method: "post", // Specify the HTTP method 
    data: {
      email: email,
      password: pwd,
    },
    // Additional configuration options can be added here as needed
  };

  const { response, loadingStatus, error, sendRequest } = useBaseConnection(loginConfig);

  const [loginResponse,setLoginResponse]=useState();
  const { setAuth } = useContext(AuthContext);



  const login = async()=>{
    sendRequest();
   
  }

  useEffect(()=>{
    console.log("loding status from loging-------------------------->",loadingStatus);
    if(loadingStatus === "success"){
        setAuth(response);
        setLoginResponse("Successfully loggedin");
    }else if(loadingStatus === "errored"){
        if (!error?.response) {
                    setLoginResponse("No Server Response");
                  } else if (error.response?.status === 400) {
                    setLoginResponse("Missing Username or Password");
                  } else if (error.response?.status === 401) {
                    setLoginResponse("Unauthorized");
                  } else if (error.response?.status === 403) {
                    setLoginResponse("Invalid Username and password");
                  } else {
                    setLoginResponse("Login Failed");
                  }
    }

  },[response,loadingStatus,error])

  return {
    login,
    loginResponse,
    loadingStatus,
    error,
  };
};

export default useLogin;
