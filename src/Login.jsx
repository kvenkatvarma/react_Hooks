import React,{useState,useEffect,useContext} from "react"
import { useHistory } from 'react-router-dom';
import { UserContext } from "./UserContext";
let Login=()=>{
  const history = useHistory();  
    var [email,setEmail] = useState("");
    var [password,setPassword] = useState("");
   
    let userContext = useContext(UserContext);
   
    let[dirty,setDirty] =useState({
      email:false,
      password:false,
    });
    let[errors,setErrors]=useState({
      email:[],
      password:[]
    })
    //executes on initial render and also if state gets updated it will execute
    useEffect(()=>{
       // console.log("render");
    });
    
    //executes on initial render and also if the email or password gets updated then it will execute
    useEffect(()=>{
      //  console.log("render1");
    },[email]);

    //executes only once on initial render and equal to componentDidMount
    useEffect(()=>{
       document.title ="Login-eCommerce";
    },[]);
//It is similar to component unmounting phase
    useEffect(()=>{
      return ()=>{
        console.log("Component unmounting phase");
      };
    },[]);

    let[loginMessage,setLoginMessage] = useState("");

    let validate =()=>{
        let errorsData =[];
        errorsData.email = [];
        if(!email){
          errorsData.email.push("Email cannot be blank");
        }

        errorsData.password = [];
        if(!password){
          errorsData.password.push("Password cannot be blank");
        }
        setErrors(errorsData);
    };

    useEffect(validate,[email,password]);

    let onLoginClick =async ()=>{
      let dirtyData = dirty;
      Object.keys(dirty).forEach((control)=>{
         dirtyData[control] = true;
      });
      setDirty(dirtyData);
      validate();
      if(isValid())
      {
        let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`,{method:"GET"});
        if(response.ok)
        {
          let body =await response.json();
          if(body.length > 0)
          {
            userContext.setUser({
               ...userContext.user, isLoggedIn:true,
               currentUserName:body[0].fullName,
               currentUserId:body[0].id,
            });
           history.replace("/dashboard");
          }
          else
          {
            setLoginMessage(<span className="text-danger">Invalid Login, please try again</span>)
          }
        }
        else
          {
            setLoginMessage(<span className="text-danger">unable to connect to server</span>)
          }
      }

    };
    let isValid =()=>{
      let valid = true;
      for(let control in errors)
      {
          if(errors[control].length > 0 )
          {
              valid = false;
          }
      }
      return valid;
  }
    return <div className="row">
    <div className="col-lg-5 col-md-7 mx-auto">
      <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
              <h4 style={{fontSize:"40px"}} className="text-success text-center">Login</h4>
          </div>
          <div className="card-body border-bottom border-success">
              <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="text" className="form-control" id="email" name="email" value={email} onChange={(event)=>{setEmail(event.target.value);}} placeholder="Email"
                   onBlur={()=>{
                    setDirty({...dirty,email:true});
                    validate();
                   }}></input>
                   <div className="text-danger">{dirty["email"] && errors["email"][0]?errors["email"]:""}</div>
              </div>
              <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" className="form-control" name="password" value={password} onChange={(event)=>{setPassword(event.target.value);}}   onBlur={()=>{
                    setDirty({...dirty,password:true});
                    validate();
                   }} id="password" placeholder="Password"></input>
                        <div className="text-danger">{dirty["password"] && errors["password"][0]?errors["password"]:""}</div>
              </div>
          </div>
          <div className="card-footer text-center">
            <div className="m-1">
               {loginMessage}
            </div>
            <button className="btn btn-success m-2" onClick={onLoginClick}>Login</button>
          </div>
      </div>
    </div>
</div> 
};
export default Login;