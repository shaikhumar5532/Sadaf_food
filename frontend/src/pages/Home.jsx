import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaShieldAlt, FaAward, FaTruck, FaGlobe, FaChevronRight, FaPlay, FaSeedling, FaCogs, FaBoxOpen, FaClipboardCheck } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Statistics state counters
  const [experience, setExperience] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);

  useEffect(() => {
    // Fetch Products, Testimonials, News
    axios.get("https://sadaf-food.onrender.com/api/products")
      .then(res => setProducts(res.data.slice(0, 4)))
      .catch(err => console.error("Error fetching products:", err));

    axios.get("https://sadaf-food.onrender.com/api/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error("Error fetching testimonials:", err));

    axios.get("https://sadaf-food.onrender.com/api/news")
      .then(res => setNews(res.data.slice(0, 3)))
      .catch(err => console.error("Error fetching news:", err));

    // Stats counter simulation
    const interval = setInterval(() => {
      setExperience(prev => (prev < 14 ? prev + 1 : 14));
      setProductsCount(prev => (prev < 50 ? prev + 3 : 50));
      setClientsCount(prev => (prev < 2500 ? prev + 125 : 2500));
      setPartnersCount(prev => (prev < 300 ? prev + 15 : 300));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <FaShieldAlt size={28} />, title: "Trusted Since 2012", desc: "Built on high industry transparency and raw ingredient sourcing standards." },
    { icon: <FaAward size={28} />, title: "Quality Certified", desc: "Fully accredited with FSSAI central license and ISO 22000 standard practices." },
    { icon: <FaTruck size={28} />, title: "Nationwide Supply", desc: "Seamless cold chain and logistics support across all Indian territories." },
    { icon: <FaGlobe size={28} />, title: "Export Ready", desc: "Export compliant processing for global wholesalers and food brands." }
  ];

  const processes = [
    { icon: <FaSeedling />, title: "Organic Sourcing", desc: "Direct tie-ups with regional agricultural farms for raw grain and spice procurement." },
    { icon: <FaCogs />, title: "Optical Sorting", desc: "State of the art automated machinery eliminates foreign objects and debris." },
    { icon: <FaBoxOpen />, title: "Hygiene Packing", desc: "Strict zero-contact processes to ensure extended shelf-life and contamination-free freshness." },
    { icon: <FaClipboardCheck />, title: "Quality Testing", desc: "Every batch undergoes physical and laboratory chemical evaluations." }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center text-white bg-slate-900">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600"
          alt="Agriculture food processing"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight">
              Premium Quality <span className="text-brand-accent">Processed Foods</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL) is a leading processor and manufacturer of premium processed Shahi Litchis, organic Makhanas (fox nuts), and fresh aquaculture fish products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold bg-brand-primary hover:bg-brand-green-hover text-white shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore Products</span>
              <FaChevronRight size={14} />
            </Link>
            <Link
              to="/distributors"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold bg-white text-slate-900 hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
            >
              <span>Become Distributor</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CORPORATE FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:translate-y-[-4px] transition-all"
            >
              <div className="text-brand-primary mb-4 p-3 bg-emerald-50 rounded-xl inline-block">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CORE STATISTICS SECTION */}
      <section className="py-16 green-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-5xl font-black text-brand-accent">{experience}+</div>
            <div className="text-xs sm:text-sm uppercase font-semibold text-emerald-100 mt-2">Years of Excellence</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-brand-accent">{productsCount}+</div>
            <div className="text-xs sm:text-sm uppercase font-semibold text-emerald-100 mt-2">Products Manufactured</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-brand-accent">{clientsCount}+</div>
            <div className="text-xs sm:text-sm uppercase font-semibold text-emerald-100 mt-2">Happy Wholesalers</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-brand-accent">{partnersCount}+</div>
            <div className="text-xs sm:text-sm uppercase font-semibold text-emerald-100 mt-2">Distributors Nationwide</div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800"
              alt="Food storage and inspection"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase font-bold tracking-wider text-brand-primary">Our Legacy</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              State-of-the-Art Food Processing From Muzaffarpur, Bihar
            </h2>
            <p className="text-slate-600 leading-relaxed">
              For over a decade, SADAF FOOD PROCESSORS PRIVATE LIMITED has focused on harvesting and processing clean, hygienic, and highly nutritious Shahi Litchis, organic Makhanas, and fresh pond fish products. Operating from our central facility, we supply retail partners, bulk caterers, and export markets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="border-l-4 border-brand-accent pl-4">
                <h4 className="font-bold text-slate-800">Our Mission</h4>
                <p className="text-xs text-slate-500 mt-1">To process safe, high-integrity food products using automation and sustainable sourcing.</p>
              </div>
              <div className="border-l-4 border-brand-primary pl-4">
                <h4 className="font-bold text-slate-800">Our Vision</h4>
                <p className="text-xs text-slate-500 mt-1">To build a global network of agro-processing hubs matching international purity certifications.</p>
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-brand-primary font-bold hover:text-brand-green-hover transition-colors"
              >
                <span>Read More About Us</span>
                <FaChevronRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">Zero Contamination</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">Our Manufacturing Process</h2>
            <p className="text-slate-500">Every single grain goes through a multi-stage rigorous cleaning and audit workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 hover:border-brand-primary/20 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-primary flex items-center justify-center mx-auto text-2xl mb-4 font-bold">
                  {proc.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{proc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{proc.desc}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] text-gray-300 font-bold z-10">
                    ➔
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCTS PREVIEW SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">Premium Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mt-1">Featured Products</h2>
            </div>
            <Link
              to="/products"
              className="text-brand-primary font-bold hover:underline flex items-center space-x-1"
            >
              <span>View All Products</span>
              <FaChevronRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((prod) => (
              <motion.div
                key={prod._id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="h-52 bg-slate-100 overflow-hidden relative group">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand-primary text-white text-xs px-3 py-1.5 rounded-full font-bold">
                    {prod.category}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{prod.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-brand-primary font-black text-lg">₹ {prod.price}</span>
                    <button
                      onClick={() => setQuickViewProduct(prod)}
                      className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-brand-primary hover:text-white transition-all text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">What Our Partners Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test._id} className="bg-slate-50 p-8 rounded-2xl text-left border border-gray-100 shadow-sm space-y-4">
                <div className="text-brand-accent font-black text-xl">★★★★★</div>
                <p className="text-slate-600 italic text-sm leading-relaxed">"{test.comment}"</p>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{test.author}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS / UPDATE BLOGS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">Press & Corporate</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">Latest Press Releases</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wide">{new Date(item.createdAt).toLocaleDateString()}</span>
                    <h3 className="font-bold text-base text-slate-800 line-clamp-2 hover:text-brand-primary transition-colors cursor-pointer">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3">{item.summary}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <span className="text-[11px] font-bold text-slate-400">By {item.author}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM ACTION CTA */}
      <section className="py-24 green-gradient text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-brand-accent/20 via-transparent to-transparent opacity-60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Expand Your Food Distribution Network
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Partner with SADAF FOOD PROCESSORS PRIVATE LIMITED. Register as a verified district distributor or submit custom wholesale requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/distributors"
              className="px-8 py-3.5 bg-brand-accent hover:bg-brand-gold-hover text-slate-900 font-bold rounded-full shadow-lg transition-colors"
            >
              Apply For Distributorship
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white hover:bg-white hover:text-slate-900 font-bold rounded-full transition-all"
            >
              Contact Bulk Support
            </Link>
          </div>
        </div>
      </section>

      {/* 10. PRODUCT QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold z-10 cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-72 md:h-full bg-slate-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 space-y-5">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-brand-primary text-xs font-bold">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="text-2xl font-black text-slate-800">{quickViewProduct.name}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{quickViewProduct.description}</p>
                  <div className="text-2xl font-black text-brand-primary">₹ {quickViewProduct.price}</div>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={() => {
                        setQuickViewProduct(null);
                        navigate(`/products`);
                      }}
                      className="flex-1 py-3 bg-brand-primary hover:bg-brand-green-hover text-white text-sm font-bold rounded-xl shadow-lg transition-colors cursor-pointer text-center"
                    >
                      View Details Catalog
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
