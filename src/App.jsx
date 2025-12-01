// src/App.jsx
import bgImage from "./assets/home_background.jpg";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  return (
    <div
      className="hero-root"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay" />

      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
          {/* LEFT: LOGO */}
          <div className="logo">
            <img src={logo} alt="Stamatics Logo" className="logo-image" />
            <div className="logo-text">
              <span className="logo-title">Stamatics</span>
              <span className="logo-subtitle">IIT Kanpur</span>
            </div>
          </div>

          {/* RIGHT: SEARCH BAR (top) + LINKS (bottom) */}
          <div className="nav-right">
            <div className="nav-search">
              <input
                type="text"
                placeholder="Search..."
                className="nav-search-input"
              />
              <button className="nav-search-button">Search</button>
            </div>

            <nav className="nav-links">
              <a href="#who">Who We Are</a>
              <a href="#modules">Learning Modules</a>
              <a href="#resources">Resources</a>
              <a href="#team">Our Team</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <main className="hero-content">
        {/* LEFT: MAIN TEXT CENTERED VERTICALLY */}
        <section className="hero-left">
          <h1 className="hero-title">Stamatics IIT Kanpur</h1>
          <p className="hero-subtitle">
            The destination for students who seek to explore Mathematics,
            Statistics, and problem solving.
          </p>
          <button className="hero-button">Explore Competitions</button>
        </section>

        {/* RIGHT: LATEST BLOGS (with images) */}
        <section className="hero-right">
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

      {/* SCROLL ARROW */}
      <div className="scroll-indicator">
        <span className="scroll-arrow">↓</span>
      </div>
    </div>
  );
}

export default App;
