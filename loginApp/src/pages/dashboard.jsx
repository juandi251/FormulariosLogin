import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ onLogout, nombreUsuario }) {
  const navigate = useNavigate();

  useEffect(() => {
    alert(`Bienvenido, ${nombreUsuario}`);
  }, [nombreUsuario]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button className="btn btn-primary me-2 btn-sm">Actívate</button>
          <button className="btn btn-secondary me-2 btn-sm">Link Link</button>
          <button className="btn btn-secondary me-2 btn-sm">Link Link</button>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <h2>Dashboard</h2>
      <p>Bienvenido al panel de control, {nombreUsuario}.</p>
    </div>
  );
}
