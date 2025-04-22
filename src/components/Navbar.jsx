import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaBars, FaSignOutAlt, FaTimes, FaMoon, FaSun } from "react-icons/fa";

// Navigation links for the main app sections
const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/workouts", label: "Workouts" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

// Helper to get user initials for avatar circle
function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Navbar = () => {
  // Auth and theme context hooks
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // State for mobile menu open/close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user's full name from session/local storage for avatar
  const [fullName] = useState(() => {
    let name = sessionStorage.getItem("user_fullname");
    if (!name && currentUser?.email) {
      name = localStorage.getItem(`user_fullname_${currentUser.email}`) || "";
      sessionStorage.setItem("user_fullname", name);
    }
    return name || "";
  });

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between w-full">
        {/* Logo and app name */}
        <Link to="/" className="logo flex items-center gap-2">
          <img
            src="/fitness-tracker-logo.png"
            alt="Logo"
            className="h-10 w-10 max-w-[48px] max-h-[48px] rounded-full shadow-md border-2 border-accent animate-pulse object-cover"
          />
          <span className="font-extrabold text-2xl tracking-wide text-white drop-shadow-lg">
            TrackTonic
          </span>
        </Link>

        {/* Desktop navigation links */}
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

        {/* Right section: theme toggle, user avatar, sign out, mobile menu */}
        <div className="flex items-center gap-4">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="darkmode-btn flex items-center justify-center"
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* User initials avatar */}
          <div className="user-initials">{getInitials(fullName)}</div>

          {/* Desktop sign out button */}
          <button
            onClick={() => {
              logout();
              sessionStorage.removeItem("user_fullname");
            }}
            className="signOutBtn lg:flex items-center bg-gradient-to-r from-accent to-primary text-white rounded-full text-xl font-bold gap-2 shadow-lg hover:scale-110 hover:from-red-500 hover:to-red-700 transition-all"
            aria-label="Logout"
            style={{ fontSize: 28, border: "none", marginLeft: "1rem" }}
          >
            <FaSignOutAlt className="text-2xl" />
          </button>

          {/* Hamburger menu for mobile */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="icon" />
            ) : (
              <FaBars className="icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay and drawer */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Slide-out mobile navigation */}
        <div className={`mobile-nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile sign out button */}
          <button
            className="sign-out-button"
            onClick={() => {
              logout();
              sessionStorage.removeItem("user_fullname");
            }}
          >
            <FaSignOutAlt className="text-xl" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
