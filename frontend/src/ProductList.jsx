import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Product Listing</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() =>
              onSelectProduct && onSelectProduct(product)
            }
            style={{
              ...styles.card,
              cursor: onSelectProduct ? "pointer" : "default",
            }}
          >
            <div style={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300";
                }}
                style={styles.image}
              />
            </div>

            <div style={styles.cardBody}>
              <h4 style={styles.title}>{product.name}</h4>

              <span style={styles.category}>
                {product.category}
              </span>

              <p style={styles.price}>₹ {product.price}</p>

              <p style={styles.desc}>
                {product.description?.slice(0, 60)}...
              </p>

              <button style={styles.btn}>
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "5px 60px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: "28px",
    color: "#1b5e20",
  },
  subheading: {
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 25,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  imageWrapper: {
    height: 190,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  cardBody: {
    padding: 18,
  },
  title: {
    margin: "5px 0",
    fontSize: "18px",
    color: "#222",
  },
  category: {
    display: "inline-block",
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 20,
    background: "#e8f5e9",
    color: "#2e7d32",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
    margin: "8px 0",
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 14,
  },
  btn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: 8,
    background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
