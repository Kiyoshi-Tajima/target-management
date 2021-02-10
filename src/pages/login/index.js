import React from "react";
import { Link } from "react-router-dom";
// childe component
import Form from "./form";

const Login = () => {
  return (
    <div>
      <div>Login</div>      
      <Link to="/top">Top</Link>
      <Form />
    </div>
    
  );
}

export default Login;
