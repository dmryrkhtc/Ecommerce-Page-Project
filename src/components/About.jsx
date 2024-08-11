import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header"></header>
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          Our mission is to showcase and celebrate the most innovative and
          captivating artworks from talented artists around the world.
        </p>
        <h2>Our Team</h2>
        <p>
          We are a passionate team dedicated to connecting artists with art
          lovers. Our team consists of art enthusiasts, curators, and creatives
          who work tirelessly to bring the best art to you.
        </p>
        <h2>Our Vision</h2>
        <p>
          We envision a world where art is accessible to everyone, and where
          artists have the platform to share their creative visions with the
          world.
        </p>
      </section>
    </div>
  );
};

export default About;
