import React,{useState,useEffect} from "react";
import {ProductsService,CategoryService,BrandsService,SortService} from "./Service";
function ProductsList(props){
    let [search,setSearch] = useState("");
    let [products,setProducts] = useState([]);
    let [sortBy,setSortBy] = useState("productName");
    let [sortOrder,setSortOrder] =useState("ASC");
    let [originalProducts,setOriginalProducts] = useState([]);

    useEffect(()=>{
        (async()=>{
            let brandsService = await BrandsService.fetchBrands();
            let brandsbody = await brandsService.json();

            let categoryService = await CategoryService.fetchCategories();
            let categorybody = await categoryService.json();


           let productsResponse = await fetch(`http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,{method:"GET"});
           let body = await productsResponse.json();
            
           body.forEach(product=>{
               product.category= CategoryService.getCategoryByCategoryId(categorybody,product.categoryId);
               product.brand= BrandsService.getBrandByBrandId(brandsbody,product.brandId);

           });

           setProducts(body);
           setOriginalProducts(body);
        })();
        
    },[search]);

    let onSortColumnNameClick=(event,colName)=>{
            event.preventDefault();
            setSortBy(colName);
        let negatedSortOrder = sortOrder == "ASC" ? "DESC" :"ASC";
        setSortOrder(negatedSortOrder);
        setProducts(SortService.getSortedArray(originalProducts,colName,negatedSortOrder));
    };
    let getColumnHeader =(columnName,displayName)=>{
 return <React.Fragment>
      <a href="/#" onClick={(event)=>{
                                onSortColumnNameClick(event,columnName);
                        }}>{displayName}</a> {" "}
                        {sortBy == columnName && sortOrder == "ASC" ? (<i className="fa fa-sort-up"></i>):( "")}
                        {sortBy == columnName && sortOrder == "DESC" ? (<i className="fa fa-sort-down"></i>):( "")}
 </React.Fragment>
    };
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
                        <th>
                          {getColumnHeader("productName", "Product Name")}
                        </th>
                        <th>  {getColumnHeader("price", "Price")}</th>
                        <th>  {getColumnHeader("brand", "Brand")}</th>
                        <th>  {getColumnHeader("category", "Category")}</th>
                        <th>  {getColumnHeader("rating", "Rating")}</th>
                       </tr>
                   </thead>
                   <tbody>
                       {products.map(product=>{
                         return <tr key={product.id}>
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