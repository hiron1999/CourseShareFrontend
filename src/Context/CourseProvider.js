import { createContext, useState, useEffect, useContext } from "react";
import useCourseDetails from "../Hooks/useCourseDetails";
import CourseDetailsPage from "../Course/CourseDetailsPage";
import ClassRoom from "../Course/ClassRoom";
import { useParams,Route,Routes } from "react-router-dom";
import PrivateRoute from "../CommonUtils/PrivateRoute";
import { VideoProvider } from "./VideoProvider";
import {CourseStatusProvider} from "../Context/CourseStatusProvider"
import LoginContext from "./LoginProvider";

const CourseContext = createContext({});

export const CourseProvider = () => {

  const { courseId } = useParams();
  const {userId} = useContext(LoginContext);
  console.log("coursecontext----------->",userId);
  const { loadCourseDetails,loadingStatus,courseError,courseDetails } = useCourseDetails(courseId,userId);

    // console.log("catalogprovider :",courses);
  const getleacture=(id)=>{
    return courseDetails?.courseEntity?.modules.flatMap(module => module.lectures).find(l => l.id === id);
  }

  return (
    <CourseContext.Provider value={{
        loadCourseDetails,
        getleacture,
        loadingStatus,
        courseError,
        courseDetails,
        
    }}>
    <CourseStatusProvider activityId={courseDetails?.activityStatusId}>
        <Routes>
            <Route path="/details"
                element={
                
                <CourseDetailsPage 
                courseId={courseId}
                />
                }/>
                
            <Route path="/video-leacture/:videoid"
            element={
            <VideoProvider/>
            
            }/>
        </Routes>

    </CourseStatusProvider>
    </CourseContext.Provider>
  );
};

export default CourseContext;
