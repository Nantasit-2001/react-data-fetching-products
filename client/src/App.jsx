import "./App.css";
import axios from "axios";
import { useState,useEffect } from "react";

function App() {
  const [productData,setProductData] = useState([])
  
  useEffect(()=>{getProductData();},[]);

  async function getProductData (){
    const response = await axios.get("http://localhost:4001/products")
    setProductData(response.data.data);
    console.log(response.data.data)
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productData.map(objProductData=>{return(
        
        <div className="product" key={objProductData.id}>
          <div className="product-preview">
            <img
              src={objProductData.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
              <div className="product-detail">
                <h1>{objProductData.name}</h1>
                <h2>{objProductData.price}</h2>
                <p>{objProductData.description}</p>
              </div>
              <button className="delete-button">x</button> 
        </div>
      
      )})}
      </div>
    </div>
  );
}

export default App;
