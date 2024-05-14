import { useEffect, useState } from "react";
import { getHttpErrorMessage } from "../CommonUtils/CommonErrorMassages";
import useBaseConnection from "./useBaseConnection";
const PATH="/course/"
const useFetchCourses = ()=>{

    const catalogConfig = {
        url: PATH, // Specify the URL
        method: "get", // Specify the HTTP method 
        // Additional configuration options can be added here as needed
      };

      const { response, loadingStatus, error, sendRequest } = useBaseConnection(catalogConfig);
      const [courses, setCourses] = useState();
      const [catalogError, setCatalogError] =useState();

    const loadCourseContent = async()=>{
       await sendRequest();
    }

    // console.log("catalogHook :",courses);

    useEffect(()=>{
        console.log("fetching cources catalog ...................");
        if(loadingStatus === "success"){
            setCourses(response);
            
        }else if(loadingStatus === "errored"){
            if (!error?.response) {
                        setCatalogError("No Server Response");
                      }else{
                        setCatalogError( getHttpErrorMessage(error.response?.status));
                      }
        }
    },[response,loadingStatus,error])

    return({
        loadCourseContent,
        loadingStatus,
        catalogError,
        courses
    });

}

export default useFetchCourses;