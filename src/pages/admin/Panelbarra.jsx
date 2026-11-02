import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const secciones = [
  { to: 'clientes', texto: 'Gestión Clientes' },
  { to: 'trabajadores', texto: 'Gestión Trabajadores' },
  { to: 'productos', texto: 'Gestión Productos' },
  { to: 'reservas', texto: 'Reservas & Mesas' },
  { to: 'reportes', texto: 'Reportes & Ventas' },
  { to: 'configuracion', texto: 'Configuración' },
];

function Panelbarra() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario.rol === 'admin';

  const cerrarSesion = () => {
    navigate('/');
    logout();
  };

  return (
    <aside className="panel-barra d-flex flex-column p-3">
      <div className="px-2 pb-3 mb-3 border-bottom border-secondary">
        <div className="marca fs-5">BRASA & FUEGO</div>
      </div>

      <nav className="d-flex flex-wrap flex-lg-column gap-1">
        {esAdmin ? (
          secciones.map((s) => (
            <NavLink key={s.to} to={`/admin/${s.to}`} className="panel-link">{s.texto}</NavLink>
          ))
        ) : (
          <NavLink to="/admin/reservas" className="panel-link">📅 Reservas y Mesas</NavLink>
        )}
      </nav>

      <div className="d-flex flex-lg-column gap-2 mt-3 mt-lg-auto pt-lg-5">
        <button type="button" className="btn panel-boton-salir" onClick={cerrarSesion}>Cerrar sesión</button>
        <Link to="/" className="btn panel-boton-salir">Volver a Web</Link>
      </div>
    </aside>
  );
}

export default Panelbarra;
