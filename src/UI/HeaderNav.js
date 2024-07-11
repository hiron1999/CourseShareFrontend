import { Navbar, Container, Button, ToggleButton } from "react-bootstrap";
import React from "react";
import { useState ,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginProvider";

const HeaderNav = (props) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isLoginClick, setLoginClick] = useState(false);
  const {setShowModal}=useContext(LoginContext);
  const navigate =useNavigate()
  const modeCangeHandler = () => {
    // setIsDarkMode(!isDarkMode);
    props.onModeChange();
  };

  const loginPrompthandler = () => {
    
    setShowModal(true);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            {/* <Link to={""}> */}
            <h1 onClick={()=>{navigate("")}}>CourseShare</h1>
            {/* </Link> */}
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <ToggleButton
              type="checkbox"
              className="btn-light me-2"
              variant={props.isDarkMode ? "dark" : "light"}
              checked={props.isDarkMode}
              value="dark"
              onClick={modeCangeHandler}
            >
              <FontAwesomeIcon icon={props.isDarkMode ? faMoon : faSun} />
            </ToggleButton>

            <Button className="primary" onClick={loginPrompthandler}>
              Sing up
            </Button>

            <Navbar.Text>
              <Link to="/profile">
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderNav;
