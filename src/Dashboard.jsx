import React,{useEffect,useContext,useState} from "react";
import { UserContext } from "./UserContext";
import Orders from "./Order";

let previousOrders =(orders)=>{
  return orders.filter(ord=>ord.isPaymentCompleted === true);
};
let getCart =(orders)=>{
   return orders.filter(ord=>ord.isPaymentCompleted === false);
 };
function Dashboard(){
   let userContext = useContext(UserContext);
useEffect(()=>{
      document.title ="Dashboard-eCommerce";  
      (async()=>{
         //fetch request
        let response = await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,{method:"GET"});
        if(response.ok)
        {
         let body = await response.json();
        

         //get products
         let productsResponse = await fetch(`http://localhost:5000/products`,{method:"GET"});
         if(productsResponse.ok)
         {
            let prodbody =  await productsResponse.json();
            body.forEach((order)=>{
              order.product = prodbody.find((prod)=>prod.id == order.productId);
            })
            setOrders(body);
         }
         
        }
      })(

      );
   },[userContext.user.currentUserId]);

  let[orders,setOrders] = useState([]); 
 

    return (
         <div className="row">
            <div className="col-12 py-3 header">
                   <h4><i className="fa fa-dashboard"></i> Dashboard</h4>
            </div>
            <div className="col-12">
             
             <div className="row">            
              <div className="col-lg-6">
                <h4 className="py-2 my-2 text-info border-bottom border-info"><i className="fa fa-history"></i> Pevious Orders{" "}
                <span className="badge badge-info">{previousOrders(orders).length}</span>
                </h4>
                {previousOrders(orders).length == 0 ? (<div className="text-danger">No Orders</div>):("") }
                {previousOrders(orders).map((ord)=>{
                  return <Orders key={ord.id} orderId ={ord.id} productId = {ord.productId} userId = {ord.userId} isPaymentCompleted = {ord.isPaymentCompleted} quantity = {ord.quantity}
                  productName = {ord.product.productName} price={ord.product.price}/>
                })}
              </div>

              <div className="col-lg-6">
                <h4 className="py-2 my-2 text-primary border-bottom border-primary"><i className="fa fa-shopping-cart"></i> Cart{" "} 
                <span className="badge badge-primary">{getCart(orders).length}</span>
                </h4>
                {getCart(orders).length == 0 ? (<div className="text-danger">No Products in cart</div>):("") }
                {getCart(orders).map((ord)=>{
                  return <Orders key={ord.id} orderId ={ord.id} productId = {ord.productId} userId = {ord.userId} isPaymentCompleted = {ord.isPaymentCompleted} quantity = {ord.quantity}
                  productName = {ord.product.productName} price={ord.product.price}/>
                })}
              </div>

              </div>
            </div>
         </div>
    );    
}
export default Dashboard;