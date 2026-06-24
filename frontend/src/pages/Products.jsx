import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch, FaList, FaTh, FaHeart, FaExchangeAlt, FaTimes, FaFilter } from "react-icons/fa";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Search, Filter, Sort, View states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  
  // Wishlist and Comparison states
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Load local Wishlist
    const localWish = localStorage.getItem("wishlist");
    if (localWish) setWishlist(JSON.parse(localWish));

    axios.get("https://sadaf-food.onrender.com/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error categories:", err));

    axios.get("https://sadaf-food.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error products:", err));
  }, []);

  // Update URL category syncing
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const toggleWishlist = (product) => {
    let updated;
    if (wishlist.some(item => item._id === product._id)) {
      updated = wishlist.filter(item => item._id !== product._id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const toggleCompare = (product) => {
    if (compareList.some(item => item._id === product._id)) {
      setCompareList(compareList.filter(item => item._id !== product._id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare a maximum of 3 products at a time.");
        return;
      }
      setCompareList([...compareList, product]);
      setShowCompareDrawer(true);
    }
  };

  // Filter Logic
  const filteredProducts = products
    .filter(prod => {
      const matchCategory = selectedCategory === "All" || prod.category === selectedCategory;
      const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = prod.price <= priceRange;
      return matchCategory && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0; // default order
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title */}
        <div className="py-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Advanced Catalog</h1>
            <p className="text-xs text-slate-400 mt-1">Browse, filter, and compare the finest food selections from SFPPL.</p>
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-gray-200 px-4 py-2 pl-10 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
              />
              <FaSearch className="absolute left-3.5 top-3 text-gray-400 text-xs" />
            </div>

            {/* View Mode controls */}
            <div className="bg-white border border-gray-200 p-1 rounded-xl flex space-x-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg cursor-pointer ${viewMode === "grid" ? "bg-emerald-50 text-brand-primary" : "text-gray-400"}`}
              >
                <FaTh size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg cursor-pointer ${viewMode === "list" ? "bg-emerald-50 text-brand-primary" : "text-gray-400"}`}
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Side filter panel */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-fit">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2 pb-3 border-b border-gray-100">
              <FaFilter className="text-brand-primary" size={14} />
              <span>Filters</span>
            </h3>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-slate-400 tracking-wider">Category</label>
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setCurrentPage(1);
                  }}
                  className={`text-left text-sm py-2 px-3 rounded-lg font-semibold transition-all ${selectedCategory === "All" ? "bg-emerald-50 text-brand-primary" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentPage(1);
                    }}
                    className={`text-left text-sm py-2 px-3 rounded-lg font-semibold transition-all ${selectedCategory === cat.name ? "bg-emerald-50 text-brand-primary" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs uppercase font-bold text-slate-400 tracking-wider">
                <span>Max Price</span>
                <span className="text-brand-primary font-black">₹ {priceRange}</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="5"
                value={priceRange}
                onChange={e => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>₹ 30</span>
                <span>₹ 300</span>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-slate-400 tracking-wider">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 p-2.5 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-primary"
              >
                <option value="default">Default Sort</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products Grid / List display */}
          <div className="lg:col-span-3 space-y-8">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                <span className="text-4xl">🌾</span>
                <h3 className="font-bold text-lg text-slate-800">No products match your criteria</h3>
                <p className="text-xs text-slate-400">Try adjusting search keywords or the maximum price limits.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(prod => {
                  const isWish = wishlist.some(item => item._id === prod._id);
                  const isCompare = compareList.some(item => item._id === prod._id);
                  return (
                    <div key={prod._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:translate-y-[-4px] transition-all flex flex-col justify-between">
                      <div className="relative bg-slate-100 h-48 overflow-hidden">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase">
                          {prod.category}
                        </span>
                        
                        {/* Overlay Controls */}
                        <div className="absolute top-3 right-3 flex flex-col space-y-2">
                          <button
                            onClick={() => toggleWishlist(prod)}
                            className={`p-2 rounded-full shadow-md cursor-pointer transition-colors ${isWish ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"}`}
                          >
                            <FaHeart size={12} />
                          </button>
                          <button
                            onClick={() => toggleCompare(prod)}
                            className={`p-2 rounded-full shadow-md cursor-pointer transition-colors ${isCompare ? "bg-brand-primary text-white" : "bg-white text-gray-400 hover:text-brand-primary"}`}
                          >
                            <FaExchangeAlt size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-slate-800 hover:text-brand-primary transition-colors line-clamp-1">{prod.name}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{prod.description}</p>
                        </div>
                        
                        <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                          <span className="text-brand-primary font-black text-base">₹ {prod.price}</span>
                          <Link
                            to={`/product/${prod._id}`}
                            state={{ product: prod }}
                            className="text-xs font-bold text-slate-700 hover:text-brand-primary transition-colors flex items-center space-x-1"
                          >
                            <span>View Details</span>
                            <span>➔</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map(prod => {
                  const isWish = wishlist.some(item => item._id === prod._id);
                  const isCompare = compareList.some(item => item._id === prod._id);
                  return (
                    <div key={prod._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all p-5 flex flex-col sm:flex-row gap-6">
                      <div className="relative bg-slate-100 w-full sm:w-48 h-36 rounded-xl overflow-hidden shrink-0">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] text-brand-primary font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full">{prod.category}</span>
                            <div className="flex space-x-2">
                              <button onClick={() => toggleWishlist(prod)} className={`p-1.5 rounded-lg cursor-pointer ${isWish ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}>
                                <FaHeart size={14} />
                              </button>
                              <button onClick={() => toggleCompare(prod)} className={`p-1.5 rounded-lg cursor-pointer ${isCompare ? "text-brand-primary" : "text-gray-400 hover:text-brand-primary"}`}>
                                <FaExchangeAlt size={14} />
                              </button>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-800 text-lg mt-1">{prod.name}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{prod.description}</p>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-3">
                          <span className="text-brand-primary font-black text-lg">₹ {prod.price}</span>
                          <Link
                            to={`/product/${prod._id}`}
                            state={{ product: prod }}
                            className="bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                          >
                            Product Specs
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentPage === i + 1 ? "bg-brand-primary text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* 🚀 BOTTOM COMPARE BAR */}
      {compareList.length > 0 && showCompareDrawer && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl z-50 p-5 transition-transform duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex justify-between items-center w-full md:w-auto">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Compare Deck</h4>
                <p className="text-[10px] text-gray-400">Comparing {compareList.length} of 3 items</p>
              </div>
              <button
                onClick={() => setShowCompareDrawer(false)}
                className="md:hidden text-gray-400 hover:text-slate-800 text-sm cursor-pointer"
              >
                Hide
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full md:w-auto flex-1 max-w-xl">
              {compareList.map(prod => (
                <div key={prod._id} className="relative bg-slate-50 border border-gray-100 p-2.5 rounded-xl flex items-center space-x-2">
                  <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg" />
                  <span className="text-[11px] font-semibold text-slate-700 truncate block flex-1">{prod.name}</span>
                  <button
                    onClick={() => toggleCompare(prod)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <button
                onClick={() => setCompareList([])}
                className="w-1/2 md:w-auto text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear Deck
              </button>
              <button
                onClick={() => {
                  alert(
                    `Comparing:\n\n` +
                    compareList
                      .map(p => `${p.name} - ₹${p.price} (${p.category}) - ${p.description}`)
                      .join("\n\n")
                  );
                }}
                className="w-1/2 md:w-auto px-6 py-2.5 bg-brand-primary hover:bg-brand-green-hover text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
