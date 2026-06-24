import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaChevronLeft } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://sadaf-food.onrender.com/api/auth/signup", formData);
      if (res.data.success) {
        setSuccess(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setTimeout(() => {
          navigate("/products");
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      {/* Back button */}
      <Link to="/" className="mb-6 flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors">
        <FaChevronLeft size={10} />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-800">Register Account</h2>
          <p className="text-xs text-gray-400">Join the SFPPL portal to track custom orders, career status, or reviews.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-brand-primary text-xs font-bold p-3.5 rounded-xl border border-emerald-100 text-center">
            ✅ Registration complete! Navigating dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-gray-100 p-3.5 pl-10 rounded-xl text-xs focus:outline-none focus:border-brand-primary"
                placeholder="John Doe"
              />
              <FaUser className="absolute left-3.5 top-4 text-gray-400 text-xs" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-gray-100 p-3.5 pl-10 rounded-xl text-xs focus:outline-none focus:border-brand-primary"
                placeholder="name@domain.com"
              />
              <FaEnvelope className="absolute left-3.5 top-4 text-gray-400 text-xs" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-gray-100 p-3.5 pl-10 rounded-xl text-xs focus:outline-none focus:border-brand-primary"
                placeholder="Password"
              />
              <FaLock className="absolute left-3.5 top-4 text-gray-400 text-xs" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Create Free Account
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 font-semibold border-t border-gray-50 pt-4">
          Already registered?{" "}
          <Link to="/login" className="text-brand-primary hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
