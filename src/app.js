import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

// pages
import Login from "./pages/login"; 
import Top from "./pages/top";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/top" component={Top} />
      </Switch>
    </HashRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);