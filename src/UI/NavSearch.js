import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CatalogContext from "../Context/CatalogProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavSearch = ()=>{

    const {loadCourseContent,
        loadingStatus,
        catalogError,
        courses} =useContext(CatalogContext);
    const [key,setkey]=useState('');
    const navigate =useNavigate();
    const searchhandeller = (e)=>{
        e.preventDefault();
        loadCourseContent(key);

        setkey('');
        navigate("");
    }

    return(
        <Form inline className="me-2"  onSubmit={searchhandeller}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={key}
              onChange={(e)=>setkey(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    );
}

export default NavSearch;