// src/components/common/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const centerLinks = [
  { label: "Who We Are", to: "/about" },
  { label: "Learning Modules", to: "/competitions" },
  { label: "Resources", to: "/blogs" },
  { label: "Our Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Slight dark overlay + blur over the background image */}
      <div className="backdrop-blur-md bg-black/20">
        <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 md:px-4">
          {/* LEFT: LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
              <span className="text-xs font-bold text-black">St</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-sm font-semibold">
                Statamatics
              </span>
              <span className="text-gray-300 text-xs">
                IIT Kanpur
              </span>
            </div>
          </Link>

          {/* CENTER: NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {centerLinks.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`transition-colors ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: AUTH / CTA */}
          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-300 hover:text-white transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
              Enroll Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
