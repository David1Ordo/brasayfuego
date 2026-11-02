import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ roles, mensaje, children }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario || !roles.includes(usuario.rol)) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search, mensaje, requiereCuenta: true }}
      />
    );
  }
  return children;
}

export default RutaProtegida;
