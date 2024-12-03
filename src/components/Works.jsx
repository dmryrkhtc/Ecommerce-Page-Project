import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Works.css";
import { fetchArtworks } from "../Api";

const Works = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true); // Verimizin yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const artworksPerPage = 100;

  useEffect(() => {
    const getArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchArtworks(currentPage, artworksPerPage);
        if (newArtworks.length > 0) {
          setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
          setHasMore(newArtworks.length === artworksPerPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setError('Error fetching artworks.');
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    getArtworks();
  }, [currentPage]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
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
    <div className="works-container">
      <div className="works-grid">
        {artworks.length > 0 ? (
          artworks.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="work-card">
              <img
                src={
                  item._links?.thumbnail?.href.replace(
                    "{image_version}",
                    "large"
                  ) || "https://via.placeholder.com/300"
                }
                alt={item.title || "No title available"}
                className="work-image"
              />
              <h3>{item.title || "Untitled"}</h3>
              <p>{item.price ? `${item.price} TL` : "Price Unknown"}</p>
            </Link>
          ))
        ) : (
          <p>No artworks found.</p>
        )}
      </div>
      {hasMore && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Works;

