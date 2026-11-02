import React from 'react';

function Mesacard({ mesa, estado, alElegir }) {
  return (
    <div className={`card-brasa mesa-card h-100 p-4 d-flex flex-column ${estado}`}>
      {estado === 'disponible' && <span className="badge rounded-pill align-self-start mb-3 px-3 py-2 badge-abierto">Disponible</span>}
      {estado === 'seleccionada' && <span className="badge rounded-pill align-self-start mb-3 px-3 py-2 badge-seleccionada">Seleccionada</span>}
      {estado === 'reservada' && <span className="badge rounded-pill align-self-start mb-3 px-3 py-2 badge-cerrado">Reservada</span>}

      <h3 className="h5 fw-bold mb-2">{mesa.nombre} - Salón Principal</h3>
      <p className="small fw-semibold text-muted mb-4">Capacidad: Hasta {mesa.capacidad} personas</p>

      <div className="mt-auto text-end">
        {estado === 'reservada' ? (
          <button type="button" className="btn btn-secondary px-4 py-2 fw-semibold" disabled>No disp.</button>
        ) : (
          <button
            type="button"
            className={`btn px-4 py-2 fw-semibold ${estado === 'seleccionada' ? 'btn-brand' : 'btn-brasa-dark'}`}
            onClick={() => alElegir(mesa.numero)}
          >
            {estado === 'seleccionada' ? 'Seleccionada' : 'Elegir Mesa'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Mesacard;
