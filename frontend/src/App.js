import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ExercisesPage from './pages/ExercisesPage';
import SavedExercises from './pages/SavedExercises';
import Settings from './pages/Settings';
import Plans from './pages/Plans';
import Notifications from './pages/Notifications';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LandingNavbar from './components/LandingNavbar';
import DashboardNavbar from './components/DashboardNavbar';
import Footer from './components/Footer';
const App = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';
  
  const showDashboardNavbar = token && !isAuthPage && !isLandingPage;

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}> 
        {showDashboardNavbar ? <DashboardNavbar /> : <LandingNavbar />}

        <Box sx={{ maxWidth: '1400px', margin: '0 auto', px: { xs: '10px', sm: '20px' }, pt: '70px' }}>


          <Routes>
              {/* Public Routes - Logged in users redirected to dashboard */}
              <Route path="/" element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />

              {/* Protected Routes - Guests redirected to login */}
              <Route path="/exercise/:id" element={
                <ProtectedRoute>
                  <ExerciseDetail />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/exercises" element={
                <ProtectedRoute>
                  <ExercisesPage />
                </ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <SavedExercises />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/plans" element={
                <ProtectedRoute>
                  <Plans />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              } />
              <Route path="/search" element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
        <Footer />
    </Box>
  )
}

export default App