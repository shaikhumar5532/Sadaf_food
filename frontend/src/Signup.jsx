import { useState } from "react";
import axios from "axios";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    try {
      await axios.post("http://localhost:5000/api/signup", form);
      alert("Signup successful 🎉");
      onSignup();
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join SFPPL today</p>

        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} onClick={signup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    marginBottom: "5px",
    fontSize: "24px"
  },
  subtitle: {
    marginBottom: "20px",
    color: "#666"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  }
};
