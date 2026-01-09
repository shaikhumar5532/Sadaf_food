import { useState } from "react";
import logo from "./assets/logo.png";

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setPage,
  setSelectedCategory
}) {
  const [active, setActive] = useState("landing");

  const menuItems = [
    // { key: "landing", label: "Home" },
    { key: "company", label: "About" },      // 👈 CompanyDetails Page
    { key: "products", label: "Products" },
    { key: "careers", label: "Careers" },
    { key: "contact", label: "Contact" }
  ];

  return (
    <>
      <div style={styles.navbar}>
        {/* LEFT — LOGO + MENU GROUP */}
        <div style={styles.leftGroup}>
          {/* LOGO */}
          <div
            style={styles.left}
            onClick={() => {
              setSelectedCategory("All");
              setPage("landing");
              setActive("landing");
            }}
          >
            <img src={logo} alt="SFPPL Logo" style={styles.logoImage} />

            <span style={styles.logoText}>
              SADAF<span style={{ color: "#000" }}>food</span>
            </span>
          </div>

          {/* MENU */}
          <div style={styles.menu}>
            {menuItems.map(item => (
              <span
                key={item.key}
                style={{
                  ...styles.menuItem,
                  color: active === item.key ? "#000" : "#222",
                }}
                onClick={() => {
                  setPage(item.key);
                  setActive(item.key);
                }}
                onMouseEnter={(e) =>
                  (e.target.querySelector("div").style.width = "100%")
                }
                onMouseLeave={(e) =>
                  (e.target.querySelector("div").style.width =
                    active === item.key ? "100%" : "0%")
                }
              >
                {item.label}

                <div
                  style={{
                    ...styles.underline,
                    width: active === item.key ? "100%" : "0%",
                  }}
                ></div>
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — AUTH */}
        <div style={styles.right}>
          {!isLoggedIn ? (
            <>
              <button style={styles.loginBtn} onClick={() => setPage("login")}>
                Login
              </button>

              <button style={styles.signupBtn} onClick={() => setPage("signup")}>
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
    </>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "18px 34px",
    position: "sticky",
    top: 0,
    zIndex: 1000,

    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 12px 30px rgba(0,0,0,.12)",

    color: "#000"
  },

  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: 28
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer"
  },

  logoImage: {
    height: 44,
    width: 44,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 12,
    boxShadow: "0 6px 16px rgba(0,0,0,.2)"
  },

  logoText: {
    fontSize: 26,
    fontWeight: 900,
    letterSpacing: 0.6
  },

  menu: {
    display: "flex",
    gap: 36
  },

  menuItem: {
    position: "relative",
    cursor: "pointer",

    fontSize: 20,
    fontWeight: 500,

    opacity: 0.95,
    transition: "0.25s"
  },

  underline: {
    height: 2,
    background: "#000",
    position: "absolute",
    bottom: -4,
    left: 0,
    transition: "0.25s"
  },

  right: {
    display: "flex",
    gap: 10
  },

  loginBtn: {
    padding: "9px 18px",
    borderRadius: 24,
    border: "1px solid #000",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600
  },

  signupBtn: {
    padding: "9px 18px",
    borderRadius: 24,
    border: "1px solid #000",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700
  },

  logoutBtn: {
    padding: "9px 18px",
    borderRadius: 24,
    border: "1px solid #000",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700
  }
};
