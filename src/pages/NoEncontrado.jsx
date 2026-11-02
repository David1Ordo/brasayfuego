import React from 'react';
import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <div className="container py-5 text-center">
      <div className="display-1 fw-bold text-brand">404</div>
      <h1 className="h4 fw-bold mb-2">Esta página se nos quemó</h1>
      <p className="text-muted mb-4">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-brand fw-semibold px-4">Volver al inicio</Link>
    </div>
  );
}

export default NoEncontrado;
