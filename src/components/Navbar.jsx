import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaBars, FaSignOutAlt, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/workouts", label: "Workouts" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get full name from sessionStorage/localStorage
  const [fullName] = useState(() => {
    let name = sessionStorage.getItem("user_fullname");
    if (!name && currentUser?.email) {
      name = localStorage.getItem(`user_fullname_${currentUser.email}`) || "";
      sessionStorage.setItem("user_fullname", name);
    }
    return name || "";
  });

  // Responsive Navbar
  return (
    <nav className="navbar glassy-navbar">
      <div className="container flex items-center justify-between w-full">
        <Link to="/" className="logo flex items-center gap-2">
          <img
            src="/src/assets/fitness-tracker-logo.png"
            alt="Logo"
            className="h-10 w-10 max-w-[48px] max-h-[48px] rounded-full shadow-md border-2 border-accent animate-pulse object-cover"
          />
          <span className="font-extrabold text-2xl tracking-wide text-white drop-shadow-lg">
            TrackTonic
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 mx-auto">
          {navLinks.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-5 py-2 rounded-xl font-bold transition-all duration-200 ${
                    isActive ? "active-tab" : "inactive-tab"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Theme + User + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="darkmode-btn"
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>
          <span className="hidden lg:flex items-center justify-center bg-accent text-white font-bold rounded-full w-10 h-10 text-lg uppercase shadow-md">
            {getInitials(fullName)}
          </span>
          <FaSignOutAlt
            onClick={() => {
              logout();
              sessionStorage.removeItem("user_fullname");
            }}
            className="hidden lg:block text-xl cursor-pointer hover:text-accent transition-transform duration-300 transform hover:scale-125"
            title="Logout"
            tabIndex={0}
            aria-label="Logout"
          />
          {/* Hamburger */}
          <button
            className="lg:hidden ml-2 p-2 rounded-full bg-white/80 hover:bg-accent transition"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Open navigation menu"
          >
            {mobileOpen ? (
              <FaTimes className="text-2xl text-primary" />
            ) : (
              <FaBars className="text-2xl text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end lg:hidden transition-all duration-300">
          <div
            className="w-72 max-w-full h-full bg-gradient-to-b from-primary/90 via-secondary/90 to-accent/90
            shadow-2xl rounded-l-3xl p-8 flex flex-col gap-8 animate-slideInRight
            border-l-4 border-accent/80 backdrop-blur-xl relative"
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <FaTimes className="text-3xl text-white hover:text-accent transition" />
            </button>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-200 ${
                      isActive ? "active-tab" : "inactive-tab"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="flex items-center justify-center bg-accent text-white font-bold rounded-full w-10 h-10 text-lg uppercase shadow-md">
                {getInitials(fullName)}
              </span>
              <FaSignOutAlt
                onClick={() => {
                  logout();
                  sessionStorage.removeItem("user_fullname");
                }}
                className="text-xl cursor-pointer hover:text-accent transition-transform duration-300 transform hover:scale-125"
                title="Logout"
                tabIndex={0}
                aria-label="Logout"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
