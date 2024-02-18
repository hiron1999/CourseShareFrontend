import logo from "./logo.svg";
import "./App.css";
import Dasboard from "./UI/Dashboard";
import { Course } from "./Course/Course";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import HeaderNav from "./UI/HeaderNav";
import { Fragment } from "react";
import OverlayPortal from "./UI/OverlayPortal";
import LoginModal from "./Login/LoginModal";

function App() {
  const [courses, setCourses] = useState([]);
  const [theme, setTheme] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const theme_mode = [ "dark" , "light"];
  

  const temeCangehandler = () => {
    setTheme(!theme);
    const mode=theme ? theme_mode.at(0) : theme_mode.at(1);
    console.log(mode);
    document.documentElement.setAttribute("data-bs-theme", mode);
  };
  

  const loadCourseContent = () => {
    fetch("http://127.0.0.1:8080/content-service/course/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        // console.log(courses);
      })
      .catch((error) => console.log(error));
  };

  useEffect(loadCourseContent, []);


  const loginShowHandler =(isShowing)=>{
    setShowLogin(isShowing);
    
  }
  console.log("login trigger from singup ="+showLogin);

  console.log("running app");
  return (
    <Fragment>
       {/* <OverlayPortal> */}
        <LoginModal
        render = {showLogin}
        onShowLogin ={loginShowHandler}
        
        />
        {/* </OverlayPortal> */}
       
      <HeaderNav 
      onModeChange={temeCangehandler}
      onShowLogin ={loginShowHandler}
      isDarkMode={theme}
      />
      <Dasboard>
        {courses.map((data) => (
          <Course
            key={data.id}
            title={data.name}
            desc={data.description}
            autor={data.autor}
          />
        ))}
      </Dasboard>
    </Fragment>
  );
}

export default App;
