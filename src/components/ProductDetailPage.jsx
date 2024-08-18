import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import { fetchArtworkById } from "../Api";
import { CartContext } from '../cart/CartContext'; // CartContext importu
import { faker } from "@faker-js/faker";

const ProductDetailPage = () => {
  const { id } = useParams(); // Ürün ID'sini al
  const [artwork, setArtwork] = useState(null); // API'den alınan ürün bilgisi
  const [loading, setLoading] = useState(true); // Verimizin yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu
  const { addItem } = useContext(CartContext); // CartContext'ten addItem fonksiyonunu al

  useEffect(() => {
    const getArtwork = async () => {
      try {
        const data = await fetchArtworkById(id);

        // Veri yoksa faker kullanarak güncelle
        const updatedArtwork = {
          ...data,
          description: data.description || faker.lorem.sentence(),
          price: data.price || faker.number.int({ min: 100, max: 5000 }), // `faker.number.int` kullanıldı
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
  if (error) return <div>{error}</div>;
  if (!artwork) return <div>No artwork found.</div>;

  return (
    <div className="product-detail-page">
      <h1>{artwork.title}</h1>
      <img
        src={artwork._links?.thumbnail?.href.replace("{image_version}", "large") || "https://via.placeholder.com/600"}
        alt={artwork.title || "No title available"}
      />
      <p>{artwork.description || "No description available"}</p>
      <p>{artwork.price ? `${artwork.price} TL` : "Price Unknown"}</p>
      <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;

