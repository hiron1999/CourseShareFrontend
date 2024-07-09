import { useEffect, useState  } from "react";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";
import useBaseConnection from "./useBaseConnection";


const PATH="/course-activity/"
const useCourseActivity= (activityId)=>{

    
    const catalogConfig = {
        url: PATH + activityId, // Specify the URL
        method: "get", // Specify the HTTP method 
        // Additional configuration options can be added here as needed
      };

      const { response, loadingStatus, error, sendRequest } = useBaseConnection(catalogConfig);
      const [courseActivity, setCourseActivity] = useState();
      const [courseActivityError, setCourseActivityError] =useState();
      

    const loadCourseActivity = async()=>{
      
       await sendRequest();
    }

    const updateCourseActivity = async(activity)=>{
        const updateURL = PATH + activityId + "/update";
        await sendRequest({
            endpointType:'Private',
            reqBody : activity,
            reqMethod : "post",
            reqEndpoint: updateURL

          });
    }

    // console.log("catalogHook :",courses);

    useEffect(()=>{
        console.log("fetching cources catalog ...................");
        if(loadingStatus === "success"){
            setCourseActivity(response);
            
        }else if(loadingStatus === "errored"){
            if (!error?.response) {
                        setCourseActivityError("No Server Response");
                      }else{
                        setCourseActivityError( getHttpErrorMessage(error.response?.status));
                      }
        }
    },[loadCourseActivity])

    return({
        loadCourseActivity,
        updateCourseActivity,
        loadingStatus,
        courseActivity,
        courseActivityError
    });

}

export default useCourseActivity;