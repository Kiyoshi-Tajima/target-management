import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {

  return (
    <main>
      <h1>メニュー</h1>
      <Link to="/">ログインへ</Link>
      <br/>
      <Link to="/items">アイテム一覧</Link>
    </main>
  );
}

export default Menu;
