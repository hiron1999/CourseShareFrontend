import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import  ButtonIcon from "../Icons/button-start-now.svg"
export const Course = (props) => {
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
      <Card.Footer>
      
        <Link to={`/course/${props.courseId}/details`}>
          <Image src={ButtonIcon} 
          
          style={{height:'20px',backgroundColor: "transparent"}}/>
        </Link>
        
       
      </Card.Footer>
    </Card>
  );
};
