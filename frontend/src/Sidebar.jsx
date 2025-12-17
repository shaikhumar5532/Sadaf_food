const categories = ["All", "Makhana", "Lichi", "Fish", "Vegetable"];

export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedPriceRanges = [],
  setSelectedPriceRanges = () => {},
}) {
  const presets = [
    { id: "p1", label: "Less than Rs 20", min: 0, max: 20 },
    { id: "p2", label: "Rs 21 to Rs 50", min: 21, max: 50 },
    { id: "p3", label: "Rs 51 to Rs 100", min: 51, max: 100 },
    { id: "p4", label: "Rs 101 to Rs 200", min: 101, max: 200 },
    { id: "p5", label: "Rs 201 to Rs 500", min: 201, max: 500 },
    { id: "p6", label: "More than Rs 500", min: 501, max: Infinity },
  ];

  function togglePreset(p) {
    const exists = selectedPriceRanges.find((r) => r.id === p.id);
    if (exists) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r.id !== p.id));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, p]);
    }
    // clear manual min/max when preset changed
    setPriceRange({ min: "", max: "" });
  }

  // intentionally no global clear function for manual amount

  return (
    <div style={styles.sidebar}>
      {/* CATEGORY */}
      <h3 style={styles.title}>Shop by Category</h3>

      {categories.map((cat) => (
        <div
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          style={{
            ...styles.item,
            backgroundColor:
              selectedCategory === cat ? "#e8f5e9" : "transparent",
            color:
              selectedCategory === cat ? "#1b5e20" : "#333",
            fontWeight:
              selectedCategory === cat ? "600" : "400",
          }}
        >
          {cat}
        </div>
      ))}

      <hr style={styles.divider} />

      {/* PRICE FILTER */}
      <div style={styles.priceHeader}>
        <h3 style={styles.title}>Price</h3>
        <small style={styles.smallText}>Select range</small>
      </div>

      <div style={styles.presetsWrap}>
        <div style={styles.presets}>
          {presets.map((p) => {
            const active = selectedPriceRanges.some((r) => r.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePreset(p)}
                aria-pressed={active}
                style={{
                  ...styles.presetBtn,
                  background: active ? "linear-gradient(135deg,#2e7d32,#66bb6a)" : "#fff",
                  color: active ? "#fff" : "#333",
                  boxShadow: active ? "0 6px 18px rgba(46,125,50,0.18)" : "0 6px 18px rgba(15,15,15,0.03)",
                }}
              >
                <span style={styles.presetLabel}>{p.label}</span>
                {active && <span style={styles.check}>✓</span>}
              </button>
            );
          })}
        </div>

        {/* no history/selected list shown here by design */}
      </div>

      <div style={styles.manualBox}>
        <small style={styles.smallText}>Or enter custom range</small>

        <div style={styles.priceBoxManual}>
          <div style={styles.inputWrap}>
            <label style={styles.inputLabel}>Min</label>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => {
                setSelectedPriceRanges([]);
                setPriceRange({ ...priceRange, min: e.target.value });
              }}
              style={styles.priceInput}
            />
          </div>

          <div style={styles.inputWrap}>
            <label style={styles.inputLabel}>Max</label>
            <input
              type="number"
              placeholder="No limit"
              value={priceRange.max}
              onChange={(e) => {
                setSelectedPriceRanges([]);
                setPriceRange({ ...priceRange, max: e.target.value });
              }}
              style={styles.priceInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    width: 240,
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    height: "fit-content"
  },
  title: {
    marginBottom: 12,
    fontSize: 16,
    color: "#1b5e20",
    fontWeight: 700
  },
  item: {
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 6,
    transition: "all 0.2s ease"
  },
  divider: {
    margin: "18px 0",
    border: "none",
    borderTop: "1px solid #eee"
  },
  priceBox: {
    display: "flex",
    gap: 10
  },
  priceInput: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none"
  }
};

// extra styles appended to existing styles object
Object.assign(styles, {
  presetsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  presets: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
  },
  presetBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #eef3ee",
    cursor: "pointer",
    transition: "all 160ms ease",
    fontSize: 14,
  },
  presetLabel: {
    display: "inline-block",
    textAlign: "left",
  },
  check: {
    marginLeft: 8,
    fontWeight: 700,
    opacity: 0.95,
  },
  activeRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: {
    background: "#f1f8f2",
    color: "#1b5e20",
    padding: "6px 10px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
  },
  chipClose: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1,
    color: "#1b5e20",
  },
  clearBtn: {
    marginLeft: 6,
    background: "transparent",
    border: "1px solid #e0e0e0",
    color: "#333",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
  },
  manualBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
  priceBoxManual: {
    display: "flex",
    gap: 8,
    marginTop: 6,
  },
  inputWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  inputLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
  },
  smallText: {
    fontSize: 12,
    color: "#777",
  },
});

