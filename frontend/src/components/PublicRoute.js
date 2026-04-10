import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const PublicRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  // If user is already logged in, redirect them away from landing/login/signup to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
