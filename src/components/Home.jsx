import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import mockData from "../mockData";

const Home = () => {
  //eserleri depolamak icin state
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    //belirli aralikla calisacak interval methodu
    const interval = setInterval(() => {
      //secilen eserler icin bos dizi
      const randomArtworks = [];
      //3 eser secilecek dongu
      while (randomArtworks.length < 3) {
        //rastgele index
        const randomIndex = Math.floor(Math.random() * mockData.length);
        //secilen indexten eseri aldım
        const artwork = mockData[randomIndex];
        //eser tekrardan seçilmediyse
        if (!randomArtworks.includes(artwork)) {
          //diziye ekle
          randomArtworks.push(artwork);
        }
      }
      //state'i guncelle
      setArtworks(randomArtworks);
    }, 3000);

    //method temizlendi
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Art Gallery</h1>
          <p>Discover unique and beautiful artworks from talented artists.</p>
          <Link to="/product-list" className="cta-button">
            Explore Our Works
          </Link>
        </div>
      </header>

      <section className="featured-section">
        <h2>Featured Works</h2>
        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="artwork-card">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="artwork-image"
              />
              <div className="artwork-details">
                <h3>{artwork.title}</h3>
                <p>By {artwork.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
