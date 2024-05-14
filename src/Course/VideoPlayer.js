import { useContext, useEffect } from "react";
import VideoContext from "../Context/VideoProvider";
import ReactPlayer from "react-player";


const VideoPlayer = () =>{
    const {videoUrl,videotimestamp,setvideoTimeStamp} =useContext(VideoContext);

    useEffect(()=>{

        console.log(videoUrl);
    },[videoUrl]);

    return(
        <ReactPlayer 
        width={"100%" }// Set width to 100vw to fill the entire viewport horizontally
        height={"100%"}
        // height={"100%"}
        url={videoUrl || "/notfound"} 
        controls={true} 
        style={{
          flex: 1,
          minWidth : "360px",
          minHeight : "400px",
          objectFit: "cover",
          
        }}/>
       
    )
};

export default VideoPlayer;