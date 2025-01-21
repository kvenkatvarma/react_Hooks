import React,{useState,useEffect} from "react"
let Login=()=>{
    var [email,setEmail] = useState("");
    var [password,setPassword] = useState("");
   
    //executes on initial render and also if state gets updated it will execute
    useEffect(()=>{
        console.log("render");
    });
    
    //executes on initial render and also if the email or password gets updated then it will execute
    useEffect(()=>{
        console.log("render1");
    },[email,password]);

    //executes only once on initial render and equal to componentDidMount
    useEffect(()=>{
        console.log("render2");
    },[]);

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