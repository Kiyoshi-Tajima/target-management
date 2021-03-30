import React, {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
// childe component
import Form from "./form";

const Login = () => {

  // useState
  // コンポーネントのstate変数の宣言
  // 初期値は引数に設定した0が設定される[count]
  // stateの変更については[setCount]を使用する
  const [count, setCount] = useState(0);

  // useEffect
  // (再)描画時に作用する'did mount'
  // コンポーネントが消えるときは'did unmount'のファンクションは着火する
  useEffect(() => {
    console.log('did mount!!');
    return (() => {  
      console.log('did unmount!');
    });
  });

  // どれぐらい再レンダリングされるかチェック
  console.log("login rendring");

  return (
    <div>
      <div>Login</div>
      <br/>
      <input type="button" value="count up!"
        onClick={() => setCount(count + 1)}
      />
      <br/>
      <h1 style={{color: "red"}}>{count}</h1>
      <Link to="/top">Top</Link>
      <Form />
    </div>    
  );
}

export default Login;
