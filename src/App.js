import logo from "./logo.svg";
import "./App.css";
import Dasboard from "./UI/Dashboard";
import { Course } from "./Course/Course";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import HeaderNav from "./UI/HeaderNav";
import { Fragment } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [theme, setTheme] = useState("light");
  

  const temeCangehandler = (isDarkMode) => {
    const mode=isDarkMode ? "dark" : "light";
    setTheme(mode);
    console.log(theme);
  };
  
  document.documentElement.setAttribute("data-bs-theme", theme);

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
  // useEffect(() => {
  //   document.documentElement.setAttribute('data-theme', theme);
  // }, [theme]);

  console.log("running app");
  return (
    <Fragment>
      <HeaderNav 
      onModeChange={temeCangehandler}
      />
      <Dasboard>
        {/* <Course title='course 1'/>
      <Course title='course 2'/>
      <Course title='course 3'/>
      <Course title='course 4'/>
      <Course title='course 5'/>
      <Course title='course 6'/> */}
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
