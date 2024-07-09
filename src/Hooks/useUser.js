import { useState, useContext, useEffect } from "react";
import useBaseConnection from "./useBaseConnection";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";

const PROFILE_URL = "/Profile/user/";

const useUser = (userId) => {
const USER_PROFILE_URL = PROFILE_URL + userId;

  const prfileConfig = {
    url: USER_PROFILE_URL, // Specify the URL
    method: "get", // Specify the HTTP method 
    // params: {
    //   id : userId
    // },
    // Additional configuration options can be added here as needed
  };

  const { response, loadingStatus, error, sendRequest } = useBaseConnection(prfileConfig);
  const [userError,setUserError]=useState();
  const [userDetails,setUserDetails]=useState();
  // const { auth } = useContext(AuthContext);



  const getUser = async()=>{
    await sendRequest({endpointType:'Private'});
   
  }

  useEffect(()=>{
    console.log("loding account details from user-------------------------->",loadingStatus);
    if(loadingStatus === "success"){
        setUserDetails(response);
    }else if(loadingStatus === "errored"){
        if (!error?.response) {
                    setUserError("No Server Response");
                  }else{
                    setUserError( getHttpErrorMessage(error.response?.status));
                  }
    }

  },[response,loadingStatus,error])

  return {
    getUser,
    userDetails,
    loadingStatus,
    userError,
  };
};

export default useUser;
