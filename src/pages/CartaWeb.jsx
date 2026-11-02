import React, { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import Imagen from '../components/Imagen';
import { useCart } from '../context/CartContext';
import { categorias, productosPorCategoria } from '../data/productos';
import { locales } from '../data/locales';

const OFFSET_SECCION = 140;

function CartaWeb() {
  const { sede, setSede } = useCart();
  const [activa, setActiva] = useState(categorias[0].id);

  useEffect(() => {
    const alHacerScroll = () => {
      let actual = categorias[0].id;
      categorias.forEach(({ id }) => {
        const elemento = document.getElementById(id);
        if (elemento && elemento.getBoundingClientRect().top <= OFFSET_SECCION) actual = id;
      });
      setActiva(actual);
    };
    alHacerScroll();
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    return () => window.removeEventListener('scroll', alHacerScroll);
  }, []);

  const irASeccion = (id) => {
    setActiva(id);
    document.getElementById(id).scrollIntoView();
  };

  return (
    <div className="container py-4">
      <div className="row g-4">

        <aside className="col-lg-3">
          <div className="carta-sidebar">
            <div className="card-brasa p-2 mb-3">
              <h2 className="h6 fw-bold px-2 pt-2 mb-2">CATEGORÍAS</h2>
              <nav className="d-flex flex-lg-column gap-1 overflow-auto pb-1">
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    type="button"
                    className={`categoria-btn ${activa === categoria.id ? 'active' : ''}`}
                    onClick={() => irASeccion(categoria.id)}
                  >
                    {categoria.icono} {categoria.nombre}
                  </button>
                ))}
              </nav>
            </div>
            <Imagen archivo="propaganda_carta" alt="Delivery gratis desde S/ 60" className="d-none d-lg-flex" style={{ minHeight: 320 }} />
          </div>
        </aside>

        <div className="col-lg-9">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-3">
            <h1 className="h3 fw-bold mb-0">Carta Digital por Secciones</h1>
            <div className="d-flex flex-column gap-2" style={{ minWidth: 260 }}>
              <input type="search" className="form-control input-busqueda" placeholder="Buscar platillos, combos o bebidas..." />
              <div className="selector-sede d-flex align-items-center gap-2 px-3 py-2">
                <span aria-hidden="true">📍</span>
                <div className="flex-grow-1">
                  <label htmlFor="sede-carta" className="d-block text-muted fw-bold" style={{ fontSize: '0.62rem' }}>
                    PEDIR PARA / LOCAL:
                  </label>
                  <select id="sede-carta" className="form-select" value={sede} onChange={(e) => setSede(e.target.value)}>
                    {locales.map((local) => <option key={local.id} value={local.id}>{local.nombre}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {categorias.map((seccion) => (
            <section key={seccion.id} id={seccion.id} className="seccion-carta mb-4">
              <h2 className="h5 fw-bold text-brand mb-3">{seccion.icono} {seccion.titulo}</h2>
              <div className="row g-3">
                {productosPorCategoria(seccion.id).map((producto) => (
                  <div className="col-md-6" key={producto.id}>
                    <ProductoCard producto={producto} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CartaWeb;
