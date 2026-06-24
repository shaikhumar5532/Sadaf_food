import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaPaperclip, FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  // Filter states
  const [deptFilter, setDeptFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Application wizard states
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchDept = deptFilter === "All" || job.title.toLowerCase().includes(deptFilter.toLowerCase()) || job.description.toLowerCase().includes(deptFilter.toLowerCase());
      const matchLoc = locationFilter === "All" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchDept && matchLoc;
    });
    setFilteredJobs(filtered);
  }, [deptFilter, locationFilter, jobs]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/apply", {
        name: formData.name,
        email: formData.email,
        resumeLink: formData.resumeLink,
        message: formData.message,
        jobId: selectedJob._id
      });
      setSuccess(true);
      setFormData({ name: "", email: "", resumeLink: "", message: "" });
      setTimeout(() => {
        setSelectedJob(null);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      alert("Job application submission failed.");
    }
  };

  const culturePoints = [
    { title: "Safety First Commitment", desc: "A clean manufacturing plant focusing on zero-human contact processes ensures worker health and food safety." },
    { title: "Continuous Skill Training", desc: "We provide comprehensive automated machinery and quality audit operations training for workers." },
    { title: "Diversity & Inclusion", desc: "Equal opportunity employer empowering regional talents in Bihar to grow agro-processing careers." }
  ];

  const benefits = [
    "Competitive Salary Packages",
    "Health Insurance Benefits",
    "Performance Production Bonuses",
    "Paid Annual Leaves",
    "Free Safe Food Meal Allowances",
    "Career Upskilling Sessions"
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
          alt="Careers header"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Careers at SFPPL</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Build your professional future in modern food technology, logistics, operations, and sales management.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Culture & Benefits (1 Column) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Culture */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3">Company Culture</h3>
            <div className="space-y-4">
              {culturePoints.map((point, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-bold text-slate-700 text-sm flex items-center space-x-1.5">
                    <span className="text-brand-accent">✦</span>
                    <span>{point.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3">Employee Benefits</h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              {benefits.map((ben, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="text-brand-primary">✔</span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Side: Jobs Filter & List (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Filters card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              {/* Dept filter */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Department</span>
                <select
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                  className="block bg-slate-50 border border-gray-100 p-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Departments</option>
                  <option value="Quality">Quality Assurance</option>
                  <option value="Logistics">Logistics / Operations</option>
                  <option value="Sales">Sales / Marketing</option>
                </select>
              </div>

              {/* Location filter */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                <select
                  value={locationFilter}
                  onChange={e => setLocationFilter(e.target.value)}
                  className="block bg-slate-50 border border-gray-100 p-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Locations</option>
                  <option value="Muzaffarpur">Muzaffarpur</option>
                  <option value="Patna">Patna</option>
                </select>
              </div>
            </div>

            <span className="text-xs font-bold text-slate-400">{filteredJobs.length} Job Openings Found</span>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-slate-400">No career opportunities matches your filter parameters.</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div
                  key={job._id}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                    <div className="flex space-x-2 text-[10px] font-bold">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-brand-primary flex items-center space-x-1 uppercase">
                        <FaBriefcase size={8} /> <span>{job.type}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-brand-accent flex items-center space-x-1 uppercase">
                        <FaMapMarkerAlt size={8} /> <span>{job.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">{job.description}</p>
                  
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-6 py-2 bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <span>Apply For Position</span>
                      <FaChevronRight size={10} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* ⚙️ JOB APPLICATION MODAL OVERLAY */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">Application Form</span>
              <h2 className="text-2xl font-black text-slate-800 mt-1">{selectedJob.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{selectedJob.location} • {selectedJob.type}</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 text-brand-primary text-xs font-bold text-center py-4 rounded-xl">
                ✅ Application submitted successfully! HR will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                    placeholder="Full Name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 flex justify-between">
                    <span>Resume Link</span>
                    <span className="text-[9px] text-gray-400 font-medium">Link from Google Drive / Dropbox</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.resumeLink}
                      onChange={e => setFormData({ ...formData, resumeLink: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 pl-9 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="https://drive.google.com/..."
                    />
                    <FaPaperclip className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Cover Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                    placeholder="Briefly state your key food processing experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Submit Application
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
