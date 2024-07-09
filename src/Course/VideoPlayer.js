import { useContext, useEffect,useRef } from "react";
import VideoContext from "../Context/VideoProvider";
import ReactPlayer from "react-player";
import { useState } from "react";


const VideoPlayer = () =>{
    const {videoUrl,videotimestamp,saveplayback} =useContext(VideoContext);
    const [src,setSrc]=useState("");
    const playerRef = useRef(null);
    // const [currentTime, setCurrentTime] = useState();
    const currentTimeRef = useRef();
    let isStarted=false;
    

    const handleProgress = (state) => {
        // `state.playedSeconds` gives you the current playback position in seconds
        currentTimeRef.current = state.playedSeconds;
        console.log("video timestamp : ",currentTimeRef.current);
    };

    const handleSeek = () => {
        if (playerRef.current && !isStarted) {
        playerRef.current.seekTo(videotimestamp || 0 , 'seconds');
        }
    };

    useEffect(()=>{
        setSrc(videoUrl);
        const savewatchStatus=()=>{
            saveplayback(currentTimeRef.current);
        }

        window.addEventListener('beforeunload',savewatchStatus );

        return async()=>{
           currentTimeRef.current && await saveplayback(currentTimeRef.current);
            console.log("saving video status...");
            window.removeEventListener('beforeunload',savewatchStatus );

        }
    },[videoUrl]);
    console.log(src);
    
    useEffect(()=>{
       handleSeek();

    },[videotimestamp])

    return(
        
        <ReactPlayer 
        width={"100%" }// Set width to 100vw to fill the entire viewport horizontally
        height={"100%"}
        // height={"100%"}
        url={src || "/notfound"} 
        controls={true}
        ref={playerRef}
        onReady={handleSeek}
        onProgress={handleProgress} 
        onPlay={()=>{isStarted = true} }
        style={{
          flex: 1,
          minWidth : "360px",
          minHeight : "400px",
          objectFit: "cover",
          
        }}>
            
        </ReactPlayer>
       
       
    )
};

export default VideoPlayer;