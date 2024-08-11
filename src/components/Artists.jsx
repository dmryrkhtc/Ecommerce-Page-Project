import React from "react";
import "./Artists.css";
import mockData from "../mockData";

const Artists = () => {
  const artistNames = Array.from(new Set(mockData.map((item) => item.artist)));

  const artistData = artistNames.map((artist) => {
    const artworks = mockData.filter((item) => item.artist === artist);

    const artistImage = artworks.length > 0 ? artworks[0].image : null;

    return { name: artist, artworks, image: artistImage };
  });

  return (
    <div className="artists-container">
      <h1>Our Featured Artists</h1>
      <div className="artists-grid">
        {artistData.map((artist, index) => (
          <div className="artist-card" key={index}>
            {artist.image && (
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
            )}
            <h2>{artist.name}</h2>
            <p>{artist.artworks.length} works available</p>
            <div className="artworks-list">
              {artist.artworks.map((artwork, i) => (
                <div key={i} className="artwork-item">
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
