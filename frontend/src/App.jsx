import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("products");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ================= PAGES ================= */}

      {/* PRODUCT LIST (PLP) */}
      {page === "products" && (
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div style={{ flex: 1 }}>
            <ProductList
              selectedCategory={selectedCategory}
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
      <Footer />
    </>
  );
}
