import { useContext, useEffect,useState } from "react";
import axios from "./Connection/axios";
import useAxiosPrivate from "./Connection/useAxiosPrivate";
import { LoadingContext } from "../Context/LoadingProvider";
// import { axiosPrivate } from "./Connection/axios";

const LOADING_STATES =["loading","errored","success"];

function useBaseConnection (requestConfig){
    const [response,setResponse] =useState();
    const [error,setError] =useState();
    const [loadingStatus , setLoadingStatus]=useState();
    const axiosPrivate =useAxiosPrivate();
    const {setIsLoading}=useContext(LoadingContext);

    if (!requestConfig) {
        throw "Error : RequestConfig is not present";
    }

    

    const sendRequest = async ({endpointType ='Public',reqBody =null,reqMethod= null,reqParams=null,reqEndpoint=null}={})=>{
        
        reqBody && (requestConfig.data=reqBody);
        reqMethod && (requestConfig.method=reqMethod);
        reqParams && (requestConfig.params=reqParams);
        reqEndpoint && (requestConfig.url=reqEndpoint);
        
        try{
            setLoadingStatus(LOADING_STATES[0]);
            setIsLoading(true);
            const results= (endpointType === 'Public' 
            ? 
            (await  axios.request(requestConfig))
            :
            (await axiosPrivate.request(requestConfig))
            );

            setResponse(results.data);
            console.log(results.data);
            setLoadingStatus(LOADING_STATES[2]);
        }catch(e){
            setError(e);
            console.log("error:",e);
            setLoadingStatus(LOADING_STATES[1]);
        }finally{
            setIsLoading(false);
        }
    }


    return{
        response,
        loadingStatus,
        error,
        sendRequest
    }
    
}

export default useBaseConnection;