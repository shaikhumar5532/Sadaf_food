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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h4 style={styles.cardTitle}>Category</h4>
        </div>

        <div style={styles.catList}>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.catItem,
                  background: active ? "#eaf6ee" : "transparent",
                  borderLeft: active ? "4px solid #2e7d32" : "4px solid transparent",
                  color: active ? "#1b5e20" : "#333",
                }}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h4 style={styles.cardTitle}>Price</h4>
          <small style={styles.cardSub}>Choose a range</small>
        </div>

        <div style={styles.presetGrid}>
          {presets.map((p) => {
            const active = selectedPriceRanges.some((r) => r.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePreset(p)}
                aria-pressed={active}
                style={{
                  ...styles.preset,
                  background: active ? "#eaf6ee" : "#fff",
                  color: active ? "#1b5e20" : "#2e2e2e",
                  boxShadow: active ? "0 6px 18px rgba(46,125,50,0.06)" : "0 6px 18px rgba(15,15,15,0.03)",
                  borderLeft: active ? "4px solid #2e7d32" : "4px solid transparent",
                  paddingLeft: 12,
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div style={styles.manual}> 
          <div style={styles.manualRow}>
            <div style={styles.inputWrap}>
              <label style={styles.label}>Min</label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => {
                  setSelectedPriceRanges([]);
                  setPriceRange({ ...priceRange, min: e.target.value });
                }}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrap}>
              <label style={styles.label}>Max</label>
              <input
                type="number"
                placeholder="No limit"
                value={priceRange.max}
                onChange={(e) => {
                  setSelectedPriceRanges([]);
                  setPriceRange({ ...priceRange, max: e.target.value });
                }}
                style={styles.input}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    width: 260,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 14,
    boxShadow: "0 8px 24px rgba(7,16,12,0.04)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    margin: 0,
    fontSize: 15,
    color: "#18342a",
  },
  cardSub: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  catList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  catItem: {
    textAlign: "left",
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "all 160ms ease",
    fontSize: 14,
  },
  presetGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
    marginTop: 6,
  },
  preset: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e9f3ea",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 14,
  },
  manual: {
    marginTop: 12,
  },
  manualRow: {
    display: "flex",
    gap: 8,
  },
  inputWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  label: {
    fontSize: 12,
    color: "#6b6b6b",
    marginBottom: 6,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e6e6e6",
    outline: "none",
    fontSize: 14,
  },
};

