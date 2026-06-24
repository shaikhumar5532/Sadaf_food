import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaBriefcase, FaUserCheck, FaEnvelopeOpen, FaStore, FaLock, FaTachometerAlt } from "react-icons/fa";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  // Authorization check
  const isAdmin = token && user && user.role === "admin";

  const [activeSection, setActiveSection] = useState("overview");

  // Collections data state
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [distributors, setDistributors] = useState([]);

  // Product Form states
  const [prodForm, setProdForm] = useState({ name: "", category: "Grains", price: "", image: "", description: "" });
  const [editingProdId, setEditingProdId] = useState(null);

  // Job Form states
  const [jobForm, setJobForm] = useState({ title: "", location: "", type: "Full-Time", description: "" });

  const apiHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!isAdmin) return;

    fetchOverviewData();
  }, [isAdmin]);

  const fetchOverviewData = async () => {
    try {
      const pRes = await axios.get("http://localhost:5000/api/products");
      setProducts(pRes.data);

      const jRes = await axios.get("http://localhost:5000/api/jobs");
      setJobs(jRes.data);

      const aRes = await axios.get("http://localhost:5000/api/applications", apiHeaders);
      setApplications(aRes.data);

      const mRes = await axios.get("http://localhost:5000/api/contacts", apiHeaders);
      setMessages(mRes.data);

      const dRes = await axios.get("http://localhost:5000/api/distributors", apiHeaders);
      setDistributors(dRes.data);
    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
    }
  };

  if (!isAdmin) {
    return (
      <div className="pt-32 text-center pb-20 space-y-4">
        <FaLock size={40} className="mx-auto text-red-500" />
        <h2 className="text-2xl font-black text-slate-800">Access Restricted</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">This dashboard requires administrator login parameters.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Login as Admin
        </button>
      </div>
    );
  }

  // --- PRODUCT MANAGEMENT HANDLERS ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProdId) {
        await axios.put(`http://localhost:5000/api/products/${editingProdId}`, prodForm, apiHeaders);
      } else {
        await axios.post("http://localhost:5000/api/products", prodForm, apiHeaders);
      }
      setProdForm({ name: "", category: "Grains", price: "", image: "", description: "" });
      setEditingProdId(null);
      fetchOverviewData();
    } catch (err) {
      alert("Error saving product.");
    }
  };

  const handleProductEditSelect = (prod) => {
    setEditingProdId(prod._id);
    setProdForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      image: prod.image,
      description: prod.description
    });
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, apiHeaders);
      fetchOverviewData();
    } catch (err) {
      alert("Delete product failed.");
    }
  };

  // --- JOB LISTINGS HANDLERS ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobs", jobForm, apiHeaders);
      setJobForm({ title: "", location: "", type: "Full-Time", description: "" });
      fetchOverviewData();
    } catch (err) {
      alert("Error posting job opening.");
    }
  };

  const handleJobDelete = async (id) => {
    if (!window.confirm("Delete this career listing?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, apiHeaders);
      fetchOverviewData();
    } catch (err) {
      alert("Delete job failed.");
    }
  };

  // --- DISTRIBUTORS HANDLERS ---
  const updateDistributorStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/distributors/${id}/status`, { status }, apiHeaders);
      fetchOverviewData();
    } catch (err) {
      alert("Status update failed.");
    }
  };

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar (3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-brand-primary border-b border-gray-100 pb-3">
              <FaTachometerAlt />
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Admin Console</h3>
            </div>

            <div className="flex flex-col space-y-1">
              {[
                { id: "overview", label: "Dashboard Overview" },
                { id: "products", label: "Manage Products" },
                { id: "jobs", label: "Manage Careers" },
                { id: "applications", label: "Job Applications" },
                { id: "distributors", label: "Distributors Portal" },
                { id: "messages", label: "Inbox Messages" }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`text-left text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${activeSection === sec.id ? "bg-brand-primary text-white" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Console Viewport (9 columns) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* SECTION: OVERVIEW */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-black text-slate-800">Welcome Administrator</h2>
                <p className="text-xs text-slate-400 mt-1">Audit bulk partner registrations, list job roles, and edit the catalog.</p>
              </div>

              {/* Stats counts grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <FaBoxes className="text-brand-primary text-2xl mx-auto" />
                  <span className="text-xl font-black text-slate-800 block">{products.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Products</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <FaBriefcase className="text-brand-accent text-2xl mx-auto" />
                  <span className="text-xl font-black text-slate-800 block">{jobs.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Job Listings</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <FaUserCheck className="text-brand-primary text-2xl mx-auto" />
                  <span className="text-xl font-black text-slate-800 block">{applications.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Applicants</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <FaStore className="text-brand-accent text-2xl mx-auto" />
                  <span className="text-xl font-black text-slate-800 block">{distributors.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Distributors</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <FaEnvelopeOpen className="text-brand-primary text-2xl mx-auto" />
                  <span className="text-xl font-black text-slate-800 block">{messages.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Messages</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRODUCTS MANAGER */}
          {activeSection === "products" && (
            <div className="space-y-8">
              {/* Product form */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{editingProdId ? "Edit Product" : "Create New Product"}</h3>
                <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Product Name</label>
                      <input
                        type="text"
                        required
                        value={prodForm.name}
                        onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Category</label>
                      <select
                        value={prodForm.category}
                        onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Grains">Grains</option>
                        <option value="Spices">Spices</option>
                        <option value="Pulses">Pulses</option>
                        <option value="Food Products">Food Products</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Price (₹ per kg/pack)</label>
                      <input
                        type="number"
                        required
                        value={prodForm.price}
                        onChange={e => setProdForm({ ...prodForm, price: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                        placeholder="Price"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Image URL</label>
                    <input
                      type="url"
                      required
                      value={prodForm.image}
                      onChange={e => setProdForm({ ...prodForm, image: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                      placeholder="https://unsplash.com/..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Product Description</label>
                    <textarea
                      rows={3}
                      required
                      value={prodForm.description}
                      onChange={e => setProdForm({ ...prodForm, description: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                      placeholder="Brief specification overview..."
                    />
                  </div>

                  <div className="flex space-x-2 justify-end">
                    {editingProdId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProdId(null);
                          setProdForm({ name: "", category: "Grains", price: "", image: "", description: "" });
                        }}
                        className="px-5 py-2.5 bg-gray-100 text-slate-600 font-bold rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-primary hover:bg-brand-green-hover text-white font-bold rounded-xl cursor-pointer shadow-md"
                    >
                      {editingProdId ? "Save Changes" : "Create Product"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Products table */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-xs text-left min-w-[500px]">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-gray-100">
                      <th className="pb-3">Image</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-slate-700">
                    {products.map(prod => (
                      <tr key={prod._id}>
                        <td className="py-3"><img src={prod.image} className="w-9 h-9 object-cover rounded-lg" /></td>
                        <td className="py-3 font-bold">{prod.name}</td>
                        <td className="py-3">{prod.category}</td>
                        <td className="py-3 font-bold text-brand-primary">₹ {prod.price}</td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleProductEditSelect(prod)}
                            className="px-2.5 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold rounded-lg cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleProductDelete(prod._id)}
                            className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: CAREERS MANAGER */}
          {activeSection === "jobs" && (
            <div className="space-y-8">
              {/* Job post form */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Create Career Opening</h3>
                <form onSubmit={handleJobSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Job Title</label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                        placeholder="e.g. Food Technologist"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Location</label>
                      <input
                        type="text"
                        required
                        value={jobForm.location}
                        onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                        placeholder="e.g. Muzaffarpur, Bihar"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Position Nature</label>
                      <select
                        value={jobForm.type}
                        onChange={e => setJobForm({ ...jobForm, type: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Job Description & Skills Requirements</label>
                    <textarea
                      rows={3}
                      required
                      value={jobForm.description}
                      onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 p-3 rounded-xl focus:outline-none"
                      placeholder="State essential operational guidelines, shift structures, or degrees..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-primary hover:bg-brand-green-hover text-white font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Post Job Listing
                    </button>
                  </div>
                </form>
              </div>

              {/* Jobs Table */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-xs text-left min-w-[500px]">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-gray-100">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-slate-700">
                    {jobs.map(job => (
                      <tr key={job._id}>
                        <td className="py-3.5 font-bold">{job.title}</td>
                        <td>{job.location}</td>
                        <td>{job.type}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => handleJobDelete(job._id)}
                            className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: JOB APPLICATIONS MANAGER */}
          {activeSection === "applications" && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Received Job Applications</h3>
              <table className="w-full text-xs text-left min-w-[650px]">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-gray-100">
                    <th className="pb-3">Applicant</th>
                    <th className="pb-3">Role Applied</th>
                    <th className="pb-3">Cover Message</th>
                    <th className="pb-3 text-right">Resume Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-700">
                  {applications.map(app => (
                    <tr key={app._id}>
                      <td className="py-4">
                        <div className="font-bold text-slate-800">{app.name}</div>
                        <div className="text-[10px] text-gray-400">{app.email}</div>
                      </td>
                      <td className="py-4">
                        <span className="font-semibold">{app.jobId?.title || "N/A"}</span>
                      </td>
                      <td className="py-4 max-w-xs truncate">{app.message}</td>
                      <td className="py-4 text-right">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-brand-primary hover:text-white text-brand-primary text-[10px] font-bold rounded-lg transition-all"
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SECTION: DISTRIBUTORS APPLICATIONS MANAGER */}
          {activeSection === "distributors" && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Distributor Applications</h3>
              <table className="w-full text-xs text-left min-w-[800px]">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-gray-100">
                    <th className="pb-3">Firm / Owner</th>
                    <th className="pb-3">Contacts</th>
                    <th className="pb-3">Experience / Cap</th>
                    <th className="pb-3">Warehouse Location</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-700">
                  {distributors.map(app => (
                    <tr key={app._id}>
                      <td className="py-4">
                        <div className="font-bold text-slate-800">{app.companyName}</div>
                        <div className="text-[10px] text-gray-400">Prop: {app.ownerName}</div>
                      </td>
                      <td className="py-4">
                        <div>{app.phone}</div>
                        <div className="text-[10px] text-gray-400">{app.email}</div>
                      </td>
                      <td className="py-4">
                        <div>{app.experience || "No prior Exp"}</div>
                        <div className="text-[10px] text-brand-primary font-black">{app.investmentCapacity}</div>
                      </td>
                      <td className="py-4 max-w-[200px] truncate" title={app.address}>{app.address}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          app.status === "approved" ? "bg-emerald-50 text-brand-primary" :
                          app.status === "rejected" ? "bg-red-50 text-red-600" :
                          "bg-amber-50 text-brand-accent"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateDistributorStatus(app._id, "approved")}
                              className="px-2 py-1 bg-emerald-50 text-brand-primary font-bold rounded-lg cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateDistributorStatus(app._id, "rejected")}
                              className="px-2 py-1 bg-red-50 text-red-600 font-bold rounded-lg cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SECTION: MESSAGES MANAGER */}
          {activeSection === "messages" && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Inbox Messages</h3>
              <table className="w-full text-xs text-left min-w-[650px]">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-gray-100">
                    <th className="pb-3">From</th>
                    <th className="pb-3">Topic / Category</th>
                    <th className="pb-3">Message</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-700">
                  {messages.map(msg => (
                    <tr key={msg._id}>
                      <td className="py-4">
                        <div className="font-bold text-slate-800">{msg.name}</div>
                        <div className="text-[10px] text-gray-400">{msg.email} | {msg.phone}</div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{msg.category}</span>
                      </td>
                      <td className="py-4 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                      <td className="py-4 text-right text-gray-400 text-[10px]">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
