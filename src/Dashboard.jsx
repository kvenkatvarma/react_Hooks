import React,{useEffect,useContext} from "react";
import { UserContext } from "./UserContext";
function Dashboard(){

      useEffect(()=>{
           document.title ="Dashboard-eCommerce";
          
        },[]);
        let userContext = useContext(UserContext);
    return (
         <div>
            <h1>Dashboard</h1>
         </div>
    );    
}
export default Dashboard;