import React from 'react';
import Imagen from './Imagen';
import { useCart } from '../context/CartContext';
import { soles } from '../utils/formato';

function ProductoCard({ producto }) {
  const { agregar } = useCart();

  return (
    <div className="card-brasa h-100 d-flex overflow-hidden">
      <div className="producto-imagen position-relative flex-shrink-0">
        {producto.descuento && (
          <span className="badge-descuento position-absolute top-0 start-0 m-2">-{producto.descuento}%</span>
        )}
        <Imagen archivo={producto.imagen} alt={producto.nombre} className="h-100 rounded-0" />
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <h6 className="fw-bold mb-1">{producto.nombre}</h6>
        <p className="text-muted small mb-1">{producto.descripcion}</p>
        {producto.nota && <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>{producto.nota}</p>}

        <div className="d-flex justify-content-between align-items-end gap-2 mt-auto pt-3">
          <div>
            <span className="precio fs-5">{soles(producto.precio)}</span>
            {producto.precioAnterior && <span className="precio-anterior ms-2">{soles(producto.precioAnterior)}</span>}
          </div>
          <button type="button" className="btn btn-brasa-dark btn-sm px-3 fw-semibold text-nowrap" onClick={() => agregar(producto)}>
            + Pedir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
