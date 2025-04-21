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
            src="/fitness-tracker-logo.png"
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
            className="lg:hidden ml-2 p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            style={{ zIndex: 1001 }}
          >
            {mobileOpen ? (
              <FaTimes className="text-3xl text-white" />
            ) : (
              <FaBars className="text-3xl text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex flex-col justify-end lg:hidden transition-all duration-300">
          <div className="w-full h-[70vh] bg-gradient-to-b from-primary via-secondary to-accent shadow-2xl rounded-t-3xl p-8 flex flex-col gap-8 animate-slideInRight border-t-4 border-accent/80 relative">
            <button
              className="absolute top-4 right-4 bg-white/90 text-accent rounded-full p-3 shadow-lg border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              style={{ zIndex: 1001 }}
            >
              <FaTimes className="text-3xl" />
            </button>
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `w-full text-center py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary scale-105"
                        : "bg-white/20 text-white hover:bg-white/40 hover:text-primary"
                    }`
                  }
                  style={{
                    letterSpacing: "0.04em",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-auto justify-center">
              <span className="flex items-center justify-center bg-accent text-white font-bold rounded-full w-12 h-12 text-xl uppercase shadow-md">
                {getInitials(fullName)}
              </span>
              <button
                onClick={() => {
                  logout();
                  sessionStorage.removeItem("user_fullname");
                }}
                className="bg-white/90 text-accent rounded-full p-3 shadow-lg border-2 border-accent hover:bg-accent hover:text-white transition"
                title="Logout"
                tabIndex={0}
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
