import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import LandingPage from "./LandingPage";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("landing");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const normSelected = String(selectedCategory ?? "").trim().toLowerCase();
  const isAllSelected = normSelected === "all";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* Show Navbar ONLY after landing */}
      {page !== "landing" && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setPage={setPage}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {/* ================= PAGES ================= */}

      {/* LANDING */}
      {page === "landing" && (
        <LandingPage
          goToProducts={() => setPage("products")}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setPage={setPage}
        />
      )}

      {/* PRODUCT LIST (PLP) */}
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

      {/* PRODUCT DETAIL (PDP) */}
      {page === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isLoggedIn={isLoggedIn}
          onBack={() => {
            setPage("products");
            setSelectedProduct(null);
          }}
        />
      )}

      {/* SIGNUP */}
      {page === "signup" && (
        <Signup onSignup={() => setPage("login")} />
      )}

      {/* LOGIN */}
      {page === "login" && !isLoggedIn && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            setPage("products");
          }}
        />
      )}

      {/* ================= FOOTER ================= */}
      <Footer page={page} />
    </>
  );
}
