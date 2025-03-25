import "./App.css";
import axios from "axios";
import { useState,useEffect } from "react";

function App() {
  const [productData,setProductData] = useState([])
  const [stateData,setStateData] = useState("Loading . . .")
  useEffect(()=>{getProductData();},[]);

  async function getProductData (){
    try{const response = await axios.get("http://localhost:4001/products3")
    setStateData("complete")
    setProductData(response.data.data);
    console.log(response.data.data)
  }catch(error){
    setStateData("Fetching Error "+ error )
  }
  }
  async function deleteProductData(id) {
    try{
    await axios.delete(`http://localhost:4001/products/${id}`)
    const updateProductData = productData.filter(item=>(item.id !== id))
    setProductData(updateProductData);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {stateData==="complete"? productData.map(objProductData=>{return(
        
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
              <button className="delete-button" onClick={()=>deleteProductData(objProductData.id)}>x</button> 
        </div>
      
      )}):<h1>{stateData}</h1>}
      </div>
    </div>
  );
}

export default App;
