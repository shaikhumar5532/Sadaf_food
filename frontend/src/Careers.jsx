import { useEffect, useState } from "react";
import axios from "axios";

export default function Careers({ onApply }) {
  const [jobs, setJobs] = useState([]);

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Careers at SFPPL</h1>

      {/* ================= JOB LIST ================= */}
      {jobs.map(job => (
        <div key={job._id} style={styles.jobCard}>
          <h3>{job.title}</h3>

          <p style={styles.meta}>
            {job.location} • {job.type}
          </p>

          <p>{job.description}</p>

          <button
            style={styles.applyBtn}
            onClick={() => onApply(job)}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "50px",
    maxWidth: 900,
    margin: "auto"
  },

  heading: {
    marginBottom: 30
  },

  jobCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
  },

  meta: {
    color: "#666",
    fontSize: 14
  },

  applyBtn: {
    marginTop: 10,
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer"
  }
};
