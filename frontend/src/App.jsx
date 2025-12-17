import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />

      {/* PAGES */}
      {page === "products" && (
        <ProductList onSelectProduct={(p) => { setSelectedProduct(p); setPage("detail"); }} />
      )}

      {page === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setPage("products")}
          isLoggedIn={isLoggedIn}
        />
      )}

      {page === "signup" && (
        <Signup onSignup={() => setPage("login")} />
      )}

      {page === "login" && !isLoggedIn && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            setPage("products"); // redirect after login
          }}
        />
      )}

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
