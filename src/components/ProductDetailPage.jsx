import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import { fetchArtworkById } from "../Api";
import { CartContext } from '../cart/CartContext';
import { faker } from "@faker-js/faker";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const getArtwork = async () => {
      try {
        const data = await fetchArtworkById(id);

        const updatedArtwork = {
          ...data,
          description: data.description || faker.lorem.sentence(),
          price: data.price || faker.number.int({ min: 100, max: 5000 }),
        };

        setArtwork(updatedArtwork);
      } catch (error) {
        setError('Error fetching artwork.');
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    getArtwork();
  }, [id]);

  const handleAddToCart = () => {
    if (artwork) {
      addItem(artwork);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!artwork) return <div className="error-message">No artwork found.</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-section">
        <h1>{artwork.title}</h1>
        <img
          src={artwork._links?.thumbnail?.href.replace("{image_version}", "large") || "https://via.placeholder.com/600"}
          alt={artwork.title || "No title available"}
        />
        <p>{artwork.description || "No description available"}</p>
        <p>{artwork.price ? `${artwork.price} TL` : "Price Unknown"}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

