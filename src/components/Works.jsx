import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Works.css";
import axios from "axios";

const Works = () => {
  const [data, setData] = useState([]); // API'den alınan veri
  const [loading, setLoading] = useState(true); // Verimizin yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  useEffect(() => {
    axios
      .get("https://66bc896924da2de7ff6af509.mockapi.io/api/v1/artworks") // Doğru API endpoint'i
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="works-container">
      <div className="works-grid">
        {data.map((item) => (
          <div key={item.id} className="work-card">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image} // Doğru alan adı
                alt={item.title}
                className="work-image"
              />
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
