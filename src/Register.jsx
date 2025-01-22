import React,{useState,useEffect,useContext} from "react";
import { UserContext } from "./UserContext";
import { useHistory } from 'react-router-dom';
let Register =()=>{
  const history = useHistory();  
 let[state,setState]=useState({
  email:"",password:"",fullName:"",dateOfBirth:"",gender:"",country:"",
  receiveNewsLetters:"",
 });

 let[countries] =useState([
    {id:1,countryName:"India"},
    {id:2,countryName:"USA"},
    {id:3,countryName:"UK"},
    {id:4,countryName:"Japan"},
    {id:5,countryName:"Brazil"},
    {id:6,countryName:"Australia"}
]);

let[errors,setErrors]=useState({
    email:[],
    password:[],
    fullName:[],
    dateOfBirth:[],
    gender:[],
    country:[],
    receiveNewsLetters:[]
})
let userContext = useContext(UserContext);
let[dirty,setDirty]=useState({
    email:false,
    password:false,
    fullName:false,
    dateOfBirth:false,
    gender:false,
    country:false,
    receiveNewsLetters:false
})
let[message,setMessgae]=useState("");
let validate=()=>{
    let errorsData = {};
    //email
    errorsData.email = [];
    if(!state.email)
    {
        errorsData.email.push("Email Cannot be blank");
    }

    errorsData.password = [];
    if(!state.password)
    {
        errorsData.password.push("password Cannot be blank");
    }

    errorsData.fullName = [];
    if(!state.fullName)
    {
        errorsData.fullName.push("FullName Cannot be blank");
    }

    errorsData.dateOfBirth = [];
    if(!state.dateOfBirth)
    {
        errorsData.dateOfBirth.push("Date of Birth Cannot be blank");
    }

    errorsData.gender = [];
    if(!state.gender)
    {
        errorsData.gender.push("Gender Cannot be blank");
    }

    errorsData.country = [];
    if(!state.country)
    {
        errorsData.country.push("Country Cannot be blank");
    }
   
    setErrors(errorsData)
}
useEffect(()=>{
    document.title ="Register-eCommerce";
},[]);

useEffect(validate,[state]);

let onRegisterClick =async ()=>{
 let dirtyData = dirty;
 Object.keys(dirty).forEach((control)=>{
    dirtyData[control] = true
 });
 setDirty(dirtyData);
 validate();
 if(isValid())
 {
   
   let response = await fetch("http://localhost:5000/users",{method:"POST",body: JSON.stringify({email:state.email,password:state.password,fullName:state.fullName,dateOfBirth:state.dateOfBirth,gender:state.gender,country:state.country,receiveNewsLetters:state.receiveNewsLetters}),headers:{
    "Content-type":"applicstion/json"
   }});
   if(response.ok)
   {
    let body = await response.json();
    userContext.setUser({
        ...userContext.user, isLoggedIn:true,
        currentUserName:body.fullName,
        currentUserId:body.id,
     });
    setMessgae(<span className="text-success">Success</span>);
    history.replace("/dashboard");
   }
 }
 else{
    setMessgae(<span className="text-danger">Errors</span>)

 }
}
let isValid =()=>{
    let valid = true;
    console.log("Errors:", errors);
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
    <div className="col-lg-6 mx-auto">
        <div className="card border-primary shadow my-2">
            <div className="card-header border-bottom border-primary">
               <h4 style={{fontSize:"40px"}} className="text-primary text-center">Register</h4>
               <ul className="text-danger">
                {Object.keys(errors).map((control)=>{
                    if(dirty[control])
                    {
                        return errors[control].map((err)=>{
                            return <li key={err}>{err}</li>
                        })
                    }
                    else
                    {
                        return "";
                    }
                })}
               </ul>
            </div>
            <div className="card-body border-bottom">
                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="email">Email</label>
                    <div className="col-lg-8">
                        <input type="text" name="email" id="email" className="form-control" value={state.email} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                        <div className="text-danger">
                            {dirty["email"] && errors["email"][0] ? errors["email"]: ""}
                        </div>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="password">Password</label>
                    <div className="col-lg-8">
                        <input type="password" id="password" name="password" className="form-control" value={state.password} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                         <div className="text-danger">
                            {dirty["password"] && errors["password"][0] ? errors["password"]: ""}
                        </div>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="fullName">Full Name</label>
                    <div className="col-lg-8">
                        <input type="text" id="fullName" name="fullName" className="form-control" value={state.fullName} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                         <div className="text-danger">
                            {dirty["fullName"] && errors["fullName"][0] ? errors["fullName"]: ""}
                        </div>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="dateOfBirth">Date Of Birth</label>
                    <div className="col-lg-8">
                        <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" value={state.dateOfBirth} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                         <div className="text-danger">
                            {dirty["dateOfBirth"] && errors["dateOfBirth"][0] ? errors["dateOfBirth"]: ""}
                        </div>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4">Gender</label>
                    <div className="col-lg-8">
                        <div className="form-check">
                        <input type="radio" id="male" name="gender" className="form-check-input" value="male" checked={state.gender === "male"?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                        <label className="form-check-inline" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" id="female" name="gender" className="form-check-input" value="female" checked={state.gender === "female"?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                        <label className="form-check-inline" htmlFor="female">FeMale</label>
                        </div>
                    </div>                    
                </div>
               
                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="country">Country</label>
                    <div className="col-lg-8">
                        <select type="date" id="country" name="country" className="form-control" value={state.country} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}>
                           {countries.map((country)=><option key={country.id} value={country.id}>{country.countryName}</option>)}
                        </select>
                        <div className="text-danger">
                            {dirty["country"] && errors["country"][0] ? errors["country"]: ""}
                        </div>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4"></label>
                    <div className="col-lg-8">
                        <div className="form-check">
                        <input type="checkbox" id="receiveNewsLetters" name="receiveNewsLetters" className="form-check-input" value="true" checked={state.receiveNewsLetters === true ?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.checked});
                        }} onBlur={(event)=>{
                            setDirty({...dirty,[event.target.name]:true});
                            validate();
                        }}></input>
                        <label className="form-check-inline" htmlFor="receiveNewsLetters">Receive News Letters</label>
                        </div>
                     
                    </div>                    
                </div>
               
            </div>
            <div className="card-footer text-center">
                <div className="m-1">{message}</div>
                <div>
                    <button className="btn btn-primary m-2" onClick={onRegisterClick}>Register</button>
                </div>
            </div>
        </div>       
     
        
    </div>
</div>
};
export default Register;