import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams(); // Ürün ID'sini al
  const [product, setProduct] = useState(null); // API'den alınan ürün bilgisi
  const [loading, setLoading] = useState(true); // Verimizin yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  useEffect(() => {
    axios
      .get(`https://66bc896924da2de7ff6af509.mockapi.io/api/v1/artworks/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="product-info">
        <h1>{product.title}</h1>
        <img
          src={product.image} // Doğru alan adı
          alt={product.title}
          className="product-detail-image"
        />
        <p className="product-category">
          {product.category} - {product.subcategory}
        </p>
        <p className="product-price">Price: {product.price} TL</p>
        <p className="product-description">{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
