import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaComments, FaClock } from "react-icons/fa";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Query",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", category: "General Query", message: "" });
    } catch (err) {
      alert("Error submitting contact message.");
    }
  };

  const offices = [
    {
      city: "Muzaffarpur Registered Office",
      address: "Berai Tola, Vill — Berai Khanapur, Anchal — Katara, Muzaffarpur, Bihar — 843129",
      phone: "+91 62028 XXXXX",
      email: "cksitr2028@gmail.com"
    },
    {
      city: "Patna Sales Office",
      address: "Mourya Lok Complex, Block C, 3rd Floor, Fraser Road, Patna, Bihar — 800001",
      phone: "+91 91234 XXXXX",
      email: "patna.sales@sfppl.com"
    }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1423662055905-ec3d12f8b581?q=80&w=1200"
          alt="Contact us header"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Contact Us</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Get in touch with SFPPL administration. Submit custom packaging orders, distributorship queries, or feedback.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Office lists (5 columns) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3 flex items-center space-x-2">
              <FaComments className="text-brand-primary" />
              <span>Contact Channels</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <FaWhatsapp className="text-brand-primary text-2xl shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">WhatsApp Live Chat</h4>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-primary font-bold hover:underline"
                  >
                    Chat with Dispatch Support ➔
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <FaClock className="text-brand-accent text-2xl shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Working Hours</h4>
                  <p className="text-xs text-slate-500">Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-6">
            {offices.map((off, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-800 text-base flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-brand-accent" />
                  <span>{off.city}</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{off.address}</p>
                <div className="text-xs space-y-1 pt-2 border-t border-gray-50 text-slate-600 font-semibold">
                  <p>Phone: {off.phone}</p>
                  <p>Email: <a href={`mailto:${off.email}`} className="text-brand-primary hover:underline">{off.email}</a></p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Contact Submit Form (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-800">Send an Inquiry</h3>
              <p className="text-xs text-gray-400 mt-1">Our sales administration team answers inquiries within 1 business day.</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 text-brand-primary p-6 rounded-2xl text-xs font-bold text-center border border-emerald-100">
                ✅ Message transmitted successfully! Our administration will email you back.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Phone</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Inquiry Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary font-bold text-slate-700"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Sales & Trade">Sales & Trade</option>
                      <option value="Distributor Request">Distributor Request</option>
                      <option value="Career Question">Career Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-primary"
                    placeholder="Enter details of your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Transmit Message
                </button>
              </form>
            )}
          </div>

          {/* Interactive mockup Map */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm h-72 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-center">
              <div className="space-y-2">
                <span className="text-3xl">🗺️</span>
                <h4 className="font-bold text-slate-800 text-sm">Interactive GPS Maps Mockup</h4>
                <p className="text-[10px] text-gray-400">Muzaffarpur Plant, Katara Road, Muzaffarpur, Bihar 843129</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary font-bold hover:underline inline-block mt-2"
                >
                  Open in Google Maps ➔
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
