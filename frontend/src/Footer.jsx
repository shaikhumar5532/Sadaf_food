export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* LEFT: COMPANY INFO */}
        <div>
          <h3 style={styles.logo}>SFPPL</h3>
          <p style={styles.text}>
            Sadaf Food Processor Pvt. Ltd.<br />
            Delivering quality Makhana, Lichi, Fish & Vegetables.
          </p>
        </div>

        {/* CENTER: PRODUCTS */}
        <div>
          <h4 style={styles.heading}>Our Products</h4>
          <ul style={styles.list}>
            <li>Makhana</li>
            <li>Lichi</li>
            <li>Fresh Fish</li>
            <li>Organic Vegetables</li>
          </ul>
        </div>

        {/* RIGHT: CONTACT */}
        <div>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>
            📍 Bihar, India<br />
            📞 +91 9XXXXXXXXX<br />
            ✉️ info@sfppl.com
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} SFPPL. All Rights Reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #484949ff, #4f5152ff, #878a8bff)",
    color: "#fff",
    marginTop: 50
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 30,
    padding: "40px 60px"
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00e676"
  },
  heading: {
    marginBottom: 10,
    color: "#00e676"
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#ddd"
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: 1.8,
    color: "#ddd"
  },
  bottom: {
    textAlign: "center",
    padding: 15,
    fontSize: 13,
    background: "#434f53ff"
  }
};
