import { Navbar, Container, Button, ToggleButton } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const HeaderNav = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const modeCangeHandler =()=>{
        setIsDarkMode(!isDarkMode);
    };
    props.onModeChange(isDarkMode);

  return (
    <Navbar className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <h1>CourseShare</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ToggleButton
            type="checkbox"
            className="btn-light"
            variant={isDarkMode ? "dark" : "light"}
            checked={isDarkMode}
            value="dark"
            onClick={modeCangeHandler}
          >
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
          </ToggleButton>
          
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Button className="primary">Singup</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
