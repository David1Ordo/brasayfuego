import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Imagen from '../components/Imagen';
import { useAuth } from '../context/AuthContext';
import { locales } from '../data/locales';
import { ROLES_REGISTRADOS } from '../data/usuarios';

function Locales() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [seleccionada, setSeleccionada] = useState(locales[0].id);
  const [aviso, setAviso] = useState(null);

  const hora = new Date().getHours();
  const abierto = hora >= 12 && hora < 23;

  const reservar = (id) => {
    if (usuario && ROLES_REGISTRADOS.includes(usuario.rol)) navigate('/reservas');
    else setAviso(id);
  };

  return (
    <div className="container py-5">
      <h1 className="h2 fw-bold mb-1">Nuestros Locales</h1>
      <p className="text-muted mb-4">Selecciona tu sede más cercana para atención en salón, llevar o delivery directo.</p>

      <div className="row g-4">
        <div className="col-lg-5 d-flex flex-column gap-3">
          {locales.map((local) => (
            <div
              key={local.id}
              className={`card-brasa local-card p-3 ${seleccionada === local.id ? 'seleccionado' : ''}`}
              onClick={() => setSeleccionada(local.id)}
            >
              <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                <h2 className="h6 fw-bold mb-0">{local.nombre}</h2>
                <span className={`badge rounded-pill ${abierto ? 'badge-abierto' : 'badge-cerrado'}`}>
                  {abierto ? 'Abierto Ahora 🟢' : 'Cerrado 🔴'}
                </span>
              </div>
              <p className="small text-muted mb-1">{local.direccion}</p>
              <p className="small text-muted mb-1">Lunes a Domingo: 12:00 pm - 11:00 pm</p>
              <p className="small text-muted mb-3">{local.telefono} | {local.anexo}</p>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-brand btn-sm fw-semibold px-3" onClick={() => reservar(local.id)}>
                  Reservar
                </button>
                <button type="button" className="btn btn-brasa-dark btn-sm fw-semibold px-3">
                  Ver en Mapa 🗺️
                </button>
              </div>
              {aviso === local.id && (
                <p className="small text-danger fw-semibold mt-2 mb-0">Necesitas una cuenta para continuar.</p>
              )}
            </div>
          ))}
        </div>

        <div className="col-lg-7">
          <div className="card-brasa p-3">
            <Imagen archivo={`sede_${seleccionada}`} alt="Mapa de la sede" style={{ minHeight: 420 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locales;
