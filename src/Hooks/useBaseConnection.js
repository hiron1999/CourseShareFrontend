import { useEffect,useState } from "react";
import axios from "./Connection/axios";
import useAxiosPrivate from "./Connection/useAxiosPrivate";
// import { axiosPrivate } from "./Connection/axios";

const LOADING_STATES =["loading","errored","success"];

function useBaseConnection (requestConfig){
    const [response,setResponse] =useState();
    const [error,setError] =useState();
    const [loadingStatus , setLoadingStatus]=useState();
    const axiosPrivate =useAxiosPrivate();

    if (!requestConfig) {
        throw "Error : RequestConfig is not present";
    }

    

    const sendRequest = async (endpointType ='Public')=>{
        try{
            setLoadingStatus(LOADING_STATES[0]);
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