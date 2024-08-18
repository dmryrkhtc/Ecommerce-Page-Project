




import React, { useState, useEffect } from "react";
import { fetchArtworks } from "../Api";
import "./Home.css";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const data = await fetchArtworks(1, 50);
        console.log("Fetched Artworks:", data);
        if (Array.isArray(data) && data.length > 0) {
          setArtworks(data);
          setCurrentArtwork(data[0]);
        } else {
          setError("No artworks found.");
        }
      } catch (error) {
        setError("Error fetching artworks.");
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    getArtworks();
  }, []);

  useEffect(() => {
    if (artworks.length === 0) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * artworks.length);
      setCurrentArtwork(artworks[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [artworks]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Art Gallery</h1>
          <p>Discover unique and beautiful artworks from talented artists.</p>
        </div>
      </header>

      <section className="featured-section">
        <h2>Featured Artwork</h2>
        <div className="artwork-card">
          {currentArtwork ? (
            <>
              <img
                src={
                  currentArtwork._links?.thumbnail?.href.replace(
                    "{image_version}",
                    "large"
                  ) || "https://via.placeholder.com/500"
                }
                alt={currentArtwork.title || "No title available"}
                className="artwork-image"
              />
              <div className="artwork-details">
                <h3>{currentArtwork.title || "Untitled"}</h3>
                <p>
                  By{" "}
                  {currentArtwork.artist_names
                    ? currentArtwork.artist_names.join(", ")
                    : "Unknown Artist"}
                </p>
                <p>Price: {currentArtwork.price ? `${currentArtwork.price} TL` : "Price Unknown"}</p>
              </div>
            </>
          ) : (
            <p>No artwork available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;