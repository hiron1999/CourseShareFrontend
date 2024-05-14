import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState,useContext } from "react";
import LoginContext from "../Context/LoginProvider";
import { useNavigate, useLocation } from "react-router-dom";


const LoginModal = (props) => {
  const {showModal,setShowModal,SetFromControl,isLoggin}=useContext(LoginContext);
  const [modalTitle, setModalTitle] = useState("");
  const nevigate =useNavigate();
  const location = useLocation();

  const handleClose = () => {
   if(!isLoggin){ 

      try { const referrerHostname = new URL(document.referrer).hostname;
        const currentHostname = window.location.hostname;
        if (referrerHostname === currentHostname) {
          
          nevigate(-1);
        }
        else{
          nevigate("");
        } 
      }catch (error){
        console.log(error);
        nevigate("");
      }
    }
    setShowModal(false);
    SetFromControl("login");
  };
  // const handleShow = () => {
  //   setShow(true);
  //   console.log("showing modal");
  // };

  const updateTitle = (title) => {
    setModalTitle(title);
  };

  const child = React.Children.only(props.children);
  // Clone the child element and pass additional props
  const childWithProps = React.cloneElement(child, { updateTitle });

  console.log("getting vaue from app -->" + props.render);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Routes updateTitle={updateTitle}>
          <Route 
          path="" 
          element={<LoginForm updateTitle={updateTitle} />} />

          <Route
            path="/register"
            element={<RegisterForm updateTitle={updateTitle} />}
          />
        </Routes> */}
        {childWithProps}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
