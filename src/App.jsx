// Main App component: handles global providers and all routing for the app.
// Wraps the app with ThemeProvider and AuthProvider for global state.
// Shows either the authenticated app or the authentication page based on login state.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import "./App.css";

const App = () => {
  return (
    // Provide theme context (dark/light mode) to the entire app
    <ThemeProvider>
      {/* Provide authentication context (user, login, logout) */}
      <AuthProvider>
        <BrowserRouter>
          {/* Use AuthContext to determine if user is logged in */}
          <AuthContext.Consumer>
            {({ currentUser }) => (
              <div className="flex flex-col min-h-screen">
                {currentUser ? (
                  // If authenticated, show the main app with navigation and routes
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/workouts" element={<Workouts />} />
                      <Route path="/tutorials" element={<Tutorials />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </>
                ) : (
                  // If not authenticated, show only the authentication page
                  <Routes>
                    <Route path="*" element={<Authentication />} />
                  </Routes>
                )}
              </div>
            )}
          </AuthContext.Consumer>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
