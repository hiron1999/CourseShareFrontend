import { createContext } from "react";
import useCourseActivity from "../Hooks/useCourseActivity";
import { useEffect } from "react";
const CourseStatusContext = createContext({})

export const CourseStatusProvider = ({children,activityId})=>{
   
   
    const {
        loadCourseActivity,
        updateCourseActivity,
        loadingStatus,
        courseActivity,
        courseActivityError
    } = useCourseActivity(activityId);

    const lastwatch=()=>{
        return courseActivity?.activityList.filter(activity => activity.activityDetails.type === "watch")[0]?.activityDetails.leactureId
        || undefined;
        
    }

    const getVideoStatus = (videoId)=>{
        return courseActivity?.activityList.filter(activity => activity.activityDetails.leactureId === videoId)[0]?.activityDetails
        || undefined;
    }
    const updateVideoStatus = async(videoId,playtime)=>{
       const previousActivity =courseActivity?.activityList.filter(activity => activity.activityDetails.leactureId === videoId)[0] || undefined;
       const newActivity = previousActivity 
  ? {
      ...previousActivity,
      activityDetails: {
        ...previousActivity.activityDetails,
        playedTime: playtime
      }
    }
  : {
      activityDetails: {
        type: 'watch',
        leactureId: videoId,
        playedTime: playtime
      }
    };

        console.log("sending update activity request.....",newActivity);
     await updateCourseActivity(newActivity);

    }

    useEffect(()=>{
    console.log("from activity context -->",activityId);
    activityId && loadCourseActivity();
    },[activityId]);

    return(
        <CourseStatusContext.Provider
        value={{
        loadCourseActivity,
        lastwatch,
        getVideoStatus,
        updateVideoStatus,
        courseActivity,
        loadingStatus,
        courseActivityError
        }}
        >
            {children}
        </CourseStatusContext.Provider>
    )
    
}

export default CourseStatusContext;