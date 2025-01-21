import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
let NavBar=()=>{
    return <nav className="navbar navbar-expand-lg navbar-dark  bg-dark navbar-style">
    <div className="container-fluid">
      <a className="navbar-brand" href="/#">eCommerce</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" activeClassName="active"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li>
            <li>
            <NavLink className="nav-link" to="/" activeClassName="active" exact={true}>Login</NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>
          </li>
          </ul>
         <div style={{marginRight:100}}>
            <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user-circle"></i>User
                    </a>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/#">Logout</a></li>
                  
                    </ul>
                </li>
            </ul>
         </div>
         
       
       
      
      </div>
    </div>
  </nav>
}
export default NavBar;