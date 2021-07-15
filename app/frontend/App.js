// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./pages/login";
import Menu from "./pages/menu";
import Users from "./pages/users";
import UserForm from "./pages/users/UserForm";
import Items from "./pages/items";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" >
          <UserForm pageMode="new" />
        </Route>        
        <Route exact path="/users/:id" >
          <UserForm pageMode="show" />
        </Route>
        <Route exact path="/users/:id/edit" >
          <UserForm pageMode="edit" />
        </Route>
        <Route exact path="/items" component={Items} />
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);
