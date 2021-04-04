import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginFrom";

const Login = () => {

  return (
    <main>
      <h1>ログイン</h1>
      <Link to="/menu">メニューへ</Link>
      <LoginForm />
    </main>
  );
}

export default Login;
