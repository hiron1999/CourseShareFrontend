import { useEffect, useState } from "react";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";
import useBaseConnection from "./useBaseConnection";
const PATH ="/video-leacture/";
const useVideoStream = (videoId)=>{

    const SEARCH_URL = PATH + videoId;
    const catalogConfig = {
        url: SEARCH_URL, // Specify the URL
        method: "get", // Specify the HTTP method 
        // Additional configuration options can be added here as needed
        headers: {
            Accept: 'video/mp4;charset=UTF-8'
        },
        responseType: 'blob'
      };

      const { response, loadingStatus, error, sendRequest } = useBaseConnection(catalogConfig);
      const [courseDetails, setCourseDetails] = useState();
      const [courseError, setCourseError] =useState();

    const loadCourseDetails = async()=>{
       await sendRequest();
    }

    // console.log("catalogHook :",courses);

    useEffect(()=>{
        console.log("fetching cources catalog ...................");
        if(loadingStatus === "success"){
            setCourseDetails(response);
            
        }else if(loadingStatus === "errored"){
            if (!error?.response) {
                        setCourseError("No Server Response");
                      }else{
                        setCourseError( getHttpErrorMessage(error.response?.status));
                      }
        }
    },[response,loadingStatus,error])

    return({
        loadCourseDetails,
        loadingStatus,
        courseError,
        courseDetails
    });
}

export default useVideoStream;