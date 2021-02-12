import React, { useRef, useReducer } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router";


// initialize
const initialState  = {
  errors: {
    login: "",
    password: "",
    invalid: ""
  },
  loading: false,
  fatal: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'ERROR':
      return {
        ...state,
        errors: {
          login: action.error_message.login,
          password: action.error_message.password,
          invalid: action.error_message.invalid
        },
        loading: false
      };
    default:
      return state; 
  }
};

// ここでは入力フォームをちょっと作ります。
// useStateは使わずにuseRefとuseReducerを使ってみます。
const Form = () => {
  // refで設定したDOMノードの参照を作成出来る
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const hoge = async () => {
    const url = '/api/login';
    // ローディング状態にする
    dispatch({ type: 'LOADING' });
    // この時点での入力値のログ
    console.log(loginIdRef.current.value);
    console.log(passwordRef.current.value);

    await axios.post(url, {
      loginId: loginIdRef.current.value,
      password: passwordRef.current.value,
    }).then(
      (response) => {
        console.log(response.date);
        // トップ画面に遷移
        history.push('/top');
      }
    ).catch(
      (error) => {
        console.log(error.response.status);
      }
    );
  }

  console.log('login form');

  // 各インプットコンポーネントはmmaterial-uiを使用
  return (
    <form >
      <h1>{state.fatal === false ? 'OK' : 'NG'}</h1>
      <TextField 
        required
        inputRef={loginIdRef}
        label="ログインID"        
      />
      <br/>
      <TextField
        required
        label="パスワード"
        type="password"
        autoComplete="current-password"
        inputRef={passwordRef}
      />
      <br/>
      <br/>
      <Button 
        type="button" 
        variant="contained" 
        color="secondary"
        onClick={() => hoge()}
      >
        Login
      </Button>
    </form>
  );
}

// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(Form);