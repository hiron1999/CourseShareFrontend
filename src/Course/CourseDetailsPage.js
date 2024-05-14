import React, { useEffect } from "react";
import { Container, Tabs,Tab, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./CourseDetailsPage.css"; // Import custom CSS for styling
import Module from "./Module";
import ModuleSpace from "./ModuleSpace";
import { useParams } from "react-router-dom";
import useCourseDetails from "../Hooks/useCourseDetails";

const CourseDetailsPage = () => {
  // Demo data for course details
  // const courseDetails = {
  //   title: "React Crash Course",
  //   description:
  //     "Learn React.js from scratch with this comprehensive crash course.",
  // };

  // Demo data for course modules
  const courseModules = [
    "Introduction to React",
    "State and Props",
    "Hooks",
    "Component Lifecycle",
    "Forms and Validation",
  ];

  const {courseId} = useParams();
  console.log("course id  :",courseId);
  
  const { loadCourseDetails,
    loadingStatus,
    courseError,
    courseDetails} = useCourseDetails(courseId);

  useEffect(()=>{
    loadCourseDetails();
  },[]);


  return (
     
     loadingStatus ==="errored" ? 
    <h1>{courseError}</h1>
    :
    <Container
      fluid
      className="course-page-container"
      style={{
        height: "100vh",
        display: "flex",

        gap: "20px 20px",
        alignContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100",
          flex: "8",
          gap: "20px 20px",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        {/* First half: Course details */}
        <Card
          className="course-details-card"
          style={{
            flex: "3",
          }}
        >
          <Card.Body>
            <Card.Title>
              <h1>{courseDetails?.name}</h1>
            </Card.Title>
            <Card.Text>{courseDetails?.description}</Card.Text>
          </Card.Body>
        </Card>

        {/* Second half: Course modules */}
        <Card
          className="course-modules-card"
          style={{
            flex: "7",
          }}
        >
          <Card.Body>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="profile" title="Modules">
                <ModuleSpace modules={courseDetails?.modules}/>

              </Tab>
              <Tab eventKey="Community" title="Community">
                
              </Tab>
              <Tab eventKey="contact" title="Contact" >
                Tab content for Contact
              </Tab>
            </Tabs>
          
          
            
          </Card.Body>
        </Card>
      </div>

      <Card
        className="course-modules-card"
        style={{
          flex: "2",
        }}
      >
        <Card.Body>
          <Card.Title>Author</Card.Title>
          <ul>
            {courseModules.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CourseDetailsPage;
