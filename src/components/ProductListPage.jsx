import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ProductListPage.css";
import { fetchArtworks } from "../Api";
import { faker } from "@faker-js/faker";
import { CartContext } from '../cart/CartContext'; // CartContext importu

const ProductListPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const artworksPerPage = 100;
  const { addItem } = useContext(CartContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search") || "";



  useEffect(() => {
    const getArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchArtworks(page, artworksPerPage);

        const updatedArtworks = newArtworks.map((artwork) => ({
          ...artwork,
          description: faker.lorem.sentence(),
          price: faker.number.int({ min: 100, max: 5000 })
        }));
        setArtworks((prevArtworks) => [...prevArtworks, ...updatedArtworks]);
        setHasMore(newArtworks.length === artworksPerPage);
      } catch (error) {
        setError("Error fetching artworks.");
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    getArtworks();
  }, [page]);

  useEffect(() => {
    setSearchQuery(urlSearchQuery.toLowerCase());
  }, [urlSearchQuery]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredData = artworks.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (item.subcategory &&
        item.subcategory.toLowerCase() === filter.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      (item.title && item.title.toLowerCase().includes(searchQuery)) ||
      (item.artist_names &&
        item.artist_names.join(", ").toLowerCase().includes(searchQuery)) ||
      (item.category && item.category.toLowerCase().includes(searchQuery)) ||
      (item.subcategory &&
        item.subcategory.toLowerCase().includes(searchQuery));

    return matchesFilter && matchesSearch;
  });

  const handleAddToCart = (item) => {
    addItem(item);
  };

  if (loading && artworks.length === 0) {
    return (
      <div className="loading-container">
        Loading...
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <h1>Works</h1>
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {Array.from(
          new Set(artworks.map((item) => item.subcategory).filter(Boolean))
        ).map((subcategory) => (
          <button
            key={subcategory}
            className={filter === subcategory ? "active" : ""}
            onClick={() => setFilter(subcategory)}
          >
            {subcategory}
          </button>
        ))}
      </div>
      {loading && filteredData.length === 0 ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} className="product-card">
                  <Link to={`/product/${item.id}`} className="product-link">
                    <img
                      src={
                        item._links?.thumbnail?.href.replace(
                          "{image_version}",
                          "large"
                        ) || "https://via.placeholder.com/300"
                      }
                      alt={item.title || "No title available"}
                      className="product-image"
                    />
                    <h2>{item.title || "Untitled"}</h2>
                    <p>{item.description || "Description not available"}</p>
                    <p>{item.price ? `${item.price} TL` : "Price Unknown"}</p>
                  </Link>
                  <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          {hasMore && (
            <button onClick={loadMore} className="load-more-button">
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListPage;
