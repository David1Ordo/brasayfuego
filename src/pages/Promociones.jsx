import React from 'react';
import ProductoCard from '../components/ProductoCard';
import Imagen from '../components/Imagen';
import { useCart } from '../context/CartContext';
import { promocionDestacada, promociones } from '../data/productos';
import { soles } from '../utils/formato';

function Promociones() {
  const { agregar } = useCart();
  const destacada = promocionDestacada;

  return (
    <div className="container py-5">
      <h1 className="h2 fw-bold mb-2">Promociones & Ofertas Exclusivas</h1>
      <p className="text-muted mb-4">Aprovecha nuestros combos familiares y descuentos especiales por pedidos web.</p>

      <section className="hero-brasa p-4 p-md-5 mb-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="badge-oferta d-inline-block mb-3">🔥 {destacada.etiqueta} (-{destacada.descuento}%)</span>
            <h2 className="h3 fw-bold mb-3">{destacada.nombre}</h2>
            <p className="small text-white-50 mb-4">{destacada.descripcion}</p>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <span className="fs-3 fw-bold text-amarillo">{soles(destacada.precio)}</span>
              <span className="precio-anterior fs-6">{soles(destacada.precioAnterior)}</span>
              <button type="button" className="btn btn-brand fw-semibold px-4 py-2" onClick={() => agregar(destacada)}>
                Pedir Combo 🔥
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <Imagen archivo={destacada.imagen} alt={destacada.nombre} oscuro style={{ height: 200 }} />
          </div>
        </div>
      </section>

      <h2 className="h5 fw-bold mb-3">Combos y Descuentos Destacados</h2>
      <div className="row g-4">
        {promociones.map((producto) => (
          <div className="col-md-6" key={producto.id}>
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promociones;
