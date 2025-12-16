import logo from "./assets/logo.png";

export default function Navbar({ isLoggedIn, setIsLoggedIn, setPage }) {
  return (
    <div style={styles.navbar}>
      
      {/* LEFT: Logo + Brand */}
      <div style={styles.left} onClick={() => setPage("products")}>
        <img src={logo} alt="SFPPL Logo" style={styles.logoImage} />
        <span style={styles.logoText}>SADAF<span style={{ color: "#00e676" }}>food</span></span>
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
  );
}

const styles = {
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

  /* LEFT */
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },
  logoImage: {
    height: "38px",
    width: "38px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "4px"
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "1px"
  },

  /* CENTER */
  center: {
    display: "flex",
    alignItems: "center",
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: "30px",
    overflow: "hidden"
  },
  search: {
    flex: 1,
    padding: "10px 16px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },
  searchBtn: {
    backgroundColor: "#00e676",
    border: "none",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: "16px"
  },

  /* RIGHT */
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  loginBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #00e676",
    background: "transparent",
    color: "#00e676",
    cursor: "pointer",
    fontWeight: "500"
  },
  signupBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#00e676",
    color: "#000",
    cursor: "pointer",
    fontWeight: "600"
  },
  logoutBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#ff5252",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  }
};
