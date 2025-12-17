const categories = [
  "All",
  "Makhana",
  "Lichi",
  "Fish",
  "Vegetable"
];

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Shop by Category</h3>

      {categories.map(cat => (
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
              selectedCategory === cat ? "600" : "400"
          }}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: 200,
    background: "#fff",
    padding: "5px 5px",
    margin:30,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    height: "fit-content"
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    color: "#1b5e20"
  },
  item: {
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 6,
    transition: "all 0.2s ease"
  }
};
