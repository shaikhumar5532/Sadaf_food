import { useState } from "react";
import axios from "axios";

export default function ApplyJob({ job, onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    message: ""
  });

  const apply = async () => {
    if (!form.name || !form.email || !form.resumeLink) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/apply", {
        ...form,
        jobId: job._id
      });

      alert("✅ Application submitted successfully!");
      onBack();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Failed to submit application");
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Apply for {job.title}</h1>
        <p style={styles.subTitle}>
          {job.location} • {job.type}
        </p>
      </div>

      {/* JOB INFO */}
      <div style={styles.jobCard}>
        <h3 style={styles.sectionTitle}>Job Description</h3>
        <p style={styles.description}>{job.description}</p>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <h3 style={styles.sectionTitle}>Your Details</h3>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            placeholder="Enter your full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Resume Link</label>
          <input
            style={styles.input}
            placeholder="Google Drive / PDF link"
            value={form.resumeLink}
            onChange={e =>
              setForm({ ...form, resumeLink: e.target.value })
            }
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Message (Optional)</label>
          <textarea
            style={styles.textarea}
            placeholder="Tell us why you are a good fit"
            value={form.message}
            onChange={e =>
              setForm({ ...form, message: e.target.value })
            }
          />
        </div>

        <button style={styles.submitBtn} onClick={apply}>
          🚀 Submit Application
        </button>

        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Careers
        </button>
      </div>
    </div>
  );
}

/* ================= MODERN STYLES ================= */

const styles = {
  page: {
    padding: "60px 20px",
    maxWidth: 900,
    margin: "auto",
    fontFamily: "system-ui, sans-serif"
  },

  header: {
    marginBottom: 30
  },

  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 6
  },

  subTitle: {
    color: "#555",
    fontSize: 15
  },

  jobCard: {
    background: "#ffffff",
    padding: 25,
    borderRadius: 14,
    marginBottom: 30,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  formCard: {
    background: "#f9fafb",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16
  },

  description: {
    color: "#444",
    lineHeight: 1.6
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333"
  },

  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none"
  },

  textarea: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    minHeight: 100,
    outline: "none"
  },

  submitBtn: {
    marginTop: 20,
    padding: "14px",
    width: "100%",
    background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer"
  },

  backBtn: {
    marginTop: 12,
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: 14
  }
};
