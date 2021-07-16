import React, { useRef, useReducer } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router";
import { getErrorCondition, getErroMessage} from "../../common/error"

// stateの初期値
const initialState  = {
  errors: {
    loginId: "",
    password: "",
    invalid: ""
  },
  loading: false,
  fatal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        fatal: false,
        loading: false
      };
    case 'LOADING':
      // ココでエラーメッセージの初期化を行う
      return {
        ...state,
        errors: {
          loginId: "",
          password: "",
          invalid: "",
        },
        loading: true,
        fatal: false,
      };
    case 'ERROR':
      return {
        ...state,
        errors: {
          loginId: action.payload.loginId,
          password: action.payload.password,
          invalid: action.payload.invalid
        },
        fatal: action.payload.fatal,
        loading: false,
      };
    default:
      return state; 
  }
};

const LoginForm = () => {

  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  // LOGINボタン押下時アクション
  const doSignIn = async () => {
    const url = '/api/login';
    // ローディング状態にする
    // 画面にマスクとか、ここでstateの初期化とか
    dispatch({ type: 'LOADING' });

    await axios.post(url, {
      loginId: loginIdRef.current.value,
      password: passwordRef.current.value,
    }).then(
      () => {
        // LOADINGでマスクをかけたあと解除したい場合とか
        // 成功後に何かしたい場合
        dispatch({ type: 'SUCCESS' });
        // menu画面に遷移
        history.push('/menu');
      }
    ).catch(
      (error) => {
        if (error.response.status === 400 || error.response.status === 404 ) {
          // エラーメッセージを取得
          const errors = error.response.data.errors;
          dispatch({ type: 'ERROR', payload: errors });
        } else {
          // その他はサーバサイドエラーとしてしまう。
          dispatch({ type: 'ERROR', payload: {fatal: true} });
        }
      }
    );
  }

  return (
    <form >
      <TextField 
        required
        inputRef={loginIdRef}
        label="ログインID"
        variant="outlined"
        error={getErrorCondition(state.errors, "loginId")}
        helperText={getErroMessage(state.errors, "loginId")}
      />
      <br/>
      <br/>
      <TextField
        required
        label="パスワード"
        type="password"
        autoComplete="current-password"
        inputRef={passwordRef}
        variant="outlined"
        error={getErrorCondition(state.errors, "password")}
        helperText={getErroMessage(state.errors, "password")}
      />
      <br/>
      <h2>
        {state.fatal === true ? 
          <span style={{color: 'red'}}>サーバサイドでエラーが発生しました。</span>
          :
          getErrorCondition(state.errors, 'invalid') ? 
          <span style={{color: 'red'}}>{getErroMessage(state.errors, 'invalid')}</span>
          :
          <span>ログインしてください。</span>
        }
      </h2>
      <Button 
        type="button" 
        variant="contained" 
        color="secondary"
        onClick={() => doSignIn()}
      >
        ログイン
      </Button>

    </form>
  );
}

export default React.memo(LoginForm);
