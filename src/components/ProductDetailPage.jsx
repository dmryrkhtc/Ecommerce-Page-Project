import React from "react";
import { useParams } from "react-router-dom";
import mockData from "../mockData";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams(); //urun id aldik
  const product = mockData.find((item) => item.id === parseInt(id)); //id eslesen urun

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="product-info">
        <h1>{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
        <p className="product-category">
          {product.category} - {product.subcategory}
        </p>
        <p className="product-price">Price: {product.price} TL</p>
        <p className="product-description">{product.description}</p>{" "}
        {/* mockData'ya description eklersem diye */}
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
