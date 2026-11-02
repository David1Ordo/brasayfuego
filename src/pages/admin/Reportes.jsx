import React from 'react';

const semana = [
  { dia: 'Lun', salon: 900, web: 480 },
  { dia: 'Mar', salon: 1080, web: 620 },
  { dia: 'Mié', salon: 1230, web: 700 },
  { dia: 'Jue', salon: 1450, web: 960 },
  { dia: 'Vie', salon: 1820, web: 1280 },
  { dia: 'Sáb', salon: 1950, web: 1460 },
  { dia: 'Dom', salon: 1880, web: 1390 },
];
const maximo = 2000;

const transacciones = [
  { fecha: '29 Oct - 19:40', tipo: 'Reserva + Consumo Local', cliente: 'Carlos Mendoza (#RES-8041)', metodo: 'Yape / POS Tarjeta', monto: 'S/ 115.00', color: 'text-success', estado: ['badge-abierto', 'Completado'] },
  { fecha: '29 Oct - 18:45', tipo: 'Retención por No-Show', cliente: 'Jorge Ramos (#RES-8032)', metodo: 'Pasarela Web (Pasiva)', monto: 'S/ 40.00', color: 'text-brand', estado: ['badge-amarillo', 'Retenido'] },
  { fecha: '29 Oct - 18:15', tipo: 'Venta Directa sin Reserva', cliente: 'Cliente Presencial / Mesa 4', metodo: 'Efectivo en Caja', monto: 'S/ 85.00', color: 'text-success', estado: ['badge-abierto', 'Completado'] },
  { fecha: '29 Oct - 17:30', tipo: 'Reserva + Consumo Local', cliente: 'María Torres (#RES-8038)', metodo: 'Tarjeta Crédito / POS', monto: 'S/ 140.00', color: 'text-success', estado: ['badge-abierto', 'Completado'] },
  { fecha: '29 Oct - 16:10', tipo: 'Reembolso Cancelación', cliente: 'Ana Lucía Paredes', metodo: 'Transferencia BBVA', monto: '- S/ 30.00', color: 'text-muted', estado: ['badge-gris', 'Devuelto'] },
  { fecha: '29 Oct - 14:20', tipo: 'Venta Directa sin Reserva', cliente: 'Cliente Presencial / Mesa 1', metodo: 'Yape', monto: 'S/ 62.00', color: 'text-success', estado: ['badge-abierto', 'Completado'] },
];

function Reportes() {
  return (
    <>
      <h1 className="h3 fw-bold mb-1">Reportes y Ventas</h1>
      <p className="text-muted small mb-4">Análisis financiero, historial de ingresos por reservas, consumos en local y exportación de balances.</p>

      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <div className="card-brasa p-3 h-100">
            <p className="small text-muted fw-semibold mb-1">VENTAS DEL MES</p>
            <p className="fs-4 fw-bold mb-0">S/ 10,400.00 <span className="small text-success">+12%</span></p>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="card-brasa p-3 h-100">
            <p className="small text-muted fw-semibold mb-1">GARANTÍAS WEB</p>
            <p className="fs-4 fw-bold text-brand mb-0">S/ 150.00</p>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="card-brasa p-3 h-100">
            <p className="small text-muted fw-semibold mb-1">PLATO MÁS VENDIDO</p>
            <p className="fs-5 fw-bold mb-0">1/2 Pollo + Papas</p>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="card-brasa p-3 h-100">
            <p className="small text-muted fw-semibold mb-1">TASA ASISTENCIA</p>
            <p className="fs-4 fw-bold text-success mb-0">94.2%</p>
          </div>
        </div>
      </div>

      <section className="card-brasa p-3 p-md-4 mb-4">
        <h2 className="h5 fw-bold mb-1">Balance de Ingresos Semanal (Soles S/)</h2>
        <p className="small text-muted mb-4">Comparativa de ingresos por consumo directo vs. garantías cobradas por web.</p>
        <div className="grafico">
          {semana.map((d) => (
            <div key={d.dia} className="grafico-dia">
              <div className="grafico-barras">
                <div className="barra barra-salon" style={{ height: `${(d.salon / maximo) * 100}%` }} title={`Salón: S/ ${d.salon}`} />
                <div className="barra barra-web" style={{ height: `${(d.web / maximo) * 100}%` }} title={`Web: S/ ${d.web}`} />
              </div>
              <span className="small text-muted">{d.dia}</span>
            </div>
          ))}
        </div>
        <div className="d-flex flex-wrap gap-4 small text-muted mt-3">
          <span><span className="leyenda barra-salon" /> Ventas Salón / Local</span>
          <span><span className="leyenda barra-web" /> Adelantos Web / Reservas</span>
        </div>
      </section>

      <section className="card-brasa p-3 p-md-4">
        <h2 className="h5 fw-bold mb-1">Histórico de Transacciones y Caja</h2>
        <p className="small text-muted mb-3">Registro detallado de cobranzas, descuentos de adelantos y cobros por inasistencia.</p>
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input className="form-control form-control-sm" placeholder="🔍 Buscar por cliente, código o mesa..." />
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select form-select-sm fw-semibold" aria-label="Operación">
              <option>Todas las operaciones</option>
              <option>Reserva + Consumo Local</option>
              <option>Venta Directa sin Reserva</option>
              <option>Retención por No-Show</option>
              <option>Reembolso Cancelación</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select form-select-sm fw-semibold" aria-label="Fecha">
              <option>Hoy (29 Oct)</option>
              <option>Últimos 7 días</option>
              <option>Este mes</option>
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button type="button" className="btn btn-sm btn-brasa-dark fw-semibold">Filtros</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table tabla-panel align-middle mb-0">
            <thead>
              <tr>
                <th>Fecha / Hora</th>
                <th>Tipo de operación</th>
                <th>Cliente / Concepto</th>
                <th>Método pago</th>
                <th>Monto total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((t) => (
                <tr key={t.fecha}>
                  <td className="fw-bold text-nowrap">{t.fecha}</td>
                  <td className="text-muted">{t.tipo}</td>
                  <td className="fw-bold">{t.cliente}</td>
                  <td className="text-muted">{t.metodo}</td>
                  <td className={`fw-bold text-nowrap ${t.color}`}>{t.monto}</td>
                  <td><span className={`badge rounded-pill px-3 py-2 ${t.estado[0]}`}>{t.estado[1]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Reportes;
