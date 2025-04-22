import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// AuthContext provides authentication state and actions to the app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Firebase user object
  const [loading, setLoading] = useState(true); // Loading state for auth

  // Sign up with email and password
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Sign in with email and password
  const signin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Sign out the current user
  const logout = () => signOut(auth);

  // Listen for auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Provide auth state and actions to children
  const value = { currentUser, signup, signin, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when auth state is ready */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
