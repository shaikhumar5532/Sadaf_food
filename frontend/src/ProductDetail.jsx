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
    } catch (err) {
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
    } catch (err) {
      alert("❌ Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <button onClick={onBack} style={styles.backBtn}>← Back to Products</button>

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
                <button style={styles.primaryBtn} onClick={updateProduct} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button style={styles.secondaryBtn} onClick={() => setEditMode(false)}>
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

              {isLoggedIn && (
                <div style={styles.actionRow}>
                  <button style={styles.primaryBtn} onClick={() => setEditMode(true)}>
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
  backBtn: {
    marginBottom: 20,
    background: "none",
    border: "none",
    color: "#2c7a2c",
    fontSize: 16,
    cursor: "pointer"
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
  imageBox: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    borderRadius: 10
  },
  details: {
    flex: 1.2
  },
  title: {
    fontSize: 32,
    marginBottom: 5
  },
  category: {
    color: "#2c7a2c",
    fontWeight: 600,
    marginBottom: 10
  },
  price: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 15
  },
  description: {
    lineHeight: 1.6,
    color: "#444"
  },
  label: {
    fontWeight: 600,
    marginTop: 10
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  textarea: {
    width: "100%",
    minHeight: 120,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  actionRow: {
    display: "flex",
    gap: 12,
    marginTop: 20
  },
  primaryBtn: {
    backgroundColor: "#2c7a2c",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  secondaryBtn: {
    backgroundColor: "#eee",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  dangerBtn: {
    backgroundColor: "#e53935",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};
