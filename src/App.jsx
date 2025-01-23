import React, { useState,useReducer } from "react";
import Login from "./Login";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductsList from "./ProductsList";

let initialUser ={  
    isLoggedIn:false,
    currentUserId:null,
    currentUserName:null,
    currentUserRole : null  
};
let reducer =(state,action)=>{
  switch(action.type)
  {
    case "login":
   return {isLoggedIn:true,currentUserId:action.payload.currentUserId,
    currentUserName:action.payload.currentUserName,currentUserRole : action.payload.currentUserRole
   };
   case "logout":
    return {   isLoggedIn:false,
      currentUserId:null,
      currentUserName:null,
      currentUserRole : null 
    };
    default: return state;
  }
 return state;
};
function App(){
 
 let[user,dispatch] = useReducer(reducer,initialUser);

  return (  
  <UserContext.Provider value ={{user,dispatch}}>
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