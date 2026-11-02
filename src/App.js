import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ROLES_REGISTRADOS, ROLES_PANEL } from './data/usuarios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CarritoOffcanvas from './components/CarritoOffcanvas';
import AvisoCarrito from './components/AvisoCarrito';
import RutaProtegida from './components/RutaProtegida';
import ScrollAlInicio from './components/ScrollAlInicio';

// Paginas
import Inicio from './pages/Inicio';
import Promociones from './pages/Promociones';
import CartaWeb from './pages/CartaWeb';
import Locales from './pages/Locales';
import Nosotros from './pages/Nosotros';
import Reservas from './pages/Reservas';
import Login from './pages/Login';
import Reclamaciones from './pages/Reclamaciones';
import Legal from './pages/Legal';
import NoEncontrado from './pages/NoEncontrado';

// Panel de administración
import Panel from './pages/admin/Panel';
import GestionClientes from './pages/admin/GestionClientes';
import GestionTrabajadores from './pages/admin/GestionTrabajadores';
import GestionProductos from './pages/admin/GestionProductos';
import ReservasMesas from './pages/admin/ReservasMesas';
import Reportes from './pages/admin/Reportes';
import Configuracion from './pages/admin/Configuracion';

// Diseño de la web pública
function SitioPublico() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollAlInicio />
          <Routes>
            <Route element={<SitioPublico />}>
              <Route path="/" element={<Inicio />} />
              <Route path="/promociones" element={<Promociones />} />
              <Route path="/carta" element={<CartaWeb />} />
              <Route path="/locales" element={<Locales />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route
                path="/reservas"
                element={
                  <RutaProtegida roles={ROLES_REGISTRADOS} mensaje="Inicia sesión con tu cuenta para reservar una mesa.">
                    <Reservas />
                  </RutaProtegida>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/reclamaciones" element={<Reclamaciones />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NoEncontrado />} />
            </Route>

            <Route
              path="/admin"
              element={
                <RutaProtegida roles={ROLES_PANEL} mensaje="Esta sección es solo para personal autorizado.">
                  <Panel />
                </RutaProtegida>
              }
            >
              <Route index element={<Navigate to="clientes" replace />} />
              <Route path="clientes" element={<GestionClientes />} />
              <Route path="trabajadores" element={<GestionTrabajadores />} />
              <Route path="productos" element={<GestionProductos />} />
              <Route path="reservas" element={<ReservasMesas />} />
              <Route path="reportes" element={<Reportes />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
          <CarritoOffcanvas />
          <AvisoCarrito />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
