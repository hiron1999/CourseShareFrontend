import logo from "./logo.svg";
import "./App.css";
import Dasboard from "./UI/Dashboard";
import { Course } from "./Course/Course";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useContext } from "react";
import HeaderNav from "./UI/HeaderNav";
import { Fragment } from "react";
import OverlayPortal from "./UI/OverlayPortal";
import LoginModal from "./Login/LoginModal";
import LoginForm from "./Login/LoginForm";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./Register/RegisterForm";
import LoginContext from "./Context/LoginProvider";
import ProfileCard from "./Account/ProfileCard";
import CourseDetailsPage from "./Course/CourseDetailsPage";
import ClassRoom from "./Course/ClassRoom";
import { VideoProvider } from "./Context/VideoProvider";
import PrivateRoute from "./CommonUtils/PrivateRoute";
import { CourseProvider } from "./Context/CourseProvider";


function App() {
  const { FormControl } = useContext(LoginContext);
  const [theme, setTheme] = useState(true);
  const theme_mode = ["dark", "light"];

  const temeCangehandler = () => {
    setTheme(!theme);
    const mode = theme ? theme_mode.at(0) : theme_mode.at(1);
    console.log(mode);
    document.documentElement.setAttribute("data-bs-theme", mode);
  };

  

  console.log("running app");
  console.log("form set:",FormControl)
  return (
    <Fragment>
      <LoginModal>
        {FormControl ? (
          FormControl === "register" ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )
        ) : (
          <LoginForm />
        )}
      </LoginModal>

      <HeaderNav onModeChange={temeCangehandler} isDarkMode={theme} />
      <Routes>
        <Route
          path=""
          element={
            <Dasboard/>
          }
        />

        <Route path="/profile" 
        element={ 
          <PrivateRoute
          component={ProfileCard}
          />
          } />
        
        <Route path="/course/:courseId/*"
        element={
          <PrivateRoute
          component={CourseProvider}
          />
        }/>

        
        {/* <Route path="/courseDetails/:courseId"
        element={
          <PrivateRoute
          component={CourseDetailsPage}
          />
          }/>
        
        <Route path="/video-leacture/:video"
        element={
        <VideoProvider>
          <ClassRoom/>
          </VideoProvider>
        }/> */}
      </Routes>
    </Fragment>
  );
}

export default App;
