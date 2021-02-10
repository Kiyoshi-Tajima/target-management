import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

const Form = () => {
  const [loginId, setLoginId] = useState(null);
  const [password, setPassword] = useState(null);

  console.log(loginId);

  return (
    <div>
      <TextField 
        required 
        id="standard-required" 
        label="ログインID" 
        defaultValue=""
        onChange={e => setLoginId(e.target.value)}
      />
      <br/>
      <TextField
        id="standard-password-input"
        label="パスワード"
        type="password"
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
}

export default Form;
