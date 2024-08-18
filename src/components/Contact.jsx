import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  //verileri yonetmek icin useState kullandık
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, //onceki form verileri tutuluyor
      [name]: value, //degisiklik yapilan alanı guncelledik
    });
  };
  // formu gondermek icin handleSubmit fonsiyonu olusturdum
  const handleSubmit = (e) => {
    //sayfanin yeniden yuklenmesini engelledi
    e.preventDefault();

    console.log("Form submitted:", formData);

    alert("Thank you for contacting us!");
  };

  return (

    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      <section className="contact-info">
        <h2>Our Contact Information</h2>
        <p>
          <strong>Address:</strong> 123 Art Street, Art City, ART 45678
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Email:</strong> contact@artgallery.com
        </p>
      </section>
    </div>
  );
};

export default Contact;
