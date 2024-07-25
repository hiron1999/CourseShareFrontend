import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Tabs, Tab, Card, Button, Image } from "react-bootstrap";
import "./CourseDetailsPage.css"; // Import custom CSS for styling
import Module from "./Module";
import ModuleSpace from "./ModuleSpace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCourseDetails from "../Hooks/useCourseDetails";
import useSubscription from "../Hooks/useSubscription";
import CourseContext from "../Context/CourseProvider";
import CourseStatusContext from "../Context/CourseStatusProvider";
import ProfileIcon from "../Icons/profile-circle-icon.png"

const CourseDetailsPage = ({courseId}) => {
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

  // const { courseId } = useParams();
  console.log("course id  :", courseId);
  const SubButtonTxt= ['Join Now','Unsubscribe'];
  const [subscribeButtonState ,setSubscribeButtonState] = useState({ type: 'success' , title: SubButtonTxt[0] });
  const { loadCourseDetails,
    loadingStatus,
    courseError,
    courseDetails } = useContext(CourseContext);
  const {lastwatch} = useContext(CourseStatusContext);
  
    // const [courseContent ,setCourseContent]=useState();
    // const [courseActivity,setCourseActivity] =useState();
    var courseContent=courseDetails?.courseEntity;
    var courseActivity =courseDetails?.activityStatus;
    var subscription = {
      subscriptionId:courseDetails?.subscriptionID,
      subscriptionStatus : courseDetails?.subscriptionStatus
    }

    const {
      createSubscription,
      removeSubscription,
      SubscriptionResponse, 
      subscriptionError } = useSubscription();
      
      console.log("content ------------> " ,courseContent);
      console.log("subscription ------------> " ,subscription);
      console.log("subscription response ------------> " ,SubscriptionResponse);
      
      const location = useLocation();
      const navigate = useNavigate();
      
      useEffect(() => {
        console.log("loading course details........");
        loadCourseDetails();
        // toggleSubscriptionButton();
      }, [SubscriptionResponse]);
      

      // const toggleSubscriptionButton = useCallback
      useEffect(()=>{
        console.log("into subscription button change ----------> ",subscription);
        if (subscription?.subscriptionStatus === "Active"){
          setSubscribeButtonState((prev)=>{
            return{ 
              ...prev,
              type : 'danger',
              title: SubButtonTxt[1]
            }});
          }
          else{
            setSubscribeButtonState((prev)=>{
              return{ 
                ...prev,
                type : 'success',
                title: SubButtonTxt[0]
              }});
            }
          } , [courseDetails]);
          
          
          const subscriptionClickHandler = async( ) => {
            
            subscription?.subscriptionStatus === "Active"
            ? 
            await removeSubscription(subscription.subscriptionId)
            :
            await createSubscription(courseId);
          
            
            console.log(" subscription clicked............");
          }

          const startwatch =()=>{
            const videoId = lastwatch() || courseContent.modules[0].lectures[0].id;
            console.log(videoId);
            return videoId;
          }
          const resumeonClickHandler = ()=>{
            console.log("resume :", startwatch());
            navigate(location.pathname.replace(/\/[^\/]*$/,`/video-leacture/${startwatch()}`));
          }

  return (

    loadingStatus === "errored" ?
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
              display: "flex",
              flex: "3",
              flexDirection: "row",
            }}
          >
            <Card.Body
              style={{
                flex: "8"
              }}
            >
              <Card.Title>
                <h1>{courseContent?.name}</h1>
              </Card.Title>
              <Card.Text>{courseContent?.description}</Card.Text>
              
              {subscription?.subscriptionStatus === "Active" 
              && 
              <Button
               style={{ flex: "1", alignSelf: "start", marginTop: "5%", marginRight: "5%" }}
              onClick={resumeonClickHandler}
              >
                {lastwatch()!== undefined ? 'Resume Learning': 'Start Learning'}
                </Button>
              }
            </Card.Body>
              
            <Button
              variant={subscribeButtonState?.type}
              style={{ flex: "1", alignSelf: "start", marginTop: "5%", marginRight: "5%" }}
              onClick={subscriptionClickHandler}
            >{subscribeButtonState?.title}</Button>
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
                defaultActiveKey="modules"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="modules" title="Modules">
                  <ModuleSpace modules={courseContent?.modules} />

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
            <Image
            src={ ProfileIcon}
            roundedCircle
            style={{ width: '100px', height: '100px' }}
          />
          <p>Author details :</p>
          <p>ratings</p>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default CourseDetailsPage;
