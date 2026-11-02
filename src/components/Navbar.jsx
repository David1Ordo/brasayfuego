import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ROLES, ROLES_PANEL, ROLES_REGISTRADOS } from '../data/usuarios';
import { soles } from '../utils/formato';

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/promociones', texto: 'Promociones' },
  { to: '/carta', texto: 'Carta Web' },
  { to: '/locales', texto: 'Locales' },
  { to: '/nosotros', texto: 'Nosotros' },
];

function Navbar() {
  const { usuario, logout } = useAuth();
  const { total, cantidad, abrir } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [expandido, setExpandido] = useState(false);

  const puedeReservar = usuario && ROLES_REGISTRADOS.includes(usuario.rol);
  const pestanas = puedeReservar ? [...enlaces, { to: '/reservas', texto: 'Reservas' }] : enlaces;

  const cerrarMenu = () => setExpandido(false);

  const cerrarSesion = () => {
    cerrarMenu();
    logout();
    navigate('/');
  };

  return (
    <BsNavbar expand="lg" variant="dark" sticky="top" className="navbar-brasa py-3" expanded={expandido} onToggle={setExpandido}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="marca" onClick={cerrarMenu}>
          BRASA & FUEGO
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu-principal" />

        <BsNavbar.Collapse id="menu-principal">
          <Nav className="mx-auto gap-lg-3 mt-3 mt-lg-0">
            {pestanas.map(({ to, texto }) => (
              <Nav.Link key={to} as={NavLink} to={to} end={to === '/'} className="nav-brasa" onClick={cerrarMenu}>
                {texto}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 mt-lg-0">
            {usuario ? (
              <Dropdown align="end">  
                <Dropdown.Toggle variant="brand" size="sm" className="px-3 fw-semibold" id="menu-usuario">
                  👤 {usuario.nombre}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>{ROLES[usuario.rol]}</Dropdown.Header>
                  {usuario.rol === 'invitado' && (
                    <Dropdown.Item as={Link} to="/login" onClick={cerrarMenu}>Iniciar sesión</Dropdown.Item>
                  )}
                  {ROLES_PANEL.includes(usuario.rol) && (
                    <Dropdown.Item as={Link} to="/admin" onClick={cerrarMenu}>Panel de administración ⚙️</Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={cerrarSesion}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              pathname !== '/login' && (
                <Link to="/login" className="btn btn-brand btn-sm px-3 fw-semibold" onClick={cerrarMenu}>
                  👤 Iniciar Sesión
                </Link>
              )
            )}

            <button
              type="button"
              className="btn btn-brand btn-sm px-3 fw-semibold position-relative"
              onClick={() => { cerrarMenu(); abrir(); }}
              aria-label={`Ver carrito, ${cantidad} productos`}
            >
              🛒 {soles(total)}
              {cantidad > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cantidad}
                </span>
              )}
            </button>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
