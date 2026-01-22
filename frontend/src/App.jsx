import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import LandingPage from "./LandingPage";
import CompanyDetails from "./CompanyDetails";
import Careers from "./Careers";
import ApplyJob from "./ApplyJob";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("landing");

  // PRODUCT STATES
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // CAREER STATES
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {page !== "landing" && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setPage={setPage}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {/* ================= LANDING ================= */}
      {page === "landing" && (
        <LandingPage
          goToProducts={() => setPage("products")}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setPage={setPage}
        />
      )}

      {/* ================= PRODUCT LIST ================= */}
      {page === "products" && (
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
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
                setPage("detail");
              }}
            />
          </div>
        </div>
      )}

      {/* ================= PRODUCT DETAIL ================= */}
      {page === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isLoggedIn={isLoggedIn}
          onBack={() => {
            setSelectedProduct(null);
            setPage("products");
          }}
        />
      )}

      {/* ================= SIGNUP ================= */}
      {page === "signup" && (
        <Signup onSignup={() => setPage("login")} />
      )}

      {/* ================= LOGIN ================= */}
      {page === "login" && !isLoggedIn && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            setPage("products");
          }}
        />
      )}

      {/* ================= COMPANY DETAILS ================= */}
      {page === "company" && <CompanyDetails />}

      {/* ================= CAREERS ================= */}
      {page === "careers" && (
        <Careers
          onApply={(job) => {
            setSelectedJob(job);
            setPage("apply-job");
          }}
        />
      )}

      {/* ================= APPLY JOB PAGE ================= */}
      {page === "apply-job" && selectedJob && (
        <ApplyJob
          job={selectedJob}
          onBack={() => {
            setSelectedJob(null);
            setPage("careers");
          }}
        />
      )}

      {/* ================= FOOTER ================= */}
      <Footer page={page} setPage={setPage} />
    </>
  );
}
