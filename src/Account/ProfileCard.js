import React, { useContext, useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useUser from '../Hooks/useUser';
import LoginContext from '../Context/LoginProvider';
import useLogout from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ user }) => {
  // Default demo user information
  // const defaultUser = {
  //   name: 'John Doe',
  //   type: 'Demo User',
  //   email: 'johndoe@example.com',
  //   profilePic: 'https://via.placeholder.com/150', // Placeholder image URL
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.'
  // };
  const profileColour=()=> {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    const saturation = 70 + Math.floor(Math.random() * 30); // Saturation between 70% and 100%
    const lightness = 50 + Math.floor(Math.random() * 20); // Lightness between 50% and 70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  const {logout,logoutResponse,error}=useLogout();
  
  // Use user data if provided, otherwise use default demo user
  const {userId}=useContext(LoginContext);
  const {getUser,
    userDetails,
    loadingStatus,
    userError}=useUser(userId);
  const userData = userDetails ;
  const navigate = useNavigate();
  const proceedLogout=()=>{
    logout();
  }
console.log("userid: ",userId);
    useEffect(()=>{
       getUser();
    },[userId]);

    useEffect(()=>{
      logoutResponse === "ok" && navigate("");
    },[logoutResponse]);


  return (
    userError? <h1>{userError}</h1>
    :
    <Card className="shadow-sm">
      <Card.Body
      style={{
        display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
      }}
      >
        
        
          {/* <Image
            src={userData?.profilePic}
            roundedCircle
            style={{ width: '100px', height: '100px' }}
          /> */}
         <div style={{
        backgroundColor: profileColour(),
        color: 'white',
        padding: '20px',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        textTransform: 'uppercase',
      }}
    >
      <h2>{userData?.first_name ? userData.first_name[0] : '?'}</h2>
    </div>

          {/* <FontAwesomeIcon icon={faEdit} className="edit-icon" /> */}
        
        
      </Card.Body>
      <Card.Footer>
      <Card.Title className="text-center mb-2">{userData?.first_name}</Card.Title>
        <Card.Subtitle className="text-center mb-1">{userData?.type}</Card.Subtitle>
        <Card.Text className="text-center mb-1">{userData?.email}</Card.Text>
        <Card.Text className="text-center">{userData?.bio}</Card.Text>
        <Button variant="link"
        onClick={proceedLogout}>log out</Button>
      </Card.Footer>
    </Card>
  );
};

export default ProfileCard;
