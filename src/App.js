import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";
import Works from "./components/Works";
import ProductDetailPage from "./components/ProductDetailPage";
import ProductListPage from "./components/ProductListPage";
import Login from "./login/Login";
import Register from "./login/Register"; // Kayıt sayfası ekleyin
import ForgotPassword from "./login/ForgotPassword"; // Şifre sıfırlama sayfası ekleyin

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-list" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
