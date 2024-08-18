import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../Api';
import './Artists.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const artistsPerPage = 100;

  useEffect(() => {
    const getArtists = async () => {
      setLoading(true);
      try {
        const newArtists = await fetchArtists(page, artistsPerPage);
        if (newArtists.length > 0) {
          setArtists((prevArtists) => [...prevArtists, ...newArtists]);
          setHasMore(newArtists.length === artistsPerPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setError('Error fetching artists.');
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && artists.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="artists-container">
      <h1>Artists</h1>
      <div className="artists-grid">
        {artists.length > 0 ? (
          artists.map((artist) => {
            const imageHref = artist._links?.thumbnail?.href
              ? artist._links.thumbnail.href.replace("{image_version}", "large")
              : "https://via.placeholder.com/150";

            return (
              <div key={artist.id} className="artist-card">
                <img
                  src={imageHref}
                  alt={artist.name || "No name available"}
                  className="artist-image"
                />
                <div className="artist-details">
                  <h2>{artist.name}</h2>
                  <p>{artist.biography || "No biography available"}</p>
                  <p>Born: {artist.birthday || "N/A"}</p>
                  <p>Died: {artist.deathday || "N/A"}</p>
                  <p>Location: {artist.location || "N/A"}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No artists found.</p>
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

export default Artists;
