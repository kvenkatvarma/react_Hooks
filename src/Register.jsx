import React,{useState,useEffect} from "react";
let Register =()=>{

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

useEffect(()=>{
    document.title ="Register-eCommerce";
},[]);


return <div className="row">
    <div className="col-lg-6 mx-auto">
        <div className="card border-primary shadow my-2">
            <div className="card-header border-bottom border-primary">
               <h4 style={{fontSize:"40px"}} className="text-primary text-center">Register</h4>
            </div>
            <div className="card-body border-bottom">
                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="email">Email</label>
                    <div className="col-lg-8">
                        <input type="text" name="email" id="email" className="form-control" value={state.email} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }}></input>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="password">Password</label>
                    <div className="col-lg-8">
                        <input type="password" id="password" name="password" className="form-control" value={state.password} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }}></input>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="fullName">Full Name</label>
                    <div className="col-lg-8">
                        <input type="text" id="fullName" name="fullName" className="form-control" value={state.fullName} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }}></input>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4" htmlFor="dateOfBirth">Date Of Birth</label>
                    <div className="col-lg-8">
                        <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" value={state.dateOfBirth} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }}></input>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4">Gender</label>
                    <div className="col-lg-8">
                        <div className="form-check">
                        <input type="radio" id="male" name="gender" className="form-check-input" value="male" checked={state.gender === "male"?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
                        }}></input>
                        <label className="form-check-inline" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" id="female" name="gender" className="form-check-input" value="female" checked={state.gender === "female"?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.value});
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
                        }}>
                           {countries.map((country)=><option key={country.id} value={country.id}>{country.countryName}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-group form-row">
                    <label className="col-lg-4"></label>
                    <div className="col-lg-8">
                        <div className="form-check">
                        <input type="checkbox" id="receiveNewsLetters" name="receiveNewsLetters" className="form-check-input" value="true" checked={state.receiveNewsLetters === true ?true:false} onChange={(event)=>{                   
                            setState({...state,[event.target.name]:event.target.checked});
                        }}></input>
                        <label className="form-check-inline" htmlFor="receiveNewsLetters">Receive News Letters</label>
                        </div>
                     
                    </div>                    
                </div>
               
            </div>
        </div>       
     
        
    </div>
</div>
};
export default Register;