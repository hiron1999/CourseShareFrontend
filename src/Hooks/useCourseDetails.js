import { useEffect, useState ,useContext } from "react";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";
import useBaseConnection from "./useBaseConnection";
import LoginContext from "../Context/LoginProvider";

const PATH="/course/"
const useCourseDetails = (courseId)=>{

    const SEARCH_URL = PATH + courseId;
    const catalogConfig = {
        url: SEARCH_URL, // Specify the URL
        method: "get", // Specify the HTTP method 
        // Additional configuration options can be added here as needed
      };

      const { response, loadingStatus, error, sendRequest } = useBaseConnection(catalogConfig);
      const [courseDetails, setCourseDetails] = useState();
      const [courseError, setCourseError] =useState();
      const {userId} = useContext(LoginContext);

    const loadCourseDetails = async()=>{
      const requestparams = {
        userId : userId
      }
       await sendRequest({reqParams : requestparams});
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

export default useCourseDetails;