// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navLinkClass = ({ isActive }) =>
  "nav-link " + (isActive ? "nav-link-active" : "");

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LEFT LOGO (LINK TO HOME) */}
        <Link to="/" className="logo">
          <img src={logo} alt="Stamatics Logo" className="logo-image" />
          <div className="logo-text">
            <span className="logo-title">Stamatics</span>
            <span className="logo-subtitle">IIT Kanpur</span>
          </div>
        </Link>

        {/* RIGHT NAVIGATION */}
        <nav className="nav-links top-right-nav">


          {/* ABOUT US */}

          {/* About Us scrolls within Home for now */}

          <a href="/#about" className="nav-link">
            About Us
          </a>

          {/* COMPETITIONS DROPDOWN */}
          <div className="dropdown">
            <span className="dropdown-label">Competitions ▾</span>

            <div className="dropdown-menu">
              {/* These still scroll within Home for now */}
              <a href="/#integration" className="dropdown-item">
                Integration Bee
              </a>
              <a href="/#mathematica" className="dropdown-item">
                Mathematica
              </a>

              {/* Mathemania now has its own page */}
              <NavLink to="/mathemania" className="dropdown-item">
                Mathemania
              </NavLink>

              <a href="/#participants" className="dropdown-item">
                Participants
              </a>
            </div>
          </div>


          {/* BLOGS — FIXED: Now points to /blogs */}
          <NavLink to="/blogs" className={navLinkClass}>
            Blogs
          </NavLink>

          {/* TEAM — Still points to Home for now */}

          {/* BLOGS – can be routed later */}
          <NavLink to="/" className={navLinkClass}>
            Blogs
          </NavLink>

          {/* TEAM – can be routed later */}

          <NavLink to="/" className={navLinkClass}>
            Our Team
          </NavLink>

          {/* CONTACT PAGE */}
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
