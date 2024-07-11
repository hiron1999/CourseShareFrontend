import { useContext, useEffect,useRef } from "react";
import VideoContext from "../Context/VideoProvider";
import ReactPlayer from "react-player";
import { useState } from "react";
import VideoPlayerWrapper from "../UI/VideoPlayerWrapper";


const VideoPlayer = () =>{
    const {videoUrl,videotimestamp,videoTitle,saveplayback} =useContext(VideoContext);
    const [src,setSrc]=useState("");
    const playerRef = useRef(null);
    // const [currentTime, setCurrentTime] = useState();
    const currentTimeRef = useRef();
    let isStarted=false;
    const [videoEnded ,setVideoEnded] =useState(false);

    const handleProgress = (state) => {
        // `state.playedSeconds` gives you the current playback position in seconds
        currentTimeRef.current = state.playedSeconds;
        setVideoEnded(false);
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

    const handleend =()=>{
        setVideoEnded(true);
    }

    return(
        <VideoPlayerWrapper title={videoTitle}   >
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
        onEnded={handleend}
        style={{
          flex: 1,
          minWidth : "360px",
          minHeight : "400px",
          objectFit: "cover",
          
        }}
        // wrapper={VideoPlayerWrapper}
        >
            
        </ReactPlayer>
        {videoEnded && <button style={styles.nextButton} >Next</button>}

       </VideoPlayerWrapper>  
       
    );

};

const styles = {

    nextButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px 20px',
        fontSize: '16px',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        color: 'white', // Text color
        border: 'none', // No border
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
    },
 };

export default VideoPlayer;