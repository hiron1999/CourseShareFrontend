import { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import ModuleSpace from "./ModuleSpace";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import ReactPlayer from "react-player";
import VideoContext, { VideoProvider } from "../Context/VideoProvider";

const ClassRoom = () => {
  const [expanded, setExpanded] = useState(false);
    const {video} =useParams();
    const baseURL = "http://127.0.0.1:8080";
   
    const {setvideoId} =useContext(VideoContext);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{
    // console.log(videoUrl);
    setvideoId(video);
  },[])

  return (
    
    <Container
      fluid
      height ={"100%"}
      className="course-page-container"
      style={{
        // height: '100vh',
        display: "flex",
        gap: "20px 20px",
        alignContent: "center",
        padding: "20px",
      }}
    >
         {/* Center Div for Video Player */}
      <Card 
      style={{ 
        
         display: 'flex',
         height: '80vh',
         width: '100vw',
         alignItems: "center",
         flex:1,
          padding: "10px",
          position: "relative",
          minWidth: "400px" }}>
            

           <VideoPlayer/>
            
      </Card>
      {/* Side Collapsible Navbar */}
      
      <Navbar 
      
        expand=""
        expanded={expanded}
        style={{ flexDirection: "column", minWidth: "0px" , padding:"2px" , borderLeft: "1px solid #ccc"}}
      >
        {/* <Navbar.Brand>Navbar</Navbar.Brand> */}
        <Navbar.Toggle 
        style={{ border: "none", alignSelf: "flex-start", }}
        //  className="order-first"
        aria-controls ="collapse-space"
        
        onClick={toggleNavbar}>
          <FontAwesomeIcon icon={ expanded ? faCircleChevronRight : faBars} 
          />
       
        </Navbar.Toggle >
        <Navbar.Collapse
         id="collapse-space"
         style={{ flexDirection: "column", flex: 2, width: "300px" }}
         >
          
            <ModuleSpace/>
        </Navbar.Collapse>
      </Navbar>
      
     
    </Container>
  );
};

export default ClassRoom;