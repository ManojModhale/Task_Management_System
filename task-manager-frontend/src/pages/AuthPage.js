// src/pages/AuthPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/AuthPage.css'; // For the sliding animation and container styling

const AuthPage = () => {
  // Determine initial form based on URL query parameter (e.g., /auth?form=register)
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const formType = queryParams.get('form');
    if (formType === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true); // Default to login if no query or invalid
    }
  }, [location.search]); // Re-run when query params change

  // Function to switch between forms and update URL
  const toggleForm = (toLoginForm) => {
    setIsLogin(toLoginForm);
    navigate(`/auth?form=${toLoginForm ? 'login' : 'register'}`, { replace: true });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper-outer">
        <div className={`form-slider ${isLogin ? 'show-login' : 'show-register'}`}>
          <div className="form-slide login-slide">
            <LoginForm />
          </div>
          <div className="form-slide register-slide">
            <RegisterForm setIsLogin={() => toggleForm(true)} /> {/* Pass toggle function */}
          </div>
        </div>
        {/* <div className="auth-toggle-buttons">
          {isLogin ? (
            <p>Don't have an account? <button onClick={() => toggleForm(false)}>Register Here</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => toggleForm(true)}>Login Here</button></p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AuthPage;