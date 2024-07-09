import { createContext, useContext, useEffect, useState } from "react";
import CourseStatusContext from "./CourseStatusProvider";
import ClassRoom from "../Course/ClassRoom";
import { useParams } from "react-router-dom";

const baseURL = "http://127.0.0.1:8080";

const VideoContext =createContext({});

export const VideoProvider = () =>{
    const {videoid} =useParams();
    // const[videoId,setvideoId]=useState();
    const{getVideoStatus,updateVideoStatus}=useContext(CourseStatusContext);
    const[videotimestamp,setvideoTimeStamp]=useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    let videoUrl = `${baseURL}/video-leacture/${videoid}`;
    useEffect(()=>{
        const videoStatus = getVideoStatus(videoid);
        console.log("video status :",videoStatus?.playedTime );
        setvideoTimeStamp(videoStatus?.playedTime || 0)
    },[getVideoStatus]);

    // useEffect(()=>{
       
    // },[]);

    const updatewatchtime=(time)=>{
        // currentTime = time;
        console.log("video timestamp : ",currentTime);
    }

    const saveplayback =async(time)=>{
        
        console.log("watchtime",time);
        await updateVideoStatus(videoid,time);
        setCurrentTime(0);
    }
    return (
        <VideoContext.Provider
        value={
            {videoUrl,
            setvideoTimeStamp,
            videotimestamp,
            saveplayback,
            currentTime,
            updatewatchtime,
            setCurrentTime
        }
        }
        >
          <ClassRoom/>
        </VideoContext.Provider>
        
    );
}
export default VideoContext;