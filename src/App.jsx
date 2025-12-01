// src/App.jsx
import { useEffect, useRef, useState } from "react";
import bgImage from "./assets/home_background.jpg";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const aboutRef = useRef(null);
  const heroRef = useRef(null);

  const [showAbout, setShowAbout] = useState(false);
  const autoScrollingRef = useRef(false);

  const smoothScrollTo = (targetY, duration = 1000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    autoScrollingRef.current = true;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        autoScrollingRef.current = false;
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToAbout = () => {
    if (!aboutRef.current) return;
    const targetY =
      aboutRef.current.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY, 1000); // 1s smooth scroll
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setShowAbout(true);
    scrollToAbout();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (autoScrollingRef.current) return; // ignore during auto scroll
      if (!aboutRef.current) return;

      const rect = aboutRef.current.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.65;

      if (rect.top < triggerPoint) {
        if (!showAbout) {
          setShowAbout(true);
          scrollToAbout();
        }
      } else {
        if (showAbout) {
          setShowAbout(false);
        }
      }
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAbout]);

  return (
    <div className="page-root">
      {/* HERO TOP AREA WITH BACKGROUND IMAGE */}
      <div
        className="hero-root"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay" />

        {/* NAVBAR */}
        <header className="navbar">
          <div className="navbar-inner">
            {/* LEFT LOGO */}
            <div className="logo">
              <img src={logo} alt="Stamatics Logo" className="logo-image" />
              <div className="logo-text">
                <span className="logo-title">Stamatics</span>
                <span className="logo-subtitle">IIT Kanpur</span>
              </div>
            </div>

            {/* RIGHT NAVIGATION LINKS + HOVER DROPDOWN */}
            <nav className="nav-links top-right-nav">
              <a href="#about" onClick={handleAboutClick}>
                About Us
              </a>

              {/* COMPETITIONS DROPDOWN */}
              <div className="dropdown">
                <span className="dropdown-label">Competitions ▾</span>

                <div className="dropdown-menu">
                  <a href="#integration">Integration Bee</a>
                  <a href="#mathematica">Mathematica</a>
                  <a href="#mathemania">Mathemania</a>
                  <a href="#participants">Participants</a>
                </div>
              </div>

              <a href="#blogs">Blogs</a>
              <a href="#team">Our Team</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* MAIN HERO CONTENT (TOP SECTION) */}
        <main
          className={`hero-content ${showAbout ? "hero-hidden" : ""}`}
          ref={heroRef}
        >
          {/* LEFT HERO TEXT */}
          <section className="hero-left">
            <h1 className="hero-title">Stamatics IIT Kanpur</h1>
            <p className="hero-subtitle">
              The destination for students who seek to explore Mathematics,
              Statistics, and problem solving.
            </p>
            <button className="hero-button">Explore Competitions</button>
          </section>

          {/* RIGHT BLOGS PANEL */}
          <section className="hero-right" id="blogs">
            <div className="newsletter-card">
              <h3 className="newsletter-title">Latest Blogs</h3>

              <div className="blog-list">
                <article className="blog-item">
                  <div className="blog-thumbnail">
                    <img
                      src="https://via.placeholder.com/80x60"
                      alt="Why Problem Solving Competitions Matter"
                    />
                  </div>
                  <div className="blog-info">
                    <h4 className="blog-title">
                      Why Problem Solving Competitions Matter
                    </h4>
                    <p className="blog-meta">Community · 5 min read</p>
                    <button className="blog-link">Read more →</button>
                  </div>
                </article>

                <article className="blog-item">
                  <div className="blog-thumbnail">
                    <img
                      src="https://via.placeholder.com/80x60"
                      alt="A Beginner's Guide to Mathematical Thinking"
                    />
                  </div>
                  <div className="blog-info">
                    <h4 className="blog-title">
                      A Beginner&apos;s Guide to Mathematical Thinking
                    </h4>
                    <p className="blog-meta">Learning · 7 min read</p>
                    <button className="blog-link">Read more →</button>
                  </div>
                </article>

                <article className="blog-item">
                  <div className="blog-thumbnail">
                    <img
                      src="https://via.placeholder.com/80x60"
                      alt="Inside Stamatics: Events, Talks, and More"
                    />
                  </div>
                  <div className="blog-info">
                    <h4 className="blog-title">
                      Inside Stamatics: Events, Talks, and More
                    </h4>
                    <p className="blog-meta">Campus · 6 min read</p>
                    <button className="blog-link">Read more →</button>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </main>

        {/* SCROLL ARROW (OPTIONAL – POINTS DOWN FROM HERO) */}
        <div className="scroll-indicator">
          <span className="scroll-arrow">↓</span>
        </div>
      </div>

      {/* ABOUT US SECTION (FULL-PAGE BELOW HERO) */}
      <section
        className={`about-section ${showAbout ? "about-visible" : ""}`}
        id="about"
        ref={aboutRef}
      >
        <div className="about-inner">
          <h2 className="about-title">About Us</h2>
          <p className="about-text">
            Stamatics is the official student group at IIT Kanpur dedicated to
            the love of Mathematics and Statistics. We organise problem-solving
            contests, talks, workshops, and learning sessions to help students
            explore the beauty of mathematical thinking beyond the classroom.
          </p>

          <div className="about-grid">
            <div className="about-card">
              <h3>What We Do</h3>
              <p>
                From Integration Bee and Mathematica to Mathemania, we design
                events that challenge, inspire, and build a strong problem-solving
                culture on campus.
              </p>
            </div>
            <div className="about-card">
              <h3>Who We Are</h3>
              <p>
                A community of students who enjoy puzzles, proofs, probability,
                and everything in between—open to enthusiasts from all
                departments and years.
              </p>
            </div>
            <div className="about-card">
              <h3>Why Join</h3>
              <p>
                Meet like-minded peers, compete in challenging events, learn new
                ideas, and contribute to a growing math community at IIT Kanpur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
