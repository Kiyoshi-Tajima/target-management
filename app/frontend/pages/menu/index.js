import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton"

const Menu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  // React側でもログイン状態かチェック
  // 管理者は別メニューが出るようにする
  const menuAuthCheck = async () => {
    const url = "/api/menu_auth"

    await axios.get(url)
    .then(
      (response) => {
        setIsAdmin(response.data.admin);
      }
    ).catch(
      () => {
        // 状態チェックでエラーになった場合も一旦ログイン画面へ
        history.push("/");
      }
    )
  }

  // ランディング(最初の描画時のみ)実施
  useEffect(() => {
    menuAuthCheck();
  },[]);

  return (
    <main>
      <h1>メニュー</h1>
      <Link to="/">ログインへ</Link>
      <br/>
      <Link to="/items">アイテム一覧</Link>
      <br/>
      {
        isAdmin ? 
        <Link to="/users">ユーザ一覧</Link>
        :
        <></>
      }
      <br/>
      <br/>
      <LogoutButton />
    </main>
  );
}

export default Menu;
