import { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import VideoContext from "../Context/VideoProvider";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";


import CourseContext from "../Context/CourseProvider";
import TreeList from "../UI/TreeList";

const ClassRoom = () => {
  const [expanded, setExpanded] = useState(false);
  const {videoid} =useParams();
  const {courseDetails}  = useContext(CourseContext);
  // const {setvideoId,videoId} =useContext(VideoContext);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  // console.log("video id :",videoid);
  // useEffect(()=>{
    // setvideoId(videoid);
    // setvideoTimeStamp(5);
    
  // },[videoid])

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
         style={{ flexDirection: "column", flex: 2, width: "300px",paddingTop: "5px" }}
         >
          
          
            {/* <ModuleSpace modules={courseDetails?.courseEntity?.modules}/> */}
          <Card
          style={{
            padding: "10px",
          }}
          >
            <Card.Title
            style={{
              borderBottom: '1px solid #ccc',

            }}
            >Learning path
            </Card.Title>
           <TreeList data={courseDetails?.courseEntity?.modules}/>
           </Card> 
        </Navbar.Collapse>
      </Navbar>
      
     
    </Container>
  );
};

export default ClassRoom;