import React,{useState,useEffect} from "react";
import {ProductsService,CategoryService,BrandsService} from "./Service";
function ProductsList(props){
    let [search,setSearch] = useState("");
    let [products,setProducts] = useState([]);
   

    useEffect(()=>{
        (async()=>{
            let brandsService = await BrandsService.fetchBrands();
            let brandsbody = await brandsService.json();

            let categoryService = await CategoryService.fetchCategories();
            let categorybody = await categoryService.json();


           let productsResponse = await fetch(`http://localhost:5000/products?productName_like=${search}`,{method:"GET"});
           let body = await productsResponse.json();
            
           body.forEach(product=>{
               product.category= CategoryService.getCategoryByCategoryId(categorybody,product.categoryId);
               product.brand= BrandsService.getBrandByBrandId(brandsbody,product.brandId);

           });

           setProducts(body);
        })();
        
    },[search]);
  return <div className="row">
       <div className="col-12">
        <div className="row p-3 header">
              <div className="col-lg-3">
                  <h4>
                    <i className="fa fa-suitcase"></i>Products {" "}
                    <span className="badge badge-secondary">{products.length}</span>
                  </h4>
              </div>
              <div className="col-lg-9">
                   <input type="search" placeholder="Search" className="form-control" autoFocus value={search} onChange={(event)=>{
                          setSearch(event.target.value);
                   }}></input>
              </div>
        </div>
       </div>
       <div className="col-lg-10 mx-auto mb-2">
          <div className="card my-2 shadow">
             <div className="card-body">
                 <table className="table">
                   <thead>
                       <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Rating</th>
                       </tr>
                   </thead>
                   <tbody>
                       {products.map(product=>{
                         return <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brand.brandName}</td>
                                    <td>{product.category.categoryName}</td>
                                    <td>
                                        {[...Array(product.rating).keys()].map(n=>(
                                        <i className="fa fa-star text-warning" key={n}></i>
                                    ))}
                                    
                                    {[...Array(5-product.rating).keys()].map(n=>(
                                        <i className="fa fa-star-o text-warning" key={n}></i>
                                    ))}
                                    </td>
                              </tr>
                       })}
                   </tbody>
                 </table>
             </div>
          </div>
       </div>
  </div>
}
export default ProductsList;