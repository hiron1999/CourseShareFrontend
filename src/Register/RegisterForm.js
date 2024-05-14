import React, { useState,useContext,useEffect } from "react";
import { Form,Button, Alert } from "react-bootstrap";
import useRegister from "../Hooks/useRegister";
import AuthContext from "../Context/Auth/AuthProvider";

const RegisterForm =(props)=>{
    const[email,setEmail]=useState('');
    const[name,setName]=useState('');
    const[pwd,setPwd]=useState('');
    const[conPwd,setConPwd]=useState('');
    const{register,registerResponse,loadingStatus}=useRegister(name,email,pwd);
    const [showPassword, setShowPassword] = useState(false);
    

    const isPwdMatched = ()=>{
      return (pwd === conPwd);
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      
      register();
      setConPwd('');
      setEmail('');
      setPwd('');
      
      
    }
    useEffect(()=>{
      props.updateTitle("Create Account")
    },[]);

    console.log("Register Res : ",registerResponse);

    const registerSuccess= <h1>{registerResponse}</h1>;
    const registerFailed= <><h1>Failed to register</h1><p style={{color: "red"}}>{registerResponse}</p></>;

    return(

      loadingStatus === "loading" ?
     <h1>Loading.........</h1>
     : 
      registerResponse ?
     registerSuccess
      :
        
        <Form  onSubmit={submitHandler} >
      <Form.Group className="mb-3" controlId="formUserName">
      <Form.Label>User name</Form.Label>
        <Form.Control 
          type="name" 
          placeholder="Enter name"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          required
           />
        </Form.Group>    
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

      <Form.Group className="mb-3" >
      
          <Form.Control
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Check
            type="checkbox"
            id="showPasswordCheckbox"
            label="Show Password"
            className="ms-2"
            onChange={() => setShowPassword(!showPassword)}
            checked={showPassword}
            
          />
          </div>
          
          
        
      <Form.Label>Confirm Password</Form.Label>
        <Form.Control
         type="password" 
         placeholder="Re-enter password" 
         onChange={(e)=>setConPwd(e.target.value)}
         value={conPwd}
         isInvalid = { !isPwdMatched()}
         required
         />
         <Form.Control.Feedback type="invalid">Password not matched</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isPwdMatched()}>
        Register
      </Button>
    </Form>
      
    );
} 

export default RegisterForm;