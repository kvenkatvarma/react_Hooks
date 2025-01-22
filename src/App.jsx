import React, { useState } from "react";
import Login from "./Login";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";

function App(){
  let[user,setUser]=useState({
    isLoggedIn:false,
    currentUserId:null,
    currentUserName:null
  });
  return (  
  <UserContext.Provider value ={{user,setUser}}>
      <HashRouter>
        <NavBar/>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />   
        <Route component={NoMatchPage} />
      </Switch>
    </HashRouter>
</UserContext.Provider>
  );
}

export default App;