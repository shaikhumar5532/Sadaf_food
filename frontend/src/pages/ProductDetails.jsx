import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaFilePdf, FaLeaf, FaShieldAlt, FaSync } from "react-icons/fa";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to load product from router state, otherwise fallback
  const [product, setProduct] = useState(location.state?.product || null);
  const [zoomScale, setZoomScale] = useState(false);
  
  // Inquiry form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (!product && id) {
      axios.get("https://sadaf-food.onrender.com/api/products")
        .then(res => {
          const found = res.data.find(p => p._id === id);
          if (found) setProduct(found);
        })
        .catch(err => console.error("Error fetching product details:", err));
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="pt-32 text-center pb-20">
        <p className="text-gray-400">Loading product specs...</p>
        <Link to="/products" className="text-brand-primary font-bold underline mt-4 block">Back to Products</Link>
      </div>
    );
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://sadaf-food.onrender.com/api/contacts", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: "Product Inquiry",
        message: `Product: ${product.name} (Category: ${product.category})\nMessage: ${formData.message}`
      });
      setFormSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Inquiry submission failed. Please try again.");
    }
  };

  // Mock nutritional stats based on product category
  const nutritionValues = product.category === "Spices" ? [
    { name: "Energy (kcal)", value: "350" },
    { name: "Protein (g)", value: "8.5" },
    { name: "Carbohydrate (g)", value: "65.0" },
    { name: "Total Fat (g)", value: "6.0" },
    { name: "Sodium (mg)", value: "30" }
  ] : [
    { name: "Energy (kcal)", value: "365" },
    { name: "Protein (g)", value: "12.0" },
    { name: "Carbohydrate (g)", value: "72.0" },
    { name: "Total Fat (g)", value: "1.5" },
    { name: "Sodium (mg)", value: "5" }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate("/products")}
          className="mb-8 inline-flex items-center space-x-2 text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-sm font-bold"
        >
          <FaChevronLeft size={12} />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 1. Zoomable Image Container */}
          <div className="space-y-4">
            <div
              className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative group cursor-zoom-in"
              onClick={() => setZoomScale(!zoomScale)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-[400px] object-cover rounded-2xl transition-transform duration-300 ${zoomScale ? "scale-125" : "scale-100"}`}
              />
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-medium">
                {zoomScale ? "Click to Zoom Out" : "Click to Zoom In"}
              </div>
            </div>

            {/* Badges section */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <FaLeaf className="text-brand-primary mb-2 text-lg" />
                <span className="text-[10px] uppercase font-bold text-slate-400">100% Pure</span>
                <span className="text-xs font-bold text-slate-700 mt-0.5">Organic Certified</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <FaShieldAlt className="text-brand-primary mb-2 text-lg" />
                <span className="text-[10px] uppercase font-bold text-slate-400">Zero Contact</span>
                <span className="text-xs font-bold text-slate-700 mt-0.5">Hygienic Milled</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <FaSync className="text-brand-primary mb-2 text-lg" />
                <span className="text-[10px] uppercase font-bold text-slate-400">Fresh Stock</span>
                <span className="text-xs font-bold text-slate-700 mt-0.5">12 Month Life</span>
              </div>
            </div>
          </div>

          {/* 2. Specifications & Detail Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-brand-primary text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{product.name}</h1>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Available Packaging</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">1kg, 5kg, 10kg, 25kg PP Bags</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Origin Area</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">Muzaffarpur, Bihar, India</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Shelf Life</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">12 Months from Packaging</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Storage Advice</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">Store in cool and dry container</span>
                </div>
              </div>
            </div>

            {/* Nutritional parameters table */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Nutritional Information (Per 100g)</h3>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-gray-50">
                    <th className="pb-2">Nutrient Component</th>
                    <th className="pb-2 text-right">Approx Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-700 font-semibold">
                  {nutritionValues.map((nut, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5">{nut.name}</td>
                      <td className="py-2.5 text-right text-brand-primary font-black">{nut.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inquiry Submit Form */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Trade & Distributor Inquiry</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Submit bulk purchase requirements or requesting free product samples.</p>
              </div>

              {formSuccess ? (
                <div className="bg-emerald-50 text-brand-primary p-4 rounded-xl text-xs font-bold text-center">
                  ✅ Inquiry submitted successfully! Our dispatch manager will contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Phone / WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="e.g. +91 9999999999"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Quantity & Message</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-primary"
                      placeholder="Specify packaging requirements or bulk ton limits..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Submit Bulk Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Catalog PDF Download button */}
            <div className="pt-2 text-center">
              <a
                href="/product_catalog.pdf"
                download={`${product.name.replace(/\s+/g, "_")}_Technical_Catalog.pdf`}
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors text-xs font-bold cursor-pointer"
              >
                <FaFilePdf size={14} />
                <span>Download Technical Catalog Sheets (PDF)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
