// src/pages/Home.jsx

import { Link } from "react-router-dom";
import "../styles/pages/home.css";
import bgImage from "../assets/home_background.jpg";

function Home() {
  return (
    <div
      className="hero-root"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay" />

      <main className="hero-content">
        {/* LEFT COLUMN */}
        <section className="hero-left">
          {/* CENTERED TITLE BLOCK */}
          <div className="hero-center">
            <h1 className="hero-title">
              <span>Stamatics</span>
              <br />
              <span>IIT Kanpur</span>
            </h1>

            <p className="hero-subtitle">
              Bring problems. Leave with answers.
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN (EMPTY FOR BALANCE) */}
        <section className="hero-right" />
      </main>

      <div className="scroll-indicator">
        <span className="scroll-arrow">↓</span>
      </div>
    </div>
  );
}

export default Home;
