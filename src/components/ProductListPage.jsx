import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
//import mockData from "../mockData";
import "./ProductListPage.css";
import { fetchArtworks } from "../Api";
import { faker } from "@faker-js/faker";

const ProductListPage = () => {

  const [filter, setFilter] = useState("all"); //eserleri filtrelemek için
  const [searchQuery, setSearchQuery] = useState(""); //arama yapacağız
  const [loading, setLoading] = useState(true); //verimizin yüklenme durumu
  const [error, setError] = useState(null); //hata durumu
  const [artworks, setArtworks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const artworksPerPage = 100;

  const location = useLocation(); //url konumu
  const searchParams = new URLSearchParams(location.search); //urldeki sorgu parametreleri
  const urlSearchQuery = searchParams.get("search") || ""; //arama sorgusu alindi

  useEffect(() => {
    const getArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchArtworks(page, artworksPerPage);

        // Rastgele açıklama ve fiyat ekleme
        const updatedArtworks = newArtworks.map((artwork) => ({
          ...artwork,
          description: faker.lorem.sentence(), // Rastgele açıklama
          price: faker.number.int({ min: 100, max: 5000 }) // Rastgele fiyat
        }));
        console.log(updatedArtworks);

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
                <Link key={item.id} to={`/product/${item.id}`} className="product-card">
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