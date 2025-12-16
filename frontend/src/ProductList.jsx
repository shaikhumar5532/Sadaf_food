import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>SFPPL Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20
      }}>
        {products.map(product => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: 15 }}>
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover"
              }}
            />

            <h4>{product.name}</h4>
            <p><b>Category:</b> {product.category}</p>
            <p><b>₹ {product.price}</b></p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
