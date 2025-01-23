import React, { useState } from "react";
import Login from "./Login";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductsList from "./ProductsList";

function App(){
  let[user,setUser]=useState({
    isLoggedIn:false,
    currentUserId:null,
    currentUserName:null,
    currentUserRole : null
  });
  return (  
  <UserContext.Provider value ={{user,setUser}}>
      <HashRouter>
        <NavBar/>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/store" component={Store} />
        <Route path="/products" component={ProductsList} />

        <Route component={NoMatchPage} />
      </Switch>
    </HashRouter>
</UserContext.Provider>
  );
}

export default App;