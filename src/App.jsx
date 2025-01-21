import React from "react";
import Login from "./Login";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import NavBar from "./NavBar";
function App(){
  return   <HashRouter>
    <NavBar/>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />   
    <Route component={NoMatchPage} />
  </Switch>
</HashRouter>
}

export default App;