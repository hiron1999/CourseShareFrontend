import { Navbar, Container, Button, ToggleButton } from "react-bootstrap";
import React from "react";
import { useState ,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginContext from "../Context/LoginProvider";
import useRefresh from "../Hooks/useRefresh";
import NavSearch from "./NavSearch";

const HeaderNav = (props) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isLoginClick, setLoginClick] = useState(false);
  const {setShowModal,isLoggin}=useContext(LoginContext);
  
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
          <Navbar.Brand href="/courseshare">
            {/* <Link to={""}> */}
            <h1 >CourseShare</h1>
            {/* </Link> */}
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <NavSearch/>
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
          {isLoggin === true ?
            <Navbar.Text>
              <Link to="/profile">
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
              </Link>
            </Navbar.Text>
            :
            <Button className="primary" onClick={loginPrompthandler}>
              Sing up
            </Button>
            }
            {/* <Button
            onClick={refresh}
            >refresh</Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderNav;
