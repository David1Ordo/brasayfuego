import React from 'react';
import { Link } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import Imagen from '../components/Imagen';
import { categorias, promocionDestacada, promociones } from '../data/productos';

function Inicio() {
  const promosInicio = [promocionDestacada, promociones[0]];
  const categoriasInicio = categorias.filter((categoria) => categoria.id !== 'promos');

  return (
    <div className="container py-5">

      <section className="hero-brasa p-4 p-md-5 mb-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold text-brand text-uppercase mb-3">A la leña en tu mesa</h1>
            <p className="mb-1">Pollos dorados a la perfección, papas nativas crocantes y ají de la casa.</p>
            <p className="text-white-50 small mb-4">¡Haz tu pedido en línea y recojelo en alguno de nuestros locales!</p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/carta" className="btn btn-brand fw-semibold px-4">Ver Carta Web</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <Imagen archivo="hero_inicio" alt="Pollo a la brasa" oscuro style={{ height: 220 }} />
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-bold mb-3">Promociones</h2>
        <div className="row g-4 mb-3">
          {promosInicio.map((producto) => (
            <div className="col-md-6" key={producto.id}>
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
        <Link to="/promociones" className="btn btn-ver-mas">Ver más →</Link>
      </section>

      <section>
        <h2 className="h4 fw-bold mb-3">Carta web</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 mb-3">
          {categoriasInicio.map((categoria) => (
            <div className="col" key={categoria.id}>
              <Link to={`/carta#${categoria.id}`} className="card-brasa categoria-card h-100">
                <Imagen archivo={categoria.imagen} alt={categoria.nombre} style={{ height: 110 }} />
                <div className="etiqueta">{categoria.nombreCorto}</div>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/carta" className="btn btn-ver-mas">Ver más →</Link>
      </section>

    </div>
  );
}

export default Inicio;
