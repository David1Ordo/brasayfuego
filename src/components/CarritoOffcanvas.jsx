import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { locales, buscarLocal } from '../data/locales';
import { ROLES_REGISTRADOS } from '../data/usuarios';
import { soles } from '../utils/formato';

function CarritoOffcanvas() {
  const { items, total, cambiarCantidad, quitar, vaciar, sede, setSede, abierto, cerrar } = useCart();
  const { usuario } = useAuth();
  const registrado = usuario && ROLES_REGISTRADOS.includes(usuario.rol);
  const [confirmado, setConfirmado] = useState(null);

  const confirmarPedido = (e) => {
    e.preventDefault();
    const datos = registrado
      ? { nombre: usuario.nombre, dni: usuario.dni }
      : { nombre: e.target.nombre.value, dni: e.target.dni.value };
    setConfirmado({ numero: Math.floor(10000 + Math.random() * 90000), total, sede: buscarLocal(sede).nombre, ...datos });
    vaciar();
  };

  return (
    <Offcanvas show={abierto} onHide={cerrar} onExited={() => setConfirmado(null)} placement="end">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold">🛒 Tu pedido</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {confirmado ? (
          <div className="text-center my-auto">
            <div className="display-4 mb-2">🎉</div>
            <h5 className="fw-bold">¡Pedido confirmado!</h5>
            <p className="text-muted mb-1">N° de pedido <strong>BF-{confirmado.numero}</strong></p>
            <p className="text-muted mb-1">A nombre de <strong>{confirmado.nombre}</strong> · DNI {confirmado.dni}</p>
            <p className="text-muted mb-3">{confirmado.sede} · Total <strong className="text-brand">{soles(confirmado.total)}</strong></p>
            <p className="small text-muted">Tiempo estimado de preparación: 25-35 min.</p>
            <button type="button" className="btn btn-brand px-4" onClick={cerrar}>Seguir navegando</button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center my-auto">
            <div className="display-4 mb-2">🍗</div>
            <p className="text-muted">Tu carrito está vacío.</p>
            <Link to="/carta" className="btn btn-brand px-4" onClick={cerrar}>Ver Carta Web</Link>
          </div>
        ) : (
          <form className="d-flex flex-column flex-grow-1" onSubmit={confirmarPedido}>
            <ul className="list-unstyled mb-3">
              {items.map((item) => (
                <li key={item.id} className="d-flex align-items-center gap-2 py-2 border-bottom">
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{item.nombre}</div>
                    <div className="text-muted small">{soles(item.precio)} c/u</div>
                  </div>
                  <button type="button" className="btn btn-outline-secondary btn-cantidad" onClick={() => cambiarCantidad(item.id, -1)}>−</button>
                  <span className="fw-semibold px-1">{item.cantidad}</span>
                  <button type="button" className="btn btn-outline-secondary btn-cantidad" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                  <div className="fw-bold small text-end" style={{ minWidth: 72 }}>{soles(item.precio * item.cantidad)}</div>
                  <button type="button" className="btn btn-link text-danger p-0 ms-1" onClick={() => quitar(item.id)}>✕</button>
                </li>
              ))}
            </ul>

            <label htmlFor="sede-carrito" className="form-label small fw-bold mb-1">📍 Pedir para / local</label>
            <select id="sede-carrito" className="form-select form-select-sm mb-3" value={sede} onChange={(e) => setSede(e.target.value)}>
              {locales.map((local) => <option key={local.id} value={local.id}>{local.nombre}</option>)}
            </select>

            {registrado ? (
              <div className="bg-brasa-gris rounded-3 p-2 small mb-3">
                Pedido a nombre de <strong>{usuario.nombre}</strong> · DNI {usuario.dni}
              </div>
            ) : (
              <div className="form-brasa mb-3">
                <p className="small fw-bold mb-2">Datos para tu pedido</p>
                <input name="nombre" className="form-control form-control-sm mb-2" placeholder="Nombre completo *" required minLength={5} />
                <input name="dni" className="form-control form-control-sm" placeholder="DNI (8 dígitos) *" required pattern="\d{8}" title="8 dígitos" maxLength={8} />
              </div>
            )}

            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold">Total</span>
                <span className="precio fs-4">{soles(total)}</span>
              </div>
              {!registrado && (
                <p className="small text-muted">¿Tienes cuenta? <Link to="/login" onClick={cerrar} className="text-brand">Inicia sesión</Link> y usaremos tus datos.</p>
              )}
              <button type="submit" className="btn btn-brand w-100 fw-semibold mb-2">Confirmar pedido</button>
              <button type="button" className="btn btn-outline-secondary w-100 btn-sm" onClick={vaciar}>Vaciar carrito</button>
            </div>
          </form>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CarritoOffcanvas;
