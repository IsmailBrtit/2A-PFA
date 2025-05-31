// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la racine vers login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        {/* Route login */}
        <Route path="/auth/login" element={<Login />} />
        {/* Ici tu pourras ajouter d'autres routes plus tard */}
      </Routes>
    </Router>
  );
}

export default App;
