// Main App component that handles routing and authentication context.
// Wraps the application with ThemeProvider and AuthProvider for global state management.
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
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Consuming AuthContext to determine if the user is logged in */}
          <AuthContext.Consumer>
            {({ currentUser }) => (
              <div className="flex flex-col min-h-screen">
                {currentUser ? (
                  <>
                    {/* Render Navbar and authenticated routes */}
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
                  // Redirect to Authentication page if not logged in
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
