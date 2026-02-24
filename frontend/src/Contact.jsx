import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Send to backend (adjust endpoint as needed)
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              style={styles.input}
            />
          </div>

          {/* Subject */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Message subject"
              required
              style={styles.input}
            />
          </div>

          {/* Message */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              required
              rows={6}
              style={styles.textarea}
            />
          </div>

          {/* Status Messages */}
          {success && <p style={styles.successMsg}>✓ Message sent successfully!</p>}
          {error && <p style={styles.errorMsg}>✗ {error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div style={styles.infoSection}>
          <h2 style={styles.infoTitle}>Other Ways to Reach Us</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h3 style={styles.infoCardTitle}>Email</h3>
              <p style={styles.infoCardText}>contact@sadaffood.com</p>
            </div>
            <div style={styles.infoCard}>
              <h3 style={styles.infoCardTitle}>Phone</h3>
              <p style={styles.infoCardText}>+1 (555) 123-4567</p>
            </div>
            <div style={styles.infoCard}>
              <h3 style={styles.infoCardTitle}>Address</h3>
              <p style={styles.infoCardText}>123 Food Street, City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontSize: "2.5em",
    color: "#000",
    marginBottom: "10px",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1em",
    color: "#666",
    textAlign: "center",
    marginBottom: "30px"
  },
  form: {
    marginBottom: "40px"
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontSize: "0.95em",
    fontWeight: "600",
    color: "#000",
    marginBottom: "8px"
  },
  input: {
    padding: "12px",
    fontSize: "1em",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "inherit",
    transition: "border-color 0.3s",
    boxSizing: "border-box"
  },
  textarea: {
    padding: "12px",
    fontSize: "1em",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "inherit",
    resize: "vertical",
    transition: "border-color 0.3s",
    boxSizing: "border-box"
  },
  submitBtn: {
    padding: "12px 30px",
    fontSize: "1em",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#d4a574",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "100%"
  },
  successMsg: {
    color: "#27ae60",
    fontSize: "0.95em",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "500"
  },
  errorMsg: {
    color: "#e74c3c",
    fontSize: "0.95em",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "500"
  },
  infoSection: {
    borderTop: "1px solid #eee",
    paddingTop: "30px",
    marginTop: "30px"
  },
  infoTitle: {
    fontSize: "1.5em",
    color: "#000",
    marginBottom: "20px",
    textAlign: "center"
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  infoCard: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    textAlign: "center"
  },
  infoCardTitle: {
    fontSize: "1.1em",
    fontWeight: "600",
    color: "#000",
    marginBottom: "10px"
  },
  infoCardText: {
    fontSize: "0.95em",
    color: "#666"
  }
};
