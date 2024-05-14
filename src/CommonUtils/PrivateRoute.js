import { useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginProvider";
import { useContext, useEffect } from "react";
import React from "react";

const PrivateRoute = ({ component : Component }) => {

    const {isLoggin ,showModal, setShowModal} =useContext(LoginContext);
    
    
    // useEffect (()=>{
    //     if(!setShowModal){
    //         console.log("going vack to previous page ------------------");
    //         nevigate ? nevigate(-1) : nevigate("");
    //     }

    // },[showModal]);

    return (
        <React.Fragment>
       { !isLoggin ? setShowModal(true)
        : 
        <Component />
       }
        
        </React.Fragment>
    );
};

export default PrivateRoute;