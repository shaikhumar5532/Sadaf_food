import { FaCheckCircle } from "react-icons/fa";

export default function CompanyDetails() {
  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>

        {/* VIDEO BACKGROUND */}
        <video autoPlay loop muted playsInline style={styles.videoBg}>
          <source src="/videos/hero3.mp4" type="video/mp4" />
        </video>

        {/* DARK BLUR OVERLAY */}
        <div style={styles.overlay}></div>

        {/* CONTENT */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeading}>ABOUT US</h1>

          <p style={styles.heroMessage}>
            We manufacture high-quality food products with a strong focus on
            hygiene, trust, and long-term value for our customers.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {/* STORY SECTION */}
        <section style={styles.storySection}>
          <div>
            <h2 style={styles.sectionHeading}>Our Story</h2>

            <p style={styles.text}>
              The inception of SADAF FOOD PROCESSORS PRIVATE LIMITED dates back
              to 2012, when the founders recognized the growing need for
              reliable, hygienic and well-processed food products in India.
            </p>

            <p style={styles.text}>
              Over the years, the company has focused on building strong supply
              capabilities, improving production processes and ensuring that
              every product reflects safety, quality and integrity.
            </p>

            <p style={styles.text}>
              Today, the company continues to expand steadily while remaining
              committed to sustainable practices and responsible food
              production.
            </p>
          </div>

          <img
            style={styles.storyImg}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200"
            alt="Company team"
          />
        </section>

        {/* =================== MILESTONE TIMELINE =================== */}
        <section style={styles.timelineWrapper}>
          <h2 style={styles.sectionHeading}>Important milestones for us</h2>

          <div style={styles.timelineLine}></div>

          {[
            {
              year: "2012",
              title: "Company Incorporated",
              text:
                "SADAF Food Processors officially began operations with a focus on quality-driven food manufacturing."
            },
            {
              year: "2016",
              title: "Expansion & Upgrades",
              text:
                "Infrastructure upgraded, production lines expanded and trained workforce introduced to improve efficiency."
            },
            {
              year: "2020",
              title: "Packaged Food Launch",
              text:
                "Introduced packaged food category with improved hygiene, shelf-life and distribution channels."
            },
            {
              year: "2023",
              title: "Automation & Quality",
              text:
                "Adopted better machinery and quality assurance processes to maintain consistency and trust."
            },
            {
              year: "Today",
              highlight: true,
              title: "Growing With Purpose",
              text:
                "Among the leading emerging food processing companies focused on quality, trust and long-term value."
            }
          ].map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.timelineRow,
                flexDirection: index % 2 === 0 ? "row" : "row-reverse"
              }}
            >
              <div style={styles.yearBox}>{item.year}</div>

              <div style={styles.dot}></div>

              <div
                style={{
                  ...styles.timelineCard,
                  ...(item.highlight && {
                    background: "#ffffff",
                    border: "1px solid #000000",
                    color: "#000",
                    boxShadow: "0 15px 35px rgba(0,0,0,.1)"
                  })
                }}
              >
                <h4 style={{ marginBottom: 6, fontWeight: 900 }}>
                  {item.title}
                </h4>

                <p style={styles.text}>{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* WHAT WE OFFER */}
        <section style={styles.offerSection}>
          <img
            style={styles.offerImage}
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
            alt="Food manufacturing"
          />

          <div>
            <h2 style={styles.sectionHeading}>What we offer</h2>

            <p style={styles.text}>
              We focus on manufacturing and delivering food products that meet
              strict safety and quality benchmarks. Our processes ensure hygiene,
              consistency and reliability across all product lines.
            </p>

            <p style={styles.text}>
              Our commitment is to supply affordable and quality-assured food
              that supports households, retailers and distributors.
            </p>

            <button style={styles.btn}>Read more</button>
          </div>
        </section>

        {/* COMPANY PROFILE */}
        <div style={styles.header}>
          <h2 style={styles.title}>Company Profile</h2>

          <div style={styles.status}>
            <FaCheckCircle color="#16a34a" />
            <span>Active Company</span>
          </div>
        </div>

        <section style={styles.card}>
          <p style={styles.text}>
            SADAF FOOD PROCESSORS PRIVATE LIMITED was incorporated on
            <strong> 13 December 2012</strong>. The company operates in the food
            processing sector, under NIC Code 154 — Manufacture of other food
            products.
          </p>
        </section>

        {/* CORPORATE INFO */}
        <section style={styles.card}>
          <h3 style={styles.sectionHeading}>Corporate Information</h3>

          <div style={styles.info}>
            <p>
              <strong>Company Type:</strong> Private — Non Government
            </p>
            <p>
              <strong>Registered With:</strong> ROC Patna
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Incorporation:</strong> 13 Dec 2012
            </p>
          </div>
        </section>

        {/* DIRECTORS */}
        <section style={styles.card}>
          <h3 style={styles.sectionHeading}>Board of Directors</h3>

          <ul style={styles.list}>
            <li>
              <strong>IRSHAD ALAM</strong>
            </li>
            <li>
              <strong>ZINAT JAHAN</strong>
            </li>
          </ul>
        </section>

        {/* ADDRESS */}
        <section style={styles.card}>
          <h3 style={styles.sectionHeading}>Registered Office</h3>

          <p style={styles.text}>
            BERAI TOLA, VILL — BERAI KHANAPUR
            <br />
            ANCHAL — KATARA
            <br />
            MUZAFFARPUR, Bihar — 843129
          </p>

          <p>
            <strong>Email:</strong> cksitr2028@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    fontFamily: "Inter, sans-serif",
    overflowX: "hidden"
  },

  /* HERO */
  hero: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "#fff",
    overflow: "hidden",
    borderRadius: "0 0 12px 12px",
    marginBottom: 30
  },

  /* VIDEO */
  videoBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0
  },

  /* DARK BLUR OVERLAY */
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,.55)",
//     backdropFilter: "blur(3px)",
//     zIndex: 1
//   },

  /* TEXT ON VIDEO */
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: 900,
    padding: "0 20px"
  },

  heroHeading: {
    fontSize: 72,
    fontWeight: 900,
    letterSpacing: 6,
    marginBottom: 14
  },

  heroMessage: {
    fontSize: 20,
    lineHeight: 1.7,
    opacity: 0.95
  },

  content: {
    padding: "0 70px 40px"
  },

  heroTitle: {},
  heroSub: {},

  storySection: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: 20,
    marginBottom: 28,
    alignItems: "center"
  },

  storyImg: {
    width: "100%",
    borderRadius: 12
  },

  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 18,
    marginBottom: 22,
    background: "#fff"
  },

  timelineWrapper: {
    position: "relative",
    margin: "60px 0 50px"
  },

  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 70,
    bottom: 0,
    width: 3,
    background: "linear-gradient(#9ca3af, #6b7280)"
  },

  timelineRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    margin: "50px 0",
    position: "relative"
  },

  yearBox: {
    fontSize: 28,
    fontWeight: 900,
    width: "50%",
    textAlign: "right",
    color: "#0f172a"
  },

  timelineCard: {
    width: "50%",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,.06)"
  },

  dot: {
    width: 18,
    height: 18,
    background: "#fff",
    border: "4px solid #0f172a",
    borderRadius: "50%",
    zIndex: 3
  },

  offerSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.1fr",
    gap: 24,
    marginBottom: 30,
    alignItems: "center"
  },

  offerImage: { width: "100%", borderRadius: 14 },

  btn: {
    marginTop: 10,
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer"
  },

  header: { marginTop: 10, marginBottom: 12 },

  title: { fontSize: 22, fontWeight: 900, marginBottom: 4 },

  sectionHeading: { fontSize: 20, fontWeight: 800, marginBottom: 10 },

  text: { lineHeight: 1.7 },

  info: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 10
  },

  list: { paddingLeft: 20 },

  status: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    padding: "6px 10px",
    background: "#ecfdf5",
    borderRadius: 6,
    border: "1px solid #bbf7d0",
    color: "#166534"
  }
};
