import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Card.Subtitle>Autor : {props.autor}</Card.Subtitle>
        
      </Card.Body>
      <Card.Footer>
      
        <Link to={`/courseDetails/${props.courseId}`}>
        Start Now
        </Link>
        
        
      </Card.Footer>
    </Card>
  );
};
