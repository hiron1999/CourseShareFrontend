import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Module=(props)=>{
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  console.log("current location: ",location.pathname);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Demo video lectures for each module
  const demoVideoLectures = [
    { title: 'Lecture 1', duration: '10:00' },
    { title: 'Lecture 2', duration: '12:30' },
    { title: 'Lecture 3', duration: '15:45' },
  ];

  return (
    <div>
     <div
      style={{
        display :"flex", 
        justifyContent: 'space-between', 
        alignItems: 'baseline'
         }} >
      <h3 >
        {props.title} 
      </h3>
     
      <Button 
      variant="outline-secondary" 
      onClick={toggleExpand} 
      // style={{
      //   height : '10px',
      //   width : '10px'
      // }}
      size="sm"
      >
       {isExpanded ? '-' : '+'}
        </Button>
      
      </div>
      {isExpanded && (
        
        <div>
          <div
           style={{
                  borderBottom: '2px solid #ccc',
                  
                }}
          ></div>
          <ListGroup variant="flush">
            {props.content?.map((lecture, index) => (
              <ListGroup.Item
              style={{
                borderBottom: '1px solid #ccc',
                paddingBottom: '1px'
              }}
              key={index}>
             <Link to={location.pathname.replace(/\/[^\/]*$/,`/video-leacture/${lecture.id}`)}>
              <p>
                <span>
                <FontAwesomeIcon icon={faPlay} 
                style={{ marginRight: '5px',
                 border: '2px solid',
                  borderRadius: '50%',
                  padding: '2.7px',
                  height: '7px',
                  width : '7px',
                  alignContent: 'center'}} />
                </span>{lecture.title} 
                </p>  
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}

export default Module;