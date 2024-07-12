import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import logo from './logo.svg';
import "./App.css";
import Contact from "./Contact";
import Services from "./Services";
import About from "./About";
import Reviews from "./Reviews";
import ToothMarket from "./ToothMarket"

const HomePage = () => (
  <div>
    <h1>Welcome to Our Dentist Website</h1>
    <p>Providing excellent dental care for all your needs.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <Link to="/">Home</Link> | <Link to="/services">Services</Link> | <Link to="/contact">Contact</Link> | <Link to="/reviews">Reviews</Link> | <Link to="/about">About</Link>
          </nav>
        </header>
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              <Route path="/toothmarket" element={<ToothMarket />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
