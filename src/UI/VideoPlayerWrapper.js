import React, { useRef, useState } from "react";

const VideoPlayerWrapper = ({ children, title }) => {
    const [visiblity,setVisiblity]= useState(0);
    
    const handleMouseEnter = () => {
        setVisiblity(1);
    };

    const handleMouseLeave = () => {
       setVisiblity(0);
    };
    return (
        <div style={styles.wrapper}
        // onMouseEnter={()=>{console.log("mouse enter");}}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
            <div 
        style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        
        color: 'white',
        pointerEvents: 'none', // Ensures the overlay does not block video controls
        zIndex: 1, // Ensures the overlay appears above other content within the wrapper
        // padding: '10px 0', // Adds padding to avoid covering the entire video
        // backdropFilter: 'blur(10px)', // Adds the blur effect
        // WebkitBackdropFilter: 'blur(10px)', // For Safari support
        opacity: visiblity,
        // background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)',
    }}
            >
                <h2 style={styles.title}>{title}</h2>
            </div>
            {children}
        </div>
    );
};

const styles = {
    wrapper: {
        // position: 'relative', // Ensures the overlay is positioned relative to this element
        // width: '100%',
        // hlight: '100%',
        // // paddingTop: '56.25%', // 16:9 aspect ratio
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: '1 1 auto',
        maxWidth: '100%', // Ensures the child doesn't exceed parent width
        maxHeight: '100%', // Ensures the child doesn't exceed parent height
    },
   
    title: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px 20px',
        borderRadius: '0px',
    },
};
export default VideoPlayerWrapper;