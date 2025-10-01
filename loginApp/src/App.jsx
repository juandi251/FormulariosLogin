import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  const handleLogin = (nombre) => {
    setIsAuthenticated(true);
    setNombreUsuario(nombre);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNombreUsuario("");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard onLogout={handleLogout} nombreUsuario={nombreUsuario} /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
