// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../store/UserContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUserContext();

  if (loading) {
    return <div className="text-center mt-10"><LoadingSpinner/></div>
  }

  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
