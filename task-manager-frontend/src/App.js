import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { AuthContext } from './context/AuthContext';
import TasksDashboard from './pages/TasksDashboard';
import NotFoundPage from './pages/NotFoundPage';

// A simple PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <TasksDashboard/>
            </PrivateRoute>}  />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
