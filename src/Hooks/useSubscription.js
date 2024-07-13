import { useContext,useState,useEffect } from "react";
import LoginContext from "../Context/LoginProvider";
import useBaseConnection from "./useBaseConnection";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";

const PATH="/subscriptionApi/subscription/"

const useSubscription = () =>{

    
  const subscriptionConfig = {
    url: PATH, // Specify the URL
    method: "post", // Specify the HTTP method 
    // body: {
    //   userId : userId,
    //   courseId : courseId
    // }
    // Additional configuration options can be added here as needed
  };
  
  const { response, loadingStatus, error, sendRequest } = useBaseConnection(subscriptionConfig);
  const [subscriptionError,setSubscriptionError]=useState();
  const [SubscriptionResponse,setSubscriptionResponse]=useState({});
  const {userId} = useContext(LoginContext);
   
  
  
  
    const createSubscription = async( currentcourseId)=>{
      const requestBody = {
        userId : userId,
        courseId : currentcourseId
      }
      await sendRequest({
        endpointType:'Private',
        reqBody : requestBody
      });
     
    }

    const removeSubscription = async(subId)=>{
      const removeRequestUrl = PATH + subId + "/remove";
      await sendRequest({
        endpointType:'Private',
        reqMethod: 'delete',
        reqEndpoint: removeRequestUrl
      });
     
    }
  
    useEffect(()=>{
      console.log("loding account details from user-------------------------->",loadingStatus);
      if(loadingStatus === "success"){
          setSubscriptionResponse(response);
      }else if(loadingStatus === "errored"){
          if (!error?.response) {
                      setSubscriptionError("No Server Response");
                    }else{
                      setSubscriptionError( getHttpErrorMessage(error.response?.status));
                    }
      }
  
    },[response,loadingStatus,error])
  
    return {
      createSubscription,
      removeSubscription,
      SubscriptionResponse,
      loadingStatus,
      subscriptionError,
    };
}

export default useSubscription;