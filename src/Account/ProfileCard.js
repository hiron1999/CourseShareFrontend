import React, { useContext, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useUser from '../Hooks/useUser';
import LoginContext from '../Context/LoginProvider';

const ProfileCard = ({ user }) => {
  // Default demo user information
  const defaultUser = {
    name: 'John Doe',
    type: 'Demo User',
    email: 'johndoe@example.com',
    profilePic: 'https://via.placeholder.com/150', // Placeholder image URL
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.'
  };

  // Use user data if provided, otherwise use default demo user
  const {userId}=useContext(LoginContext);
  const {getUser,
    userDetails,
    loadingStatus,
    userError}=useUser(userId);
  const userData = userDetails || defaultUser;
    
console.log("userid: ",userId);
    useEffect(()=>{
       getUser();
    },[userId])

  return (
    userError? <h1>{userError}</h1>
    :
    <Card className="shadow-sm">
      <Card.Body>
        <div className="text-center mb-3">
          <Image
            src={userData?.profilePic}
            roundedCircle
            style={{ width: '100px', height: '100px' }}
          />
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
        </div>
        <Card.Title className="text-center mb-2">{userData?.first_name}</Card.Title>
        <Card.Subtitle className="text-center mb-1">{userData?.type}</Card.Subtitle>
        <Card.Text className="text-center mb-1">{userData?.email}</Card.Text>
        <Card.Text className="text-center">{userData?.bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
