import { useState, useEffect } from "react";
import logo from "./assets/logo.png";

const heroSlides = [
  "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1705335834319-92a152363ea1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1710421576768-ff985fa63b60?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
];

const categories = [
  { 
    name: "Makhana", 
    image: "https://images.unsplash.com/photo-1710421576768-ff985fa63b60?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0" 
  },
  { 
    name: "Lichi", 
    image: "https://images.unsplash.com/photo-1705335834319-92a152363ea1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl0Y2hpfGVufDB8fDB8fHww" 
  },
  {
    name: "Fish",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Vegetable",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=60",
  },
];

export default function LandingPage({
  goToProducts,
  isLoggedIn,
  setIsLoggedIn,
  setPage,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* HERO — SLIDER with LOGO + AUTH */}
      <section
        style={{
          ...styles.hero,
          backgroundImage: `url(${heroSlides[index]})`,
        }}
      >
        <div style={styles.heroOverlay} />

        {/* 🔥 TOP BAR NOW INSIDE HERO */}
        <div style={styles.heroTopBar}>
          <div style={styles.left}>
            <img src={logo} alt="logo" style={styles.logo} />
            <span style={styles.brand}>SADAFfood</span>
          </div>

          <div style={styles.right}>
            {!isLoggedIn ? (
              <>
                <button style={styles.ghostBtn} onClick={() => setPage("login")}>
                  Login
                </button>

                <button
                  style={styles.primaryBtn}
                  onClick={() => setPage("signup")}
                >
                  Create account
                </button>
              </>
            ) : (
              <button
                style={styles.ghostBtn}
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

        {/* MAIN HERO CONTENT */}
        <div style={styles.heroContent}>
          <h1 style={styles.heading}>
            Groceries delivered fast
            <br />
            fresh, clean & affordable
          </h1>

          <p style={styles.text}>
            Order makhana, vegetables, fish & more — straight to your doorstep.
          </p>

          <div style={styles.searchRow}>
            <input placeholder="Enter your location" style={styles.input} />

            <input
              placeholder="Search items like makhana, fish, snacks…"
              style={styles.input}
            />

            <button style={styles.primaryBtn} onClick={goToProducts}>
              Search →
            </button>
          </div>
        </div>

        {/* SLIDER DOTS */}
        <div style={styles.dots}>
          {heroSlides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              style={{ ...styles.dot, opacity: index === i ? 1 : 0.4 }}
            />
          ))}
        </div>
      </section>

      {/* PROMO CARDS */}
      <h2 style={styles.offerHeading}>Special Offers & Deals</h2>

      <section style={styles.cards}>
        <div style={{ ...styles.card, background: "#fff7ed" }}>
          <h3 style={styles.cardTitle}>Makhana Deals</h3>
          <p>UP TO 40% OFF</p>
          <button style={styles.cardAction} onClick={goToProducts}>
            Shop now →
          </button>
        </div>

        <div style={{ ...styles.card, background: "#ecfeff" }}>
          <h3 style={styles.cardTitle}>Litchi Deals</h3>
          <p>UP TO 40% OFF</p>
          <button style={styles.cardAction} onClick={goToProducts}>
            Shop now →
          </button>
        </div>

        <div style={{ ...styles.card, background: "#f0fdf4" }}>
          <h3 style={styles.cardTitle}>Fresh Fish Deals</h3>
          <p>UP TO 40% OFF</p>
          <button style={styles.cardAction} onClick={goToProducts}>
            Shop now →
          </button>
        </div>

        <div style={{ ...styles.card, background: "#f0fdf4" }}>
          <h3 style={styles.cardTitle}>Vegetables Deals</h3>
          <p>UP TO 40% OFF</p>
          <button style={styles.cardAction} onClick={goToProducts}>
            Shop now →
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.foodSection}>
        <h2 style={styles.foodHeading}>Shop our best options</h2>

        <div style={styles.foodGrid}>
          {categories.map((c) => (
            <div
              key={c.name}
              style={{
                ...styles.foodCard,
                backgroundImage: `url(${c.image})`,
              }}
              onClick={goToProducts}
            >
              <div style={styles.foodOverlay}>
                <p style={styles.foodName}>{c.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #0c3b2e)",
    color: "#fff",
  },

  /* HERO */
  hero: {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "0 80px",
    transition: "background-image .7s ease-in-out",
    boxSizing: "border-box",
  },

  /* blending bottom + left + right */
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(180deg, rgba(15,23,42,0) 60%, rgba(15,23,42,.95) 100%),
      linear-gradient(90deg, rgba(15,23,42,.85) 0%, rgba(15,23,42,.15) 25%, rgba(0,0,0,0) 45%),
      linear-gradient(-90deg, rgba(15,23,42,.85) 0%, rgba(15,23,42,.15) 25%, rgba(0,0,0,0) 45%)
    `,
  },

  /* NEW — hero header inside hero */
  heroTopBar: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    padding: "0 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 3,
  },

  left: { display: "flex", gap: 10, alignItems: "center" },

  logo: {
    width: 40,
    height: 40,
    background: "#fff",
    borderRadius: 10,
    objectFit: "contain",
    padding: 5,
  },

  brand: { fontSize: 20, fontWeight: 900 },

  right: { display: "flex", gap: 10 },

  ghostBtn: {
    padding: "8px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.4)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  primaryBtn: {
    padding: "9px 16px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#4ade80,#22c55e)",
    color: "#000",
    fontWeight: 700,
    cursor: "pointer",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 900,
  },

  heading: { fontSize: 44, fontWeight: 900 },
  text: { opacity: 0.9, marginBottom: 24 },

  searchRow: { display: "flex", gap: 10, maxWidth: 900 },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 12,
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
  },

  dots: {
    position: "absolute",
    bottom: 26,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 10,
    zIndex: 3,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#fff",
    cursor: "pointer",
  },

  offerHeading: {
    fontSize: 26,
    fontWeight: 800,
    margin: "30px 80px 10px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    padding: "0 80px 50px",
  },

  card: {
    padding: 22,
    borderRadius: 22,
    color: "#000",
  },

  cardTitle: { fontWeight: 800 },

  cardAction: {
    marginTop: 10,
    border: "none",
    padding: "8px 12px",
    borderRadius: 10,
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },

  /* SHOP OUR BEST OPTIONS — now aligned with offers */
  foodSection: { padding: "0 80px 50px" },

  foodHeading: { fontSize: 24, fontWeight: 800, marginBottom: 16 },

  foodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 22,
  },

  foodCard: {
    height: 240,
    borderRadius: 18,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  },

  foodOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 90%)",
    display: "flex",
    alignItems: "flex-end",
    padding: 14,
  },

  foodName: { fontWeight: 800, color: "#fff" },
};
