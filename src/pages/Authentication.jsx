import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Authentication page: handles both sign up and sign in forms
const Authentication = () => {
  const { signup, signin } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign up/in
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit for sign up or sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        // Validate name for sign up
        if (!formData.name.trim()) {
          setError("Full name is required.");
          setLoading(false);
          return;
        }
        await signup(formData.email, formData.password);
        // Stores full name in localStorage and sessionStorage
        localStorage.setItem(
          `user_fullname_${formData.email}`,
          formData.name.trim()
        );
        sessionStorage.setItem("user_fullname", formData.name.trim());
        alert("Sign Up Successful!");
      } else {
        await signin(formData.email, formData.password);
        // On login, fetch full name and store in sessionStorage
        const name =
          localStorage.getItem(`user_fullname_${formData.email}`) || "";
        sessionStorage.setItem("user_fullname", name);
      }
    } catch (err) {
      setError(err.message);
      console.error("Auth error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Show name field only for sign up */}
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {error && <p className="text-red-500 mb-4 animate-fadeIn">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)} className="switch-link">
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
