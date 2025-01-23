import React,{useState,useContext, useEffect} from "react";
import { UserContext } from "./UserContext";
import { BrandsService,CategoryService,ProductsService } from "./Service";
import Product from "./Product";
function Store(){
    //get user context
    let userContext = useContext(UserContext);
   let [brands,setBrands] =useState([])
   let [categories,setCategories] =useState([]);
   let [products,setProducts] =useState([]);
   let [productsToShow,setProductsToShow] =useState([]);
   let [search,setSearch] =useState("");

   useEffect(()=>{
     (async()=>{
        //get brands from db
        let brandsResponse = await BrandsService.fetchBrands();

        let brandsResponseBody = await brandsResponse.json();
        brandsResponseBody.forEach((brand)=>{
                brand.isChecked = true;
        });
        setBrands(brandsResponseBody);

         //get categories from db
         let categoriesResponse = await CategoryService.fetchCategories();

         let categoriesResponseBody = await categoriesResponse.json();
         categoriesResponseBody.forEach((category)=>{
                 category.isChecked = true;
         });
         setCategories(categoriesResponseBody);
         //get products

         let productsResponse = await fetch(`http://localhost:5000/products?productName_like=${search}`,{method:"GET"});

         let productsResponseBody = await productsResponse.json();
         if(productsResponse.ok)
         {
            productsResponseBody.forEach((product)=>{
                product.brand = BrandsService.getBrandByBrandId(brandsResponseBody,product.brandId);

                product.category = CategoryService.getCategoryByCategoryId(categoriesResponseBody,product.categoryId);
                product.isOrdered = false;
            });
            setProducts(productsResponseBody);
            setProductsToShow(productsResponseBody);
            document.title = "Store-eCommerce";
         }

     })();
   },[search])

let updateProductsToShow =()=>{
   setProductsToShow(products.filter((prod)=>{
    return (categories.filter((category)=>category.id == prod.categoryId && category.isChecked).length >0);
   }).filter((prod)=>{
    return(
        brands.filter((brand)=>brand.id == prod.brandId && brand.isChecked).length > 0
    )
   }))
};

   let updateBrandIsChecked = (id)=>{
      let brandsData = brands.map((brd)=>{
        if(brd.id == id) brd.isChecked = !brd.isChecked;
        return brd;
      });
      setBrands(brandsData);
      updateProductsToShow();
   };

   let updateCategoryIsChecked = (id)=>{
    let categoryData = categories.map((cat)=>{
        if(cat.id == id) cat.isChecked = !cat.isChecked;
        return cat;
      });
      setCategories(categoryData);
      updateProductsToShow();
   };

   let onAddTocartClick =async(prod)=>{
       (async()=>{
        let newOrder ={
            userId:userContext.user.currentUserId,
            productId:prod.id,
            quantity:1,
            isPaymentCompleted:false
        };
        let orderResponse = await fetch(`http://localhost:5000/orders`,{method:"POST",body:JSON.stringify(newOrder),headers:{"Content-Type":"application/json"},});
        if(orderResponse.ok)
        {
            let body = await orderResponse.json();
            setProducts(prods=>{
               let currentProduct = products.map((p)=> {if(p.id == prod.id)p.isOrdered = true;});
               currentProduct.isOrdered = true;
               return prods;
            });
            updateProductsToShow();
        }
        else
        {
            console.log(orderResponse);
        }
    })();
   };
return (
    <div>
        <div className="row py-3 header">
            <div className="col-lg-3">
                <h4> <i className="fa fa-shopping-bag"></i>Store{" "}
                <span className="badge badge-secondary">{productsToShow.length}</span>
                </h4>
            </div>
            <div className="col-lg-9">
                <input type="search" value={search} placeholder="search" className="form-control" autoFocus onChange={(event)=>{
                  setSearch(event.target.value)
                }}></input>
            </div>
        </div>
        <div className="row">
    <div className="col-lg-3 py-2">
       
        <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
                {brands.map((brand) => {
                    return (
                        <li className="list-group-item" key={brand.id}> {/* Fixed typo: list-group-itemp -> list-group-item */}
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    value="true" 
                                    checked={brand.isChecked} 
                                    onChange={() => {
                                        updateBrandIsChecked(brand.id);
                                    }} 
                                />
                                <label 
                                    className="form-check-label" 
                                    htmlFor={`brand${brand.id}`}
                                >
                                    {brand.brandName}
                                </label>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>

        <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
                {categories.map((category) => {
                    return (
                        <li className="list-group-item" key={category.id}> {/* Fixed typo: list-group-itemp -> list-group-item */}
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    value="true" 
                                    checked={category.isChecked} 
                                    onChange={() => {
                                        updateCategoryIsChecked(category.id);
                                    }} 
                                />
                                <label 
                                    className="form-check-label" 
                                    htmlFor={`category${category.id}`}
                                >
                                    {category.categoryName}
                                </label>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
    <div className="col-lg-9">
        <div className="row">
            {productsToShow.map((prod)=>{
                return <Product key={prod.id} product={prod} onAddTocartClick={onAddTocartClick}/>
            })}
        </div>        
    </div>
</div>
    </div>
);
}
export default Store;