import { createContext, useEffect, useState } from "react";

const baseURL = "http://127.0.0.1:8080";

const VideoContext =createContext({});

export const VideoProvider = ({children}) =>{
    const[videoid,setvideoId]=useState("");
    const[videotimestamp,setvideoTimeStamp]=useState();
    const videoUrl = `${baseURL}/video-leacture/${videoid}`;
    // useEffect(()=>{
        console.log("videourl :" ,videoUrl);
    // },[videourl]);

    return (
        <VideoContext.Provider
        value={
            {videoUrl,
            setvideoId,
            setvideoTimeStamp,
            videotimestamp
        }
        }
        >
          {children}
        </VideoContext.Provider>
        
    );
}
export default VideoContext;