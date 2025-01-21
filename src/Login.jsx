import React,{useState} from "react"
let Login=()=>{
    var [email,setEmail] = useState("abc@email.com");
    var [password,setPassword] = useState("Abc123");
   
    return <div className="row">
    <div className="col-lg-5 col-md-7 mx-auto">
      <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
              <h4 style={{fontSize:"40px"}} className="text-success text-center">Login</h4>
          </div>
          <div className="card-body border-bottom border-success">
              <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="text" className="form-control" id="email" name="email" value={email} onChange={(event)=>{setEmail(event.target.value);}} placeholder="Email"></input>
              </div>
              <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" className="form-control" name="password" value={password} onChange={(event)=>{setPassword(event.target.value);}} id="password" placeholder="Password"></input>
              </div>
          </div>
          
      </div>
    </div>
</div> 
};
export default Login;