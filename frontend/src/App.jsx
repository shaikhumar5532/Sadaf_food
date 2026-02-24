import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Sidebar from "./Sidebar";
import LandingPage from "./LandingPage";
import CompanyDetails from "./CompanyDetails";
import Careers from "./Careers";
import ApplyJob from "./ApplyJob";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // PRODUCT STATES
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // CAREER STATE
  const [selectedJob, setSelectedJob] = useState(null);

  // 🔥 ROUTES WHERE NAVBAR & FOOTER SHOULD BE HIDDEN
  const hideLayoutRoutes = ["/login", "/signup"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ CONDITIONAL NAVBAR */}
      {!shouldHideLayout && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <Routes>

        {/* ================= LANDING ================= */}
        <Route
          path="/"
          element={
            <LandingPage
              goToProducts={() => navigate("/products")}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* ================= PRODUCTS ================= */}
        <Route
          path="/products"
          element={
            <div style={{ display: "flex", gap: 32 }}>
              <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedPriceRanges={selectedPriceRanges}
                setSelectedPriceRanges={setSelectedPriceRanges}
              />

              <div style={{ flex: 1 }}>
                <ProductList
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  selectedPriceRanges={selectedPriceRanges}
                  onSelectProduct={(product) => {
                    setSelectedProduct(product);
                    navigate("/product");
                  }}
                />
              </div>
            </div>
          }
        />

        {/* ================= PRODUCT DETAIL ================= */}
        <Route
          path="/product"
          element={
            selectedProduct ? (
              <ProductDetail
                product={selectedProduct}
                isLoggedIn={isLoggedIn}
                onBack={() => navigate("/products")}
              />
            ) : (
              <div style={{ padding: 40 }}>
                No product selected
              </div>
            )
          }
        />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={() => {
                setIsLoggedIn(true);
                navigate("/products");
              }}
            />
          }
        />

        {/* ================= SIGNUP ================= */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= COMPANY ================= */}
        <Route
          path="/company"
          element={<CompanyDetails />}
        />

        {/* ================= CAREERS ================= */}
        <Route
          path="/careers"
          element={
            <Careers
              onApply={(job) => {
                setSelectedJob(job);
                navigate("/apply-job");
              }}
            />
          }
        />

        {/* ================= APPLY JOB ================= */}
        <Route
          path="/apply-job"
          element={
            selectedJob ? (
              <ApplyJob
                job={selectedJob}
                onBack={() => navigate("/careers")}
              />
            ) : (
              <div style={{ padding: 40 }}>
                No job selected
              </div>
            )
          }
        />

        {/* ================= CONTACT ================= */}
        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      {/* ✅ CONDITIONAL FOOTER */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}