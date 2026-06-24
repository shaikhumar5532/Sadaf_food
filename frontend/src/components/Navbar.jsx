import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaFish } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Careers", path: "/careers" },
    { name: "Distributors", path: "/distributors" },
    { name: "Investors", path: "/investors" },
    { name: "CSR", path: "/csr" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  // Professional color switching logic based on scroll position and active route
  const textTheme = scrolled || !isHomePage
    ? "text-slate-800 hover:text-brand-primary"
    : "text-white hover:text-brand-accent";

  const activeIndicatorTheme = scrolled || !isHomePage
    ? "bg-brand-primary"
    : "bg-brand-accent";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2.5"
          : "bg-black/25 backdrop-blur-xs py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 🌟 Simple and Cool Minimalist Logo */}
          <Link to="/" className="flex items-center group">
            <span className={`text-3xl font-extrabold tracking-tighter transition-all duration-300 ${
              scrolled || !isHomePage ? "text-brand-primary animate-none" : "text-white"
            }`}>
              sfppl<span className="text-brand-accent font-black">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-black tracking-widest uppercase transition-all duration-200 relative pb-1.5 ${
                    isActive ? (scrolled || !isHomePage ? "text-brand-primary" : "text-brand-accent") : textTheme
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[2.5px] rounded-full ${activeIndicatorTheme}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {token ? (
              <div className={`flex items-center space-x-3 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                scrolled || !isHomePage ? "bg-slate-50 border-slate-200" : "bg-white/10 border-white/20"
              }`}>
                <span className={`text-xs font-bold flex items-center space-x-1.5 ${scrolled || !isHomePage ? "text-slate-700" : "text-white"}`}>
                  <FaUserCircle className="text-brand-primary text-base" />
                  <span>{user?.name?.split(" ")[0]}</span>
                </span>
                
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    title="Admin Console"
                    className="text-brand-accent hover:text-brand-gold-hover transition-colors"
                  >
                    <FaTachometerAlt />
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`text-xs font-bold tracking-wider uppercase px-4 py-2 transition-colors ${
                    scrolled || !isHomePage ? "text-brand-primary" : "text-white hover:text-brand-accent"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-xs font-bold tracking-wider uppercase bg-brand-primary hover:bg-brand-green-hover text-white px-5 py-2.5 rounded-xl shadow-md transition-colors"
                >
                  Join SFPPL
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none cursor-pointer ${scrolled || !isHomePage ? "text-brand-primary" : "text-white"}`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Routing Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 shadow-xl px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-brand-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-4">
            {token ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center space-x-2">
                    <FaUserCircle className="text-brand-primary text-base" />
                    <span>{user?.name} ({user?.role})</span>
                  </span>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-brand-accent hover:underline flex items-center space-x-1 text-xs font-bold"
                    >
                      <FaTachometerAlt /> <span>Admin Console</span>
                    </Link>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-red-50 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-100 transition-colors cursor-pointer text-xs"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Link
                  to="/login"
                  className="w-1/2 text-center text-brand-primary border border-brand-primary font-bold py-2.5 rounded-xl hover:bg-emerald-50 transition-colors text-xs"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-1/2 text-center bg-brand-primary text-white font-bold py-2.5 rounded-xl hover:bg-brand-green-hover transition-colors text-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
