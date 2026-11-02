import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function AvisoCarrito() {
  const { aviso, limpiarAviso, abrir } = useCart();

  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 1080 }}>
      <Toast key={aviso?.clave} show={Boolean(aviso)} onClose={limpiarAviso} delay={2500} autohide>
        <Toast.Body className="d-flex align-items-center justify-content-between gap-3">
          <span>✅ <strong>{aviso?.nombre}</strong> agregado al carrito</span>
          <button type="button" className="btn btn-brand btn-sm text-nowrap" onClick={() => { limpiarAviso(); abrir(); }}>
            Ver
          </button>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AvisoCarrito;
