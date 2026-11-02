import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import Panelbarra from './Panelbarra';

const titulos = {
  clientes: 'Gestión de Clientes',
  trabajadores: 'Gestión de Trabajadores',
  productos: 'Gestión de Productos',
  reservas: 'Gestión de Reservas y Mesas',
  reportes: 'Reportes y Ventas',
  configuracion: 'Configuración',
};

function Panel() {
  const { usuario } = useAuth();
  const { pathname } = useLocation();
  const [mensaje, setMensaje] = useState('');

  const esAdmin = usuario.rol === 'admin';
  const seccion = pathname.split('/')[2];

  if (!esAdmin && seccion !== 'reservas') {
    return <Navigate to="/admin/reservas" replace />;
  }

  return (
    <div className="d-lg-flex min-vh-100">
      <Panelbarra />

      <div className="panel-contenido flex-grow-1">
        <header className="d-flex flex-wrap justify-content-between align-items-center gap-2 px-4 py-3 border-bottom">
          <p className="small mb-0">
            <span className="text-muted">{esAdmin ? 'Dashboard' : 'Recepción'} / </span>
            <strong>{titulos[seccion]}</strong>
          </p>
          <div className="d-flex align-items-center gap-4">
            {!esAdmin && <strong className="small">Sede: Miraflores</strong>}
            <span className="usuario-panel">
              <span className="avatar-letra">{usuario.nombre[0]}</span>
              {usuario.nombre}
            </span>
          </div>
        </header>

        <main className="p-3 p-md-4 p-xl-5">
          <Outlet context={setMensaje} />
        </main>
      </div>

      <ToastContainer position="top-end" className="p-3 position-fixed" style={{ zIndex: 1080 }}>
        <Toast show={mensaje !== ''} onClose={() => setMensaje('')} delay={3000} autohide bg="success">
          <Toast.Body className="text-white fw-semibold">✅ {mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Panel;
