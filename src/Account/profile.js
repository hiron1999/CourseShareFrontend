import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';

const Profile = ({ name, bio,  profilePic }) => {
  const courses=[];
  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Image src={profilePic} alt="Profile Picture" roundedCircle style={{ width: '80px', height: '80px', marginRight: '20px' }} />
          <div>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{bio}</Card.Text>
          </div>
        </div>
        <Card.Subtitle className="mb-2 text-muted">Courses:</Card.Subtitle>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <strong>{course.title}</strong> - {course.description}
            </li>
          ))}
        </ul>
        <Button variant="primary">Edit Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;