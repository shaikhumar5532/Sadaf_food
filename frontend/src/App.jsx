import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("products");

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />

      {/* PAGES */}
      {page === "products" && <ProductList />}

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
