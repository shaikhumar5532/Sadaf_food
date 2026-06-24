import { useState } from "react";
import { FaHandshake, FaWarehouse, FaCoins, FaCheckCircle, FaFileSignature } from "react-icons/fa";
import axios from "axios";

export default function Distributor() {
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    experience: "",
    investmentCapacity: "Under 5 Lakhs",
    address: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://sadaf-food.onrender.com/api/distributors", formData);
      setSuccess(true);
      setFormData({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        experience: "",
        investmentCapacity: "Under 5 Lakhs",
        address: ""
      });
    } catch (err) {
      alert("Error submitting distributor application.");
    }
  };

  const requirements = [
    { icon: <FaWarehouse />, title: "Storage Silo/Godown Capacity", desc: "Minimum 500 sq.ft. clean and damp-proof storage facility required to stock grains and pulses safely." },
    { icon: <FaCoins />, title: "Minimum Capital Investment", desc: "Capital investment threshold ranges from 5 Lakhs to 15 Lakhs depending on the allocated district size." },
    { icon: <FaHandshake />, title: "Prior FMCG Trade Experience", desc: "Preference given to individuals or entities with prior wholesale food distribution networks." }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200"
          alt="Distributor Hub"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Become an SFPPL Distributor</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Partner with Bihar's fastest-growing food processing brand and unlock high profit margins in grains, pulses, and spices.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Requirements & Benefits (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3">Requirements Checklist</h3>
            <div className="space-y-6">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <div className="text-brand-primary text-xl bg-emerald-50 p-2.5 rounded-xl mt-0.5">
                    {req.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-700 text-sm">{req.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3">Distributor Benefits</h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-brand-primary" />
                <span>High Profit Margins on bulk orders</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-brand-primary" />
                <span>Exclusive territorial sales rights</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-brand-primary" />
                <span>Co-funded local newspaper promotions</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-brand-primary" />
                <span>Quick product replacements & returns support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right: Apply Wizard (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-brand-primary font-bold">
              <FaFileSignature />
              <span className="text-xs uppercase tracking-wider">Application Desk</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-black text-slate-800">Distributorship Form</h3>
              <p className="text-xs text-gray-400 mt-1">Submit your business assets profiles for commercial appraisal.</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 text-brand-primary p-6 rounded-2xl text-xs font-bold text-center border border-emerald-100">
                ✅ Application submitted! Our regional distribution coordinator will contact you to inspect storage warehouses.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Firm / Company Name</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Owner's Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Owner Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Experience (In Years)</label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={e => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="e.g. 5 Years in FMCG"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Investment Capacity</label>
                    <select
                      value={formData.investmentCapacity}
                      onChange={e => setFormData({ ...formData, investmentCapacity: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary font-bold text-slate-700"
                    >
                      <option value="Under 5 Lakhs">Under 5 Lakhs</option>
                      <option value="5 to 10 Lakhs">5 to 10 Lakhs</option>
                      <option value="10 to 20 Lakhs">10 to 20 Lakhs</option>
                      <option value="Above 20 Lakhs">Above 20 Lakhs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Warehouse & Office Address</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                    placeholder="Enter complete godown location..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Submit Partner Application
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
