import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from '../components/SignIn/SignIn';
import Navbar from '../components/Navbar/Navbar';
const SignIn = () => {
  return (
    <>
    <Navbar/>
    <SignInForm/>
    
    </>
  )
}

export default SignIn


