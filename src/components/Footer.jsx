import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-brasa pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-3">
            <h4 className="marca fs-5 mb-3">BRASA & FUEGO </h4>
            <p className="texto-footer mb-0">El auténtico sabor a la leña directo a tu mesa.</p>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Nuestro Menú</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/carta#pollos" className="enlace-footer">Pollos a la Brasa</Link></li>
              <li className="mb-2"><Link to="/promociones" className="enlace-footer">Combos Familiares</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Atención al Cliente</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/locales" className="enlace-footer">Nuestros Locales 📍</Link></li>
              <li className="mb-2"><span className="texto-footer">Horario: Lun-Dom 12pm-11pm</span></li>
              <li className="mb-2"><Link to="/legal#faq" className="enlace-footer">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Legales & Ayuda</h6>
            <ul className="list-unstyled mb-3">
              <li className="mb-2"><Link to="/legal#terminos" className="enlace-footer">Términos y Condiciones</Link></li>
              <li className="mb-2"><Link to="/legal#privacidad" className="enlace-footer">Políticas de Privacidad</Link></li>
            </ul>
            <Link to="/reclamaciones" className="btn btn-reclamaciones btn-sm px-3">
              Libro de Reclamaciones
            </Link>
          </div>

        </div>
        <hr className="my-4 border-secondary" />
        <p className="text-center texto-footer small mb-0">© 2026 Brasa & Fuego. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
