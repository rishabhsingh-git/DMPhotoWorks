import React from "react";
import "./AboutContact.css"; // Importing the CSS file for styling

const AboutContact = () => {
  return (
    <div className="about-contact-container">
      <div className="about-section">
        <h1>About Me</h1>
        <img
          src="path_to_author_image.jpg"
          alt="Author"
          className="author-image"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in gravida
          nulla. Proin quis tortor eget elit sagittis pretium.
        </p>
      </div>

      <div className="contact-section">
        <h1>Contact Me</h1>
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutContact;
