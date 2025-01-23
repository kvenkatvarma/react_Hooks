import React,{useEffect,useContext,useState,useCallback} from "react";
import { UserContext } from "./UserContext";
import Orders from "./Order";
import {OrderService,ProductsService} from "./Service";

function Dashboard(){
   let userContext = useContext(UserContext);
   let [showOrderDeletedAlert,setShowOrderDeletedAlert]= useState(false);
   let [showOrderPlacedAlert,setShowORderPlacedAlert]= useState(false);

useEffect(()=>{
      document.title ="Dashboard-eCommerce";  
      loadDataFromDatabase();
   },[userContext.user.currentUserId]);


   const loadDataFromDatabase = useCallback(async () => {
     
        // Fetch request for orders
        let response = await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`, { method: "GET" });
        
        if (response.ok) {
          let body = await response.json();
          
          // Fetch products
          let productsResponse = await ProductsService.getProducts();
          if (productsResponse.ok) {
            let prodbody = await productsResponse.json();
            
            // Loop through the orders and assign products
            body.forEach((order) => {
              console.log("Processing order:", order);  // Log the order
              console.log("Processing prodbody:", prodbody);  // Log the products
              
              // Get the product based on productId and assign it to order.product
              order.product = ProductsService.getProductByProductId(prodbody, order.productId);
            });
            
            // After processing the orders, update the state
            setOrders(body);
          } else {
            console.error("Failed to fetch products");
          }
        } else {
          console.error("Failed to fetch orders");
        }
      
    },[userContext.user.currentUserId]);
  let[orders,setOrders] = useState([]); 
 
  //buy now click
  let onBuyNowClick =useCallback(async(orderId,userId,productId,quantity)=>{
    if(window.confirm("Do you want to place order for this product"))
    {
       let updateOrder ={
         id:orderId,productId:productId,userId:userId,quantity:quantity,isPaymentCompleted:true
       };
       let orderResponse = await fetch(`http://localhost:5000/orders/${orderId}`,{method:"PUT",body:JSON.stringify(updateOrder),headers:{
         "Content-type":"application/json"
       }});
       let orderResponseBody = await orderResponse.json();
       if(orderResponse.ok){
         console.log(orderResponseBody);
         loadDataFromDatabase();
         setShowORderPlacedAlert(true);
       }
    }
  },[loadDataFromDatabase]);

  //Delete button logic
  let onDeleteclick =useCallback(async(orderId)=>{
   if(window.confirm("Are you sure to delete this item from cart?"))
   {
      let orderResponse = await fetch(`http://localhost:5000/orders/${orderId}`,{method:"DELETE"});
      if(orderResponse.ok)
      {
         let orderResponseBody = await orderResponse.json();
         setShowOrderDeletedAlert(true);
         loadDataFromDatabase();
      }
   }
  },[loadDataFromDatabase]);
    return (
         <div className="row">
            <div className="col-12 py-3 header">
                   <h4><i className="fa fa-dashboard"></i> Dashboard{" "} <button className="btn btn-sm btn-info" onClick={loadDataFromDatabase   }><i className="fa fa-refresh"></i>Refresh</button></h4>
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
                  productName = {ord.product.productName} price={ord.product.price} onBuyNowClick={onBuyNowClick} onDeleteclick={onDeleteclick}/>
                })}
              </div>

              <div className="col-lg-6">
                <h4 className="py-2 my-2 text-primary border-bottom border-primary"><i className="fa fa-shopping-cart"></i> Cart{" "} 
                <span className="badge badge-primary">{OrderService.getCart(orders).length}</span>
                </h4>
                {showOrderPlacedAlert ? 
                 <div className="col-12">
                <div className="alert alert-success alert-dismissible fade show mt-1" role="alert">Your order has been placed successfully
                  <button className="close" type="button" data-dismiss="alert">
                     <span>&times;</span>
                  </button>
                </div></div> : "" }

                {showOrderDeletedAlert ? 
                  <div className="col-12">
                <div className="alert alert-danger alert-dismissible fade show mt-1" role="alert">Your item has been removed from the cart
                  <button className="close" type="button" data-dismiss="alert">
                     <span>&times;</span>
                  </button>
                </div> </div> : "" }

                {OrderService.getCart(orders).length == 0 ? (<div className="text-danger">No Products in cart</div>):("") }
                {OrderService.getCart(orders).map((ord)=>{
                  return <Orders key={ord.id} orderId ={ord.id} productId = {ord.productId} userId = {ord.userId} isPaymentCompleted = {ord.isPaymentCompleted} quantity = {ord.quantity}
                  productName = {ord.product.productName} price={ord.product.price} onBuyNowClick={onBuyNowClick} onDeleteclick={onDeleteclick}/>
                })}
              </div>

              </div>
            </div>
         </div>
    );    
}
export default Dashboard;