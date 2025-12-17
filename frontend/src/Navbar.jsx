import { useState } from "react";
import logo from "./assets/logo.png";

const categories = [
  "All",
  "Makhana",
  "Lichi",
  "Fish",
  "Vegetable"
];

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setPage,
  setSelectedCategory
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSelectedCategory(cat);
    setPage("products");
  };

  return (
    <>
      {/* 🔷 TOP NAVBAR */}
      <div style={styles.navbar}>
        {/* LEFT: Logo */}
        <div style={styles.left} onClick={() => setPage("products")}>
          <img src={logo} alt="SFPPL Logo" style={styles.logoImage} />
          <span style={styles.logoText}>
            SADAF<span style={{ color: "#00e676" }}>food</span>
          </span>
        </div>

        {/* CENTER: Search */}
        <div style={styles.center}>
          <input
            type="text"
            placeholder="Search makhana, fish, vegetables..."
            style={styles.search}
          />
          <button style={styles.searchBtn}>🔍</button>
        </div>

        {/* RIGHT: Auth */}
        <div style={styles.right}>
          {!isLoggedIn ? (
            <>
              <button
                style={styles.loginBtn}
                onClick={() => setPage("login")}
              >
                Login
              </button>
              <button
                style={styles.signupBtn}
                onClick={() => setPage("signup")}
              >
                Signup
              </button>
            </>
          ) : (
            <button
              style={styles.logoutBtn}
              onClick={() => {
                setIsLoggedIn(false);
                setPage("login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* 🔷 CATEGORY BAR */}
      <div style={styles.categoryBar}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                ...styles.categoryBtn,
                ...(isActive ? styles.activeCategory : {})
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  /* NAVBAR */
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 40px",
    background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer"
  },
  logoImage: {
    height: 38,
    width: 38,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 8
  },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 1
  },

  center: {
    display: "flex",
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: "hidden"
  },
  search: {
    flex: 1,
    padding: "10px 16px",
    border: "none",
    outline: "none",
    fontSize: 14
  },
  searchBtn: {
    backgroundColor: "#00e676",
    border: "none",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: 16
  },

  right: {
    display: "flex",
    gap: 12
  },
  loginBtn: {
    padding: "8px 18px",
    borderRadius: 20,
    border: "1px solid #00e676",
    background: "transparent",
    color: "#00e676",
    cursor: "pointer",
    fontWeight: 500
  },
  signupBtn: {
    padding: "8px 18px",
    borderRadius: 20,
    border: "none",
    backgroundColor: "#00e676",
    cursor: "pointer",
    fontWeight: 600
  },
  logoutBtn: {
    padding: "8px 18px",
    borderRadius: 20,
    border: "none",
    backgroundColor: "#ff5252",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600
  },

  /* CATEGORY BAR */
  categoryBar: {
    display: "flex",
    gap: 14,
    padding: "14px 40px",
    background: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    overflowX: "auto"
  },

  categoryBtn: {
    padding: "10px 20px",
    borderRadius: 30,
    border: "1px solid #dcdcdc",
    background: "#f9f9f9",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.25s ease",
    whiteSpace: "nowrap"
  },

  activeCategory: {
    background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
    color: "#fff",
    border: "none",
    boxShadow: "0 6px 16px rgba(46,125,50,0.35)",
    transform: "scale(1.05)"
  }
};
