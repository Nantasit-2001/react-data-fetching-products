import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:4001/products')
      .then(response => {
        console.log('ข้อมูลจากเซิร์ฟเวอร์:', response.data);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        setError('ไม่สามารถดึงข้อมูลสินค้าได้');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:4001/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการลบ:', error);
        setError('ไม่สามารถลบสินค้าได้');
        setLoading(false);
      });
  };

  if (loading) return <div>กำลังโหลด...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} style={{ marginBottom: '20px' }}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <img src={product.image} alt={product.name} width="100" />
            <p>{product.description}</p>
            <button onClick={() => deleteProduct(product.id)}>x</button>
          </div>
        ))
      ) : (
        <p>ไม่มีสินค้าในรายการ</p>
      )}
    </div>
  );
}

export default App;