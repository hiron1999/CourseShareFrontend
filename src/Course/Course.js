import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import  ButtonIcon from "../Icons/button-start-now.svg"
export const Course = (props) => {
  const navigate = useNavigate();
  const buttonclickhandler = ()=>{
    navigate(`/course/${props.courseId}/details`);
  }
  return (
    <Card style={{ width: "18rem" }} >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Header>

        <Card.Title>{props.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {props.desc}
        </Card.Text>
        <Card.Subtitle>Autor : {props.author}</Card.Subtitle>
        
      </Card.Body>
      <Card.Footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1
      }}
      >
        
        {/* <Link to={`/course/${props.courseId}/details`}>
          <Image src={ButtonIcon} 
          
          style={{height:'20px',backgroundColor: "transparent"}}/>
        </Link> */}
        <Button variant="outline-info"
        onClick={buttonclickhandler}>
          Start Now
        </Button>
       
      </Card.Footer>
    </Card>
  );
};
