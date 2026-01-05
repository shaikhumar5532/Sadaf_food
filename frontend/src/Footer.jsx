export default function Footer({ page }) {
  const footerBackground = page === "landing"
    ? "linear-gradient(135deg, #0f172a, #1e293b, #0c3b2e)"
    : "#0b0b0c";

  return (
    <footer style={{ ...styles.footer, background: footerBackground }}>
      <div style={styles.inner}>
        <div style={styles.col}>
          <h3 style={styles.brand}>SFPPL</h3>
          <p style={styles.muted}>Sadaf Food Processor Pvt. Ltd.</p>
          <p style={styles.mutedSmall}>Delivering quality Makhana, Lichi, Fish & Vegetables.</p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Shop</h4>
          <ul style={styles.linkList}>
            <li>Fresh Vegetables</li>
            <li>Makhana</li>
            <li>Fresh Fish</li>
            <li>Snacks & Dry Fruits</li>
          </ul>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Help</h4>
          <ul style={styles.linkList}>
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div style={styles.colRight}>
          <h4 style={styles.colTitle}>Get Our App</h4>
          <div style={styles.badges}>
            <a href="#" style={styles.badgeLink}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={styles.badge} />
            </a>
            <a href="#" style={styles.badgeLink}>
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={styles.badge} />
            </a>
          </div>

          <div style={styles.socialRow}>
            <a href="#" style={styles.social}>🇫</a>
            <a href="#" style={styles.social}>🇮</a>
            <a href="#" style={styles.social}>🐦</a>
            <a href="#" style={styles.social}>📌</a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <div>© {new Date().getFullYear()} SFPPL. All Rights Reserved.</div>
        <div style={styles.bottomLinks}>Made with ❤️ • Bihar, India</div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0b0b0c",
    color: "#fff",
    marginTop: 0,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 300px",
    gap: 24,
    padding: "40px 60px",
    alignItems: "start",
  },
  col: {
    minWidth: 0,
  },
  colRight: {
    minWidth: 0,
    textAlign: "left",
  },
  brand: {
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 8,
  },
  muted: {
    color: "#cfcfcf",
    margin: "6px 0",
  },
  mutedSmall: { color: "#bdbdbd", fontSize: 13, marginTop: 6 },
  colTitle: {
    color: "#e6ffed",
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 700,
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#d6d6d6",
    lineHeight: 2,
  },
  badges: { display: "flex", gap: 10, marginTop: 6 },
  badge: { height: 40, objectFit: "contain" },
  badgeLink: { display: "inline-block" },
  socialRow: { marginTop: 12, display: "flex", gap: 10 },
  social: {
    display: "inline-flex",
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    textDecoration: "none",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 60px",
    fontSize: 13,
    borderTop: "1px solid rgba(255,255,255,0.04)",
    background: "linear-gradient(180deg, rgba(0,0,0,0.05), transparent)",
  },
  bottomLinks: { color: "#cfcfcf" },
};
