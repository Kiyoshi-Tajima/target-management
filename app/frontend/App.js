// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./components/login"
import Menu from "./components/memu"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);
