import { useState,useEffect } from "react";
import useBaseConnection from "./useBaseConnection";

const REGISTER_URL="/auth/register"



const useRegister=(username,email,pwd)=>{

    const registerConfig = {
        url: REGISTER_URL, // Specify the URL
        method: "post", // Specify the HTTP method 
        data: {
          name: username,
          email: email,
          password: pwd,
        },
        // Additional configuration options can be added here as needed
      };
      const { response, loadingStatus, error, sendRequest } = useBaseConnection(registerConfig);
    const [registerResponse,setRegisterResponse]=useState();
     

    // const register = async () =>{
    //     try{
    //        const result= await axios.post(LOGIN_URL,
    //         JSON.stringify({
    //             name: username,
    //             email: email,
    //             password: pwd
    //         }));

    //         console.log(result);
    //         setResponse("User registered successfully");
            
           

    //     }catch (err) {
    //         if (!err?.response) {
    //             setResponse('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setResponse('Email id already register try to login');
    //         } else if (err.response?.status === 401) {
    //             setResponse('Unauthorized');
    //         } else if (err.response?.status === 500) {
    //             setResponse('Internal Server Error\n try after some time');
    //         }
    //          else {
    //             setResponse('Registration Failed');
    //         }
    //     //    setResponse((prev)=>{return {msg:prev ,isSuccess:false}})
    //      }
    //      return response;
    // }

    const register = async () =>{
        sendRequest();
    };

    useEffect(()=>{
        console.log("loding status from register-------------------------->",loadingStatus);
        if(loadingStatus === "success"){
            setRegisterResponse("User registered successfully");
        }else if(loadingStatus === "errored"){
            if (!error?.response) {
                setRegisterResponse('No Server Response');
            } else if (error.response?.status === 409) {
                setRegisterResponse('Email id already register try to login');
            } else if (error.response?.status === 401) {
                setRegisterResponse('Unauthorized');
            } else if (error.response?.status === 500) {
                setRegisterResponse('Internal Server Error\n try after some time');
            }
             else {
                setRegisterResponse('Registration Failed');
            }
        }
    
      },[response,loadingStatus,error])
    return{
        register,
        registerResponse,
        loadingStatus,
        error,
    }

}

export default useRegister;