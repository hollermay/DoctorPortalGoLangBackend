import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'doctor', 'receptionist', 'patient'] },
];

function Sidebar({ role, onLogout }: { role: string; onLogout: () => void }) {
  return (
    <nav className="sidebar">
      <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '2rem', color: '#1976d2' }}>
        CityCare Hospital
      </div>
      {sidebarLinks
        .filter((link) => link.roles.includes(role))
        .map((link) => (
          <a key={link.to} href={link.to} className="button" style={{ textAlign: 'left', background: 'none', color: '#1976d2', margin: 0, padding: 0, border: 'none', boxShadow: 'none' }}>
            {link.label}
          </a>
        ))}
      <button onClick={onLogout} style={{ marginTop: 'auto', background: '#e53935' }}>Logout</button>
    </nav>
  );
}

function ProtectedLayout({ children, onLogout }: { children: React.ReactElement; onLogout: () => void }) {
  const role = localStorage.getItem('role') || 'receptionist';
  return (
    <>
      <header className="header">CityCare Hospital Portal</header>
      <Sidebar role={role} onLogout={onLogout} />
      {children}
    </>
  );
}

function ProtectedRoute({ children, onLogout }: { children: React.ReactElement; onLogout: () => void }) {
  const token = localStorage.getItem('token');
  return token ? <ProtectedLayout onLogout={onLogout}>{children}</ProtectedLayout> : <Navigate to="/login" replace />;
}

function App() {
  const [, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [, setRole] = useState<string>(() => localStorage.getItem('role') || 'receptionist');

  const handleLogin = (tok: string, userRole: string) => {
    setToken(tok);
    setRole(userRole);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole('receptionist');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute onLogout={handleLogout}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
