import React from 'react';
import { Link } from 'react-router-dom';
import Imagen from '../components/Imagen';

function Nosotros() {
  return (
    <div className="container py-5">
      <h1 className="h2 fw-bold mb-1">Nuestra Historia & Pasión</h1>
      <p className="text-muted mb-4">Conoce el secreto del auténtico sabor a la leña que conquistó Lima.</p>

      <section className="hero-brasa p-4 p-md-5 mb-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="badge-oferta d-inline-block mb-3">DESDE 2011 🔥</span>
            <h2 className="h3 fw-bold mb-3">15 años dorando la mejor tradición peruana</h2>
            <p className="small text-white-50 mb-4">
              En Brasa & Fuego nos apasiona mantener viva la auténtica receta del pollo a la leña. Seleccionamos
              ingredientes 100% peruanos, papas nativas crocantes y una sazón secreta de la casa cocinada a carbón de
              algarrobo natural.
            </p>
            <Link to="/carta" className="btn btn-brand fw-semibold px-4">Ver nuestra carta 📖</Link>
          </div>
          <div className="col-lg-6">
            <Imagen archivo="nosotros_historia" alt="Horno a la leña" oscuro style={{ height: 220 }} />
          </div>
        </div>
      </section>

      <h2 className="h5 fw-bold mb-3">Nuestros Pilares de Calidad </h2>
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card-brasa h-100 p-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="icono-pilar" style={{ background: '#fff4d6' }}>🍗</span>
              <h3 className="h6 fw-bold mb-0">Insumos 100% Frescos</h3>
            </div>
            <p className="small text-muted mb-0">Pollos seleccionados a diario y papas amarillas nativas cosechadas por agricultores locales.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-brasa h-100 p-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="icono-pilar" style={{ background: '#fde4e1' }}>🔥</span>
              <h3 className="h6 fw-bold mb-0">Fuego & Algarrobo</h3>
            </div>
            <p className="small text-muted mb-0">Cocción lenta en hornos ecológicos de carbón vegetal, dándole ese inconfundible toque ahumado.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-brasa h-100 p-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="icono-pilar" style={{ background: '#dff5e6' }}>👳</span>
              <h3 className="h6 fw-bold mb-0">Atención que se Siente</h3>
            </div>
            <p className="small text-muted mb-0">Detrás de cada pollo hay personas que cuidan tu experiencia, desde el primer mensaje hasta que llega a tu mesa.</p>
          </div>
        </div>
      </div>

      <div className="card-brasa p-4">
        <div className="row text-center g-3">
          <div className="col-md-4">
            <div className="fs-3 fw-bold text-brand">3 Sedes</div>
            <div className="small text-muted">Estratégicas en Lima</div>
          </div>
          <div className="col-md-4">
            <div className="fs-3 fw-bold text-brand">+150,000</div>
            <div className="small text-muted">Familias atendidas</div>
          </div>
          <div className="col-md-4">
            <div className="fs-3 fw-bold text-brand">100% Peruano</div>
            <div className="small text-muted">Sabor y orgullo nacional</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
