import React, { useState } from "react";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Our dental clinic has been serving the local community for over 20 years.
        We provide a full range of dental services, from routine checkups to
        advanced surgical procedures. Our team of experienced dentists and
        hygienists are committed to providing the best possible care for your
        oral health.
      </p>
      <h1>Our other projects:</h1>
      <nav>
        <Link to="http://kitchencompany.com/">Kitchen Company</Link> | <Link to="/toothmarket">Secret Tooth Market</Link>
      </nav>
    </div>
  );
};

export default About;
