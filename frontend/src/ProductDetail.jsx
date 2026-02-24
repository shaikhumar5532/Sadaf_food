import { useState } from "react";
import axios from "axios";

export default function ProductDetail({ product, onBack, isLoggedIn }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const updateProduct = async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        form
      );
      alert("✅ Product updated successfully");
      setEditMode(false);
    } catch {
      alert("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      alert("🗑 Product deleted");
      onBack();
    } catch {
      alert("❌ Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    alert("🛒 Added to cart!");
  };

  const handleBuyNow = () => {
    alert("⚡ Proceeding to checkout...");
  };

  return (
    <div style={styles.page}>
      {/* ================= PRODUCT CARD ================= */}
      <div style={styles.card}>
        {/* IMAGE SECTION */}
        <div style={styles.imageBox}>
          <img
            src={form.image}
            alt={form.name}
            onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
            style={styles.image}
          />
        </div>

        {/* DETAILS SECTION */}
        <div style={styles.details}>
          {editMode ? (
            <>
              <h2>Edit Product</h2>

              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label style={styles.label}>Category</label>
              <input
                style={styles.input}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />

              <label style={styles.label}>Image URL</label>
              <input
                style={styles.input}
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />

              <label style={styles.label}>Price (₹)</label>
              <input
                style={styles.input}
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <label style={styles.label}>Description</label>
              <textarea
                style={styles.textarea}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div style={styles.actionRow}>
                <button
                  style={styles.primaryBtn}
                  onClick={updateProduct}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 style={styles.title}>{form.name}</h1>
              <p style={styles.category}>{form.category}</p>
              <p style={styles.price}>₹ {form.price}</p>
              <p style={styles.description}>{form.description}</p>

              <div style={styles.buySection}>
                <button style={styles.cartBtn} onClick={handleAddToCart}>
                  🛒 Add to Cart
                </button>
                <button style={styles.buyBtn} onClick={handleBuyNow}>
                  ⚡ Buy Now
                </button>
              </div>

              {isLoggedIn && (
                <div style={styles.actionRow}>
                  <button
                    style={styles.primaryBtn}
                    onClick={() => setEditMode(true)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    style={styles.dangerBtn}
                    onClick={deleteProduct}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "🗑 Delete"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= WHY CHOOSE SECTION ================= */}
      <div style={styles.featureSection}>
        <h2 style={styles.featureTitle}>Why Choose Our Product?</h2>

        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.icon}></div>
            <h4>Premium Quality</h4>
            <p>Carefully selected and quality tested items.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}></div>
            <h4>Fast Delivery</h4>
            <p>Quick and reliable shipping.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}></div>
            <h4>Secure Payment</h4>
            <p>100% safe and secure checkout.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}></div>
            <h4>Easy Returns</h4>
            <p>Hassle-free return policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh"
  },

  card: {
    display: "flex",
    gap: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: 1100,
    margin: "auto"
  },

  imageBox: { flex: 1 },

  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    borderRadius: 10
  },

  details: { flex: 1.2 },

  title: { fontSize: 32, marginBottom: 5 },

  category: {
    color: "#000",
    fontWeight: 600,
    marginBottom: 10
  },

  price: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 15
  },

  description: {
    lineHeight: 1.6,
    color: "#444",
    marginBottom: 20
  },

  buySection: {
    display: "flex",
    gap: 15,
    marginBottom: 25
  },

  cartBtn: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 22px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  buyBtn: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "12px 22px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  featureSection: {
    marginTop: 60,
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto"
  },

  featureTitle: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 600
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20
  },

  featureCard: {
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
  },

  icon: {
    fontSize: 28,
    marginBottom: 10
  }
};