import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/product-list?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/product-list?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress} // Enter tuşu ile arama
          />
          <button
            className="search-button"
            aria-label="Search"
            onClick={handleSearchClick}
          ></button>
        </div>
      </div>
      <ul className="navbar-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product-list">Works</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/artists">Artists</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <Link to="/login">Log In</Link>
        <Link to="/cart" className="cart-link">
          <span className="cart-icon"></span>
          <button className="cart-button" aria-label="Cart"></button>
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
