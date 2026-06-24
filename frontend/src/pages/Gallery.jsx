import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/gallery")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching gallery:", err));
  }, []);

  const filteredItems = items.filter(
    item => activeFilter === "All" || item.category.toLowerCase() === activeFilter.toLowerCase()
  );

  const filters = ["All", "Factory", "Events", "Products"];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1200"
          alt="Gallery Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">SFPPL Media Gallery</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Take a visual tour of our automated optical sorting lines, processing floors, farming meets, and packaging units.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit mx-auto">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-brand-primary text-white"
                  : "text-slate-500 hover:text-brand-primary hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item._id}
              onClick={() => setLightboxIndex(index)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer hover:shadow-lg hover:translate-y-[-3px] transition-all"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-slate-800 text-xs truncate">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-semibold uppercase flex items-center space-x-1">
                  <FaImage /> <span>Click to expand</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🖼️ INTERACTIVE LIGHTBOX VIEW */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold cursor-pointer"
          >
            ✕
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl bg-slate-900 flex justify-center">
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="text-center text-white space-y-1">
              <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest bg-brand-accent/20 px-3 py-1 rounded-full">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold pt-1">{filteredItems[lightboxIndex].title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
