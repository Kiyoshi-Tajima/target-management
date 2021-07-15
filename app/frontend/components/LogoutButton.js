import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import axios from "axios";

const LogoutButton = () => {
  const history = useHistory();
  const url = "/api/logout";

  const doSignOut = async () => {
    await axios.post(url)
    .then(
      () => {
        // ログイン画面に遷移
        history.push('/');
      }
    ).catch(
      () => {
        // エラーになってもとりあえずログイン画面に遷移させる
        history.push('/');
      }
    );
  }  
  
  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      onClick={() => doSignOut()}
    >
      ログアウト
    </Button>
  );
}

export default React.memo(LogoutButton);
