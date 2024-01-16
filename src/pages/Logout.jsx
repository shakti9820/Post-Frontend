import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
// import styled from "styled-components";
import axios from "axios";
import {getData } from "../utils/apiRoutes";
import { logoutRoute } from "../utils/apiRoutes";
import {Button} from "react-bootstrap"

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {


    const token=localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      
      
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY)
      navigate("/login");
  
  };
  return (
    <Button className="btn btn-danger me-2" onClick={handleClick} >
      <BiPowerOff />
    </Button>
  );
}


