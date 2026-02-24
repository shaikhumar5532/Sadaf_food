import { useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setSelectedCategory
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const menuItems = [
    { path: "/products", label: "Products" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
    { path: "/company", label: "About" }
  ];

  return (
    <div style={styles.navbar}>
      <div style={styles.leftGroup}>
        <div
          style={styles.logoContainer}
          onClick={() => {
            setSelectedCategory("All");
            navigate("/");
          }}
        >
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>
            SADAF<span style={{ color: "#ff4d4d" }}>food</span>
          </span>
        </div>

        <div style={styles.menu}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                style={styles.menuItem}
                onClick={() => navigate(item.path)}
              >
                <span
                  style={{
                    ...styles.menuText,
                    color: isActive ? "#ff4d4d" : "#333"
                  }}
                >
                  {item.label}
                </span>

                <div
                  style={{
                    ...styles.underline,
                    transform: isActive
                      ? "scaleX(1)"
                      : "scaleX(0)"
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.right}>
        {!isLoggedIn ? (
          <>
            <button
              style={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              style={styles.signupBtn}
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </>
        ) : (
          <button
            style={styles.logoutBtn}
            onClick={() => {
              setIsLoggedIn(false);
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.85)",
    borderBottom: "1px solid rgba(0,0,0,0.05)"
  },

  leftGroup: {
    display: "flex",
    gap: 40,
    alignItems: "center"
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer"
  },

  logoImage: {
    height: 42,
    width: 42,
    borderRadius: "50%"
  },

  logoText: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 1
  },

  menu: {
    display: "flex",
    gap: 30
  },

  menuItem: {
    cursor: "pointer",
    position: "relative"
  },

  menuText: {
    fontSize: 15,
    fontWeight: 500,
    transition: "0.3s ease"
  },

  underline: {
    height: 2,
    background: "#ff4d4d",
    position: "absolute",
    bottom: -6,
    left: 0,
    width: "100%",
    transformOrigin: "left",
    transition: "transform 0.3s ease"
  },

  right: {
    display: "flex",
    gap: 14
  },

  loginBtn: {
    padding: "8px 18px",
    borderRadius: 30,
    border: "1px solid #ff4d4d",
    background: "transparent",
    color: "#ff4d4d",
    cursor: "pointer",
    transition: "0.3s"
  },

  signupBtn: {
    padding: "8px 20px",
    borderRadius: 30,
    border: "none",
    background: "linear-gradient(135deg, #ff4d4d, #ff1a1a)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(255,77,77,0.4)",
    transition: "0.3s"
  },

  logoutBtn: {
    padding: "8px 20px",
    borderRadius: 30,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer"
  }
};