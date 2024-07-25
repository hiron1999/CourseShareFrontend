import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CatalogContext from "../Context/CatalogProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        <Form inline className="me-3"  onSubmit={searchhandeller}>
        <Row>
          <Col md="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={key}
              onChange={(e)=>setkey(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" 
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}  
            >
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            </Button>
          </Col>
        </Row>
      </Form>
    );
}

export default NavSearch;