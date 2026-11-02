import React, { useState } from 'react';

function Reclamaciones() {
  const [codigo, setCodigo] = useState(null);

  const enviar = (e) => {
    e.preventDefault();
    setCodigo(`REC-${Math.floor(1000 + Math.random() * 9000)}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 960 }}>
      <h1 className="h3 fw-bold mb-1">Libro de Reclamaciones Virtual</h1>
      <p className="text-muted small mb-4">
        Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571 / D.S. 011-2011-PCM).
      </p>

      {codigo ? (
        <div className="card-brasa p-4 p-md-5 text-center">
          <div className="display-5 mb-2">✅</div>
          <h2 className="h4 fw-bold">Reclamación registrada</h2>
          <p className="mb-1">Código de seguimiento</p>
          <p className="fs-4 fw-bold text-brand">{codigo}</p>
          <p className="text-muted small">Te responderemos a tu correo en un plazo máximo de 15 días hábiles.</p>
          <button type="button" className="btn btn-brand px-4" onClick={() => setCodigo(null)}>Registrar otra</button>
        </div>
      ) : (
        <form className="card-brasa form-brasa p-4 p-md-5" onSubmit={enviar}>
          <h2 className="titulo-seccion-form mb-3">1. Identificación del Consumidor Reclamante</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombres y Apellidos Completos *</label>
              <input id="nombre" className="form-control" placeholder="Ej. Juan Carlos Perez" required minLength={5} />
            </div>
            <div className="col-md-6">
              <label htmlFor="documento" className="form-label">Tipo y N° de Documento (DNI / CE / RUC) *</label>
              <div className="input-group">
                <select className="form-select" style={{ maxWidth: 90 }} aria-label="Tipo de documento">
                  <option>DNI</option>
                  <option>CE</option>
                  <option>RUC</option>
                </select>
                <input id="documento" className="form-control" placeholder="N° de documento..." required pattern="\d{8,12}" title="Entre 8 y 12 dígitos" />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="correo" className="form-label">Correo Electrónico *</label>
              <input id="correo" type="email" className="form-control" placeholder="correo@ejemplo.com" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="telefono" className="form-label">Teléfono / Celular *</label>
              <input id="telefono" type="tel" className="form-control" placeholder="987654321" required pattern="\d{9}" title="9 dígitos" />
            </div>
            <div className="col-12">
              <label htmlFor="direccion" className="form-label">Dirección Domiciliaria y Distrito *</label>
              <input id="direccion" className="form-control" placeholder="Av. Los Olivos 123, Los Olivos, Lima" required />
            </div>
          </div>

          <hr className="my-4" />
          <h2 className="titulo-seccion-form mb-3">2. Identificación del Bien Contratado</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="tipo-bien" className="form-label">Tipo *</label>
              <select id="tipo-bien" className="form-select">
                <option>Producto (Comida / Menú)</option>
                <option>Servicio (Atención / Delivery / Reserva)</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="monto" className="form-label">Monto Reclamado (S/) *</label>
              <input id="monto" type="number" min="0" step="0.10" className="form-control" placeholder="S/ 00.00" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="pedido" className="form-label">N° de Pedido o Boleta</label>
              <input id="pedido" className="form-control" placeholder="Ej. #BF-45213 / B001-123" />
            </div>
          </div>

          <hr className="my-4" />
          <h2 className="titulo-seccion-form mb-3">3. Detalle de la Reclamación y Pedido del Consumidor</h2>
          <div className="d-flex flex-wrap gap-4 mb-3">
            <div className="form-check">
              <input id="tipo-reclamo" type="radio" name="tipo" className="form-check-input" defaultChecked />
              <label htmlFor="tipo-reclamo" className="form-check-label small fw-semibold">Reclamo (Disconformidad con el producto o atención)</label>
            </div>
            <div className="form-check">
              <input id="tipo-queja" type="radio" name="tipo" className="form-check-input" />
              <label htmlFor="tipo-queja" className="form-check-label small fw-semibold">Queja (Malestar sobre la atención al público)</label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="detalle" className="form-label">Detalle del Reclamo o Queja *</label>
            <textarea id="detalle" rows={3} className="form-control" placeholder="Describe claramente lo sucedido con tu pedido o atención recibida..." required />
          </div>
          <div className="mb-4">
            <label htmlFor="solucion" className="form-label">Pedido del Consumidor (Solución esperada) *</label>
            <textarea id="solucion" rows={3} className="form-control" placeholder="Indica qué solución o cambio solicitas por parte de la empresa..." required />
          </div>

          <button type="submit" className="btn btn-brand fw-semibold px-5 py-2">Enviar Reclamación 📨</button>
        </form>
      )}
    </div>
  );
}

export default Reclamaciones;
