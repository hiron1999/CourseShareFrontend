import React from "react";
import { Card, Button, Col } from "react-bootstrap";

export const Course = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle>Autor : {props.autor}</Card.Subtitle>
        <Card.Text>
          {props.desc}
        </Card.Text>
        <Button variant="primary">Start Now</Button>
      </Card.Body>
    </Card>
  );
};
