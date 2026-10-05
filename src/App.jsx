// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboardHome } from './components/StudentDashboardHome';
import { StudentFeesPage } from './pages/StudentFeesPage';
import { StudentLeavePage } from './pages/StudentLeavePage';
import { StudentComplaintsPage } from './pages/StudentComplaintsPage';
import { StyleInjector } from './assets/StyleInjector';
import { useState } from 'react';
import { StudentLayout } from './layouts/StudentLayout';

export default function App() {
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch (err) {
      console.warn('Error reading token from localStorage', err);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn('Error parsing user from localStorage', err);
      return null;
    }
  });

  // userData is expected to come from LoginPage (id, password, userType or similar)
  const handleLogin = async ({ id, password, userType }) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password, userType }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Login error:', data?.message || 'Login failed');
        setLoginError(data?.message || 'Login failed');
        return;
      }

      if (!data.token || !data.user) {
        console.error('Backend did not send token/user:', data);
        setLoginError('Server error: invalid login response');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      console.error('Network error:', err);
      setLoginError('Network error: could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <StyleInjector />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
            !user ? (
            <LoginPage
              onLogin={handleLogin}
              isLoading={isLoading}
              error={loginError}
            />
            ) : (
            <Navigate
              to={user.userType === 'student' ? '/student' : '/warden'}
              replace
            />
            )
          }
        />

          
        <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Student Routes - Protected */}
          <Route 
            path="/student" 
            element={
              user && user.userType === 'student' ? (
                <StudentLayout user={user} onLogout={handleLogout}>
                  <StudentDashboardHome user={user} />
                </StudentLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route
            path="/student/fees"
            element={
              user && user.userType === 'student' ? (
                <StudentLayout user={user} onLogout={handleLogout}>
                <StudentFeesPage roll_no={user.roll_no} />
                </StudentLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route 
            path="/student/leave" 
            element={
              user && user.userType === 'student' ? (
                <StudentLayout user={user} onLogout={handleLogout}>
                  <StudentLeavePage user={user} />
                </StudentLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/student/complaints" 
            element={
              user && user.userType === 'student' ? (
                <StudentLayout user={user} onLogout={handleLogout}>
                  <StudentComplaintsPage user={user} />
                </StudentLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Warden Routes - Protected */}
          <Route 
            path="/warden" 
            element={
              user && user.userType === 'warden' ? (
                <WardenLayout user={user} onLogout={handleLogout}>
                   <WardenDashboardHome user={user} />
                </WardenLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
