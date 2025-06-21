// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to hold authentication information
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userId: null,
    username: null,
  });

  // Load authentication state from sessionStorage when the component mounts
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const storedUsername = sessionStorage.getItem('username');

    if (storedUserId && storedUsername) {
      setAuthState({
        isAuthenticated: true,
        userId: storedUserId,
        username: storedUsername,
      });
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle user login
  const login = (userId, username) => {
    setAuthState({
      isAuthenticated: true,
      userId,
      username,
    });
    // Store in localStorage for persistence across page refreshes
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('username', username);
  };

  // Function to handle user logout
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userId: null,
      username: null,
    });
    // Remove from localStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
  };

  // Provide the authState and login/logout functions to children components
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};