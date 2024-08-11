import React from "react";
import { Link } from "react-router-dom";
import mockData from "../mockData";
import "./Works.css";

const Works = () => {
  return (
    <div className="works-container">
      <div className="works-grid">
        {mockData.map((item) => (
          <div key={item.id} className="work-card">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.title} className="work-image" />
              <h3>{item.title}</h3>
              <p>{item.price} TL</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
