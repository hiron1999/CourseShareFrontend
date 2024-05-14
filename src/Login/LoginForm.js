import React, { useState,useContext,useEffect } from "react";
import { Form,Button } from "react-bootstrap";
import useLogin from "../Hooks/useLogin";
import AuthContext from "../Context/Auth/AuthProvider";

import LoginContext from "../Context/LoginProvider";


const LoginForm =(props)=>{
    const[email,setEmail]=useState('');
    const[pwd,setPwd]=useState('');
    const {auth}=useContext(AuthContext);
    const{login,
      loginResponse,
      loadingStatus,}=useLogin(email,pwd);
    const {SetFromControl,isLoggin}=useContext(LoginContext);

    useEffect(()=>{
      props.updateTitle("Login here")
    },[]);

    const submitHandler = (e)=>{
      e.preventDefault();
      login();
      setEmail('');
      setPwd('');
      
    }
    const gotoRegister =(e)=>{
      e.preventDefault();
      SetFromControl("register");
      console.log("triggering register.............")
    }

    console.log("LoginRes : ",loginResponse);
    console.log("auth : ",auth);
    console.log("isloggidin?==",isLoggin);
    const loginSuccess= <h1>{loginResponse}</h1>;
    const loginFailed= <><h1>Failed to Login</h1><p style={{color: "red"}}>{loginResponse}</p></>;

    return(
     loadingStatus === "loading" ?
     <h1>Loading.........</h1>
     : 
      loginResponse ?
      isLoggin ? loginSuccess :loginFailed
      :
      
      
        <Form  onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
           />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
         type="password" 
         placeholder="Password" 
         onChange={(e)=>setPwd(e.target.value)}
         value={pwd}
         required
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
        
        <p>Not having account ? <br/> click here to <a href="#" onClick={gotoRegister} >Register</a></p>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    
    );
} 

export default LoginForm;