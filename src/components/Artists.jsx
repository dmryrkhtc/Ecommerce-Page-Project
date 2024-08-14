import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "https://66bc896924da2de7ff6af509.mockapi.io/api/v1/artists"
        );
        setArtists(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="artists-container">
      <h1>Our Featured Artists</h1>
      <div className="artists-grid">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            {artist.image && (
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
            )}
            <h2>{artist.name}</h2>
            <p>
              {(artist.artworks && artist.artworks.length) || 0} works available
            </p>
            <div className="artworks-list">
              {artist.artworks &&
                artist.artworks.map((artwork) => (
                  <div key={artwork.id} className="artwork-item">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="artwork-thumb"
                    />
                    <p>{artwork.title}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
