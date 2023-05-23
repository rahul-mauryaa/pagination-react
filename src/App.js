import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productList, setProductList] = useState([]);
  const [page,setPage] = useState(1);
  console.log(productList, "productList");
  const fetch_product = async () => {
    const get_product = await fetch("https://dummyjson.com/products?limit=100");
    const data = await get_product.json();
    if (data && data.products) {

      setProductList(data.products);
    }
  };


  const selectedPage = (selected) =>{
    if(selected >=1 && selected <= productList.length/10)
    setPage(selected);
  }

  useEffect(() => {
    fetch_product();
  }, []);

  return (
    <div className="App">
      {productList.length > 0 && (
        <div className="products">
          {productList.slice(page * 10 - 10,page * 10).map((prod) => {
            return (
              <span className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}  

      {productList.length > 0 && <div className="pagination">
      <span onClick={() => selectedPage(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
            {[...Array(productList.length / 10)].map((_,i)=>{
                return <span className={(page === i+1)?"pageselected":''} onClick={()=>selectedPage(i+1)}>{i+1}</span>
            })}
           <span onClick={()=>selectedPage(page + 1)} className={page < productList.length / 10 ? "" : "pagination__disable"}>▶</span>
        </div>}
    </div>
  );
}

export default App;
