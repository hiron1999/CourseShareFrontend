import { createContext, useState, useEffect } from "react";
import useCourseDetails from "../Hooks/useCourseDetails";
import CourseDetailsPage from "../Course/CourseDetailsPage";
import ClassRoom from "../Course/ClassRoom";
import { useParams,Route,Routes } from "react-router-dom";
import PrivateRoute from "../CommonUtils/PrivateRoute";
import { VideoProvider } from "./VideoProvider";
import {CourseStatusProvider} from "../Context/CourseStatusProvider"

const CourseContext = createContext({});

export const CourseProvider = () => {

  const { courseId } = useParams();
  const { loadCourseDetails,loadingStatus,courseError,courseDetails } = useCourseDetails(courseId);

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
