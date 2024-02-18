import React from "react";
import LoginForm from "./LoginForm";
import { Modal,Button } from "react-bootstrap";
import { useState } from "react";

const LoginModal = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    
    setShow(false);
    props.onShowLogin(false);
  }
  const handleShow = () =>{
    setShow(true);
    console.log("showing modal");

  } 
  console.log("getting vaue from app -->"+props.render)
  return (
    <Modal show={props.render} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Login here</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;