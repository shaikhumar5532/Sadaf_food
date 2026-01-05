import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList({
  selectedCategory = "All",
  onSelectProduct,
  priceRange = { min: "", max: "" },
  selectedPriceRanges = [],
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  // ✅ CATEGORY FILTER
  const filteredProducts = products
    .filter((p) => (selectedCategory === "All" ? true : p.category === selectedCategory))
    .filter((p) => {
      const price = Number(p.price ?? 0);

      // if presets selected, match any preset range
      if (selectedPriceRanges && selectedPriceRanges.length > 0) {
        return selectedPriceRanges.some((r) => {
          const min = Number(r.min || 0);
          const max = r.max === Infinity ? Infinity : Number(r.max);
          return price >= min && price <= max;
        });
      }

      // else use manual min/max
      const min = Number(priceRange.min);
      const max = Number(priceRange.max);

      if (!priceRange.min && !priceRange.max) return true;
      if (priceRange.min && priceRange.max) return price >= min && price <= max;
      if (priceRange.min) return price >= min;
      if (priceRange.max) return price <= max;
      return true;
    });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {selectedCategory === "All"
          ? "All Products"
          : `${selectedCategory} Products`}
      </h2>

      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              ...styles.card,
              cursor: onSelectProduct ? "pointer" : "default",
            }}
            onClick={() =>
              onSelectProduct &&
              onSelectProduct(product)
            }
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "translateY(0)")
            }
          >
            {/* IMAGE */}
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

            {/* CONTENT */}
            <div style={styles.cardBody}>
              <span style={styles.category}>
                {product.category}
              </span>

              <h4 style={styles.title}>
                {product.name}
              </h4>

              <p style={styles.price}>
                ₹ {product.price}
              </p>

              <p style={styles.desc}>
                {product.description?.slice(0, 60)}...
              </p>

              {onSelectProduct && (
                <button style={styles.btn}>
                  View Details →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "28px 48px",
    background: "#f6f8fb",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: 28,
    fontSize: 28,
    color: "#0f172a",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 28,
  },
  card: {
    background: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(16,24,40,0.06)",
    transition: "all 0.28s ease",
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
  category: {
    display: "inline-block",
    fontSize: 12,
    padding: "4px 12px",
    borderRadius: 20,
    background: "#e8f5e9",
    color: "#2e7d32",
    marginBottom: 8,
    fontWeight: 600,
  },
  title: {
    margin: "6px 0",
    fontSize: 18,
    color: "#222",
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: "#166534",
    margin: "6px 0",
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
    borderRadius: 10,
    background:
      "linear-gradient(135deg, #2e7d32, #66bb6a)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
