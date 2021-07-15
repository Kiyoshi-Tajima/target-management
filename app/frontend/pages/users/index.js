import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { any } from "prop-types";
import axios from "axios";
import UsersList from "./UsersList";
import { useHistory } from "react-router";
import LogoutButton from "../../components/LogoutButton";

const Users = () => {
  const {control, handleSubmit} = useForm();
  const [usersResult, setUsersResult] = useState([]);
  const [searchResult, setSearchResult] = useState('検索してください。');
  const history = useHistory();

  const doSearch = async (data) => {
    
    const url = "/api/users";
    const searchJSON = `{"params": ${JSON.stringify(data)}}`
    
    await axios.get(url, JSON.parse(searchJSON))
    .then(
      (response) => {
        setUsersResult(response.data.users);
      }
    ).catch(
      (error) => {
        if (error.response.status === 404 ) {
          // エラーメッセージを取得
          setSearchResult('検索結果がなしよー');
          setUsersResult([]);
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // 検索項目などはいっぱいあったりするかもなので
  // formでまとめてやる(React Hook Form)
  return (
    <main>
      <h1>ユーザ一覧</h1>
      <LogoutButton />
      <form onSubmit={handleSubmit(doSearch)}>
        <Controller
          name="userName"
          control={control}
          defaultValue=""
          render={
            function render ({ field:{ value, onChange } }) {
              return (
                <TextField
                  label="ユーザ名"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                />
              );             
            }
          }
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={
            function render ({ field:{ value, onChange } }) {
              return (
                <TextField
                  style={{marginLeft: "30px"}}
                  label="メールアドレス"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                />
              );             
            }
          }
        />
        <br/>
        <br/>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          検索
        </Button>
        <Button 
          type="button"
          variant="contained" 
          color="secondary"
          onClick={() => { history.push("/users/new") }}
        >
          新規作成
        </Button>
      </form>
      <br/>
      {
        usersResult.length === 0 ?
        <div>{searchResult}</div>
        :
        <UsersList users={usersResult} />
      }
    </main>
  );
}
// 何故かTSが邪魔しているので
Users.propTypes = {
  field: any,
  fieldState: any
}

export default React.memo(Users);
