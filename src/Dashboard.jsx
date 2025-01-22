import React,{useEffect,useContext,useState} from "react";
import { UserContext } from "./UserContext";
import Orders from "./Order";
import {OrderService,ProductsService} from "./Service";

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
         let productsResponse = await ProductsService.getProducts();
         if(productsResponse.ok)
         {
            let prodbody =  await productsResponse.json();
            body.forEach((order)=>{
               console.log("Processing order:", order); // Log the order
               console.log("Processing prodbody:", prodbody); // Log the order
              order.product = ProductsService.getProductByProductId(prodbody,order.productId) ;
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
                <span className="badge badge-info">{OrderService.getpreviousOrders(orders).length}</span>
                </h4>
                {OrderService.getpreviousOrders(orders).length == 0 ? (<div className="text-danger">No Orders</div>):("") }
                {OrderService.getpreviousOrders(orders).map((ord)=>{
                  return <Orders key={ord.id} orderId ={ord.id} productId = {ord.productId} userId = {ord.userId} isPaymentCompleted = {ord.isPaymentCompleted} quantity = {ord.quantity}
                  productName = {ord.product.productName} price={ord.product.price}/>
                })}
              </div>

              <div className="col-lg-6">
                <h4 className="py-2 my-2 text-primary border-bottom border-primary"><i className="fa fa-shopping-cart"></i> Cart{" "} 
                <span className="badge badge-primary">{OrderService.getCart(orders).length}</span>
                </h4>
                {OrderService.getCart(orders).length == 0 ? (<div className="text-danger">No Products in cart</div>):("") }
                {OrderService.getCart(orders).map((ord)=>{
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