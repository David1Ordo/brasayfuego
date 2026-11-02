import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import ModalContrasena from './ModalContrasena';

const precios = {
  normal: { '1 persona': 15, '2 personas': 25, '3 personas': 40, '4 personas': 50 },
  familiar: { '5 - 6 personas': 60, '7 - 8 personas': 100 },
};
const horas = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
const sedes = ['Miraflores', 'Surco', 'Los Olivos'];
const dias = ['08/11', '09/11', '10/11', '11/11', '12/11'];

const mesasIniciales = [
  { numero: 1, tipo: 'normal', capacidad: 4, estado: 'habilitada' },
  { numero: 2, tipo: 'normal', capacidad: 4, estado: 'reservada', codigo: 'RES-8041' },
  { numero: 3, tipo: 'normal', capacidad: 4, estado: 'habilitada' },
  { numero: 4, tipo: 'normal', capacidad: 4, estado: 'bloqueada' },
  { numero: 5, tipo: 'familiar', capacidad: 8, estado: 'reservada', codigo: 'RES-8045' },
  { numero: 6, tipo: 'familiar', capacidad: 8, estado: 'mantenimiento' },
];

const pendientes = { 1: ['10/11'], 2: ['08/11', '12/11'], 5: ['08/11', '15/11'] };

const reservasIniciales = [
  { codigo: 'RES-8041', cliente: 'Carlos Mendoza', mesa: 2, personas: 3, hora: '19:30', adelanto: 40, estado: 'confirmada' },
  { codigo: 'RES-8045', cliente: 'Carla Ríos', mesa: 5, personas: 6, hora: '20:00', adelanto: 60, estado: 'confirmada' },
  { codigo: 'RES-8038', cliente: 'María Torres', mesa: 1, personas: 2, hora: '19:00', adelanto: 25, estado: 'comedor' },
  { codigo: 'RES-8032', cliente: 'Jorge Ramos', mesa: 3, personas: 4, hora: '18:30', adelanto: 50, estado: 'noshow' },
];

const badgesMesa = {
  habilitada: ['badge-abierto', 'Habilitada'],
  reservada: ['badge-naranja', 'Reservada'],
  bloqueada: ['badge-gris', 'Bloqueada'],
  mantenimiento: ['badge-azul', 'Mantenimiento'],
};
const badgesReserva = {
  confirmada: ['badge-azul', 'Confirmada'],
  comedor: ['badge-abierto', 'En Comedor'],
  noshow: ['badge-cerrado', 'No se presentó'],
};

function ReservasMesas() {
  const avisar = useOutletContext();
  const { usuario } = useAuth();
  const esAdmin = usuario.rol === 'admin';

  const [mesas, setMesas] = useState(mesasIniciales);
  const [reservasHoy, setReservasHoy] = useState(reservasIniciales);
  const [dia, setDia] = useState(dias[0]);
  const [sede, setSede] = useState(sedes[0]);

  const [reservando, setReservando] = useState(null);
  const [confirmada, setConfirmada] = useState(null);
  const [cancelando, setCancelando] = useState(null);
  const [llegada, setLlegada] = useState(null); 
  const [cerradas, setCerradas] = useState(false);
  const [pidiendoCierre, setPidiendoCierre] = useState(false);
  const [nuevaMesa, setNuevaMesa] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [mesaConfig, setMesaConfig] = useState(null);
  const [avisoConfig, setAvisoConfig] = useState(null);

  const cambiarMesa = (numero, cambios) => {
    setMesas(mesas.map((m) => (m.numero === numero ? { ...m, ...cambios } : m)));
  };

  const bloquear = (mesa) => {
    cambiarMesa(mesa.numero, { estado: 'bloqueada' });
    avisar(`Mesa #${mesa.numero} bloqueada el ${dia}: los clientes no podrán reservarla ese día.`);
  };

  const desbloquear = (mesa) => {
    cambiarMesa(mesa.numero, { estado: 'habilitada' });
    avisar(`Mesa #${mesa.numero} desbloqueada.`);
  };

  const confirmarReserva = (e) => {
    e.preventDefault();
    const form = e.target;
    const codigo = `RES-${8050 + reservando.numero}`;
    setConfirmada({
      codigo,
      mesa: reservando.numero,
      nombre: form.nombre.value,
      dni: form.dni.value,
      personas: form.personas.value,
      hora: form.hora.value,
      precio: precios[reservando.tipo][form.personas.value],
    });
    cambiarMesa(reservando.numero, { estado: 'reservada', codigo });
    setReservando(null);
  };

  const cancelarReserva = () => {
    cambiarMesa(cancelando.numero, { estado: 'habilitada', codigo: null });
    avisar(`Reserva #${cancelando.codigo} cancelada. La Mesa #${cancelando.numero} vuelve a estar habilitada.`);
    setCancelando(null);
  };

  const registrarLlegada = () => {
    setReservasHoy(reservasHoy.map((r) => (r.codigo === llegada.codigo ? { ...r, estado: 'comedor' } : r)));
    avisar(`Llegada registrada: abono de S/ ${llegada.adelanto} aplicado.`);
    setLlegada(null);
  };

  const cambiarCierre = () => {
    avisar(cerradas ? 'Reservas web reactivadas.' : 'Reservas web cerradas momentáneamente.');
    setCerradas(!cerradas);
    setPidiendoCierre(false);
  };

  const reservasDe = (mesa) => pendientes[mesa.numero] || (mesa.estado === 'reservada' ? [dia] : []);
  const avisoPendientes = (mesa, final) => ({
    variante: 'danger',
    texto: `La Mesa #${mesa.numero} tiene reservaciones pendientes (${reservasDe(mesa).join(', ')}). ${final}`,
  });

  const eliminarMesa = (mesa) => {
    setMesaConfig(null);
    if (reservasDe(mesa).length > 0) {
      setAvisoConfig(avisoPendientes(mesa, 'Antes debes cancelar esas reservas y cambiarlas a otra mesa.'));
    } else {
      setAvisoConfig({ variante: 'success', texto: `Mesa #${mesa.numero} eliminada.` });
    }
  };

  const cambiarTipo = (mesa) => {
    const otroTipo = mesa.tipo === 'normal' ? 'familiar' : 'normal';
    if (reservasDe(mesa).length > 0) {
      setAvisoConfig(avisoPendientes(mesa, `Debes cambiar esas reservas a otra mesa ${mesa.tipo} antes de continuar.`));
    } else {
      setAvisoConfig({ variante: 'success', texto: `Mesa #${mesa.numero} cambiada a mesa ${otroTipo}.` });
    }
  };

  const mantenimiento = (mesa) => {
    if (mesa.estado === 'mantenimiento') {
      cambiarMesa(mesa.numero, { estado: 'habilitada' });
      setAvisoConfig({ variante: 'success', texto: `La Mesa #${mesa.numero} terminó su mantenimiento y vuelve a estar habilitada.` });
    } else if (reservasDe(mesa).length > 0) {
      setAvisoConfig(avisoPendientes(mesa, `Debes cambiar esas reservas a otra mesa ${mesa.tipo} antes de enviarla a mantenimiento.`));
    } else {
      cambiarMesa(mesa.numero, { estado: 'mantenimiento' });
      setAvisoConfig({ variante: 'success', texto: `Mesa #${mesa.numero} en mantenimiento: nadie podrá reservarla hasta que termine.` });
    }
  };

  const cerrarConfiguracion = () => {
    setConfigurando(false);
    setMesaConfig(null);
    setAvisoConfig(null);
  };

  const registrarMesa = (e) => {
    e.preventDefault();
    avisar(`Mesa #7 (${e.target.tipo.value}) registrada en la sede ${e.target.sede.value}.`);
    setNuevaMesa(false);
  };

  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-3 mb-1">
        <h1 className="h3 fw-bold mb-0">Gestión de Reservas y Mesas</h1>
        {esAdmin && (
          <select className="form-select fw-semibold w-auto" aria-label="Sede">
            {sedes.map((s) => <option key={s}>Sede: {s}</option>)}
          </select>
        )}
      </div>
      <p className="text-muted small mb-4">
        {esAdmin
          ? 'Administración centralizada de la capacidad del salón, tarifas de garantía y control de reservas en vivo.'
          : 'Control de disponibilidad de salón en vivo y validación de llegada de clientes.'}
      </p>

      {cerradas && (
        <Alert variant="danger" className="small fw-semibold">
          Las reservas web están cerradas momentáneamente. Las reservas ya registradas se mantienen.
        </Alert>
      )}

      {esAdmin && (
        <>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <div className="card-brasa p-3">
                <p className="small text-muted fw-semibold mb-1">TOTAL MESAS</p>
                <p className="fs-3 fw-bold mb-0">{mesas.length} Mesas</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-brasa p-3">
                <p className="small text-muted fw-semibold mb-1">RESERVAS HOY</p>
                <p className="fs-3 fw-bold text-brand mb-0">{reservasHoy.length} Reservas</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-brasa p-3">
                <p className="small text-muted fw-semibold mb-1">MESAS MANTENIMIENTO</p>
                <p className="fs-3 fw-bold text-secondary mb-0">
                  {mesas.filter((m) => m.estado === 'mantenimiento').length} Mesa(s)
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mb-3">
            <button type="button" className="btn btn-brand btn-sm fw-semibold px-4" onClick={() => setNuevaMesa(true)}>+ Nueva Mesa</button>
            <button type="button" className="btn btn-brand btn-sm fw-semibold px-4" onClick={() => setConfigurando(true)}>Configurar mesas</button>
          </div>
        </>
      )}

      <section className="card-brasa p-3 p-md-4 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h5 fw-bold mb-1">Estado de Mesas</h2>
            <p className="small text-muted mb-0">Supervisa la disponibilidad de las mesas de los restaurantes y actualiza su estado operativo.</p>
          </div>
          <div className="d-flex gap-2">
            <select className="form-select fw-semibold" aria-label="Día" value={dia} onChange={(e) => setDia(e.target.value)}>
              {dias.map((d) => <option key={d} value={d}>Día: {d}</option>)}
            </select>
            <select className="form-select fw-semibold" aria-label="Sede" value={sede} onChange={(e) => setSede(e.target.value)}>
              {sedes.map((s) => <option key={s} value={s}>Sede: {s}</option>)}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table tabla-panel align-middle mb-0">
            <thead>
              <tr>
                <th>N° Mesa</th>
                <th>Sede</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th className="text-center">Acciones recepción</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map((m) => (
                <tr key={m.numero}>
                  <td className="fw-bold">Mesa #{m.numero}</td>
                  <td className="text-muted">{sede}</td>
                  <td className="text-muted">Hasta {m.capacidad} pers.</td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${badgesMesa[m.estado][0]}`}>{badgesMesa[m.estado][1]}</span>
                  </td>
                  <td className="text-center small fw-semibold">
                    {m.estado === 'habilitada' && (
                      <>
                        <button type="button" className="btn btn-link btn-sm p-0 fw-semibold" onClick={() => setReservando(m)}>Reservar</button>
                        <span className="text-primary mx-1">|</span>
                        <button type="button" className="btn btn-link btn-sm p-0 fw-semibold" onClick={() => bloquear(m)}>Bloquear</button>
                      </>
                    )}
                    {m.estado === 'reservada' && (
                      <>
                        <span className="text-muted d-block">En uso (#{m.codigo})</span>
                        <button type="button" className="btn btn-link btn-sm p-0 fw-semibold" onClick={() => setCancelando(m)}>Cancelar reserva</button>
                      </>
                    )}
                    {m.estado === 'bloqueada' && (
                      <button type="button" className="btn btn-link btn-sm p-0 fw-semibold" onClick={() => desbloquear(m)}>Desbloquear</button>
                    )}
                    {m.estado === 'mantenimiento' && <span className="text-muted">En mantenimiento</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-brasa p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h5 fw-bold mb-1">Monitor de Reservas del Día (Caja y Asistencia)</h2>
            <p className="small text-muted mb-0">Valida la llegada física del cliente para descontar el adelanto pagado o libera la mesa por inasistencia.</p>
          </div>
          {esAdmin && (
            <select className="form-select fw-semibold w-auto" aria-label="Sede del monitor">
              {sedes.map((s) => <option key={s}>Sede: {s}</option>)}
            </select>
          )}
        </div>

        <div className="table-responsive">
          <table className="table tabla-panel align-middle mb-0">
            <thead>
              <tr>
                <th>Cód. reserva</th>
                <th>Cliente</th>
                <th>Mesa / Personas</th>
                <th>Hora</th>
                <th>Adelanto web</th>
                <th>Estado</th>
                <th>Acciones caja</th>
              </tr>
            </thead>
            <tbody>
              {reservasHoy.map((r) => (
                <tr key={r.codigo}>
                  <td className="fw-bold">#{r.codigo}</td>
                  <td className="fw-bold">{r.cliente}</td>
                  <td className="text-muted">Mesa #{r.mesa} ({r.personas} pers.)</td>
                  <td className="text-muted text-nowrap">{r.hora} hrs</td>
                  <td className={`fw-bold text-nowrap ${r.estado === 'noshow' ? 'text-danger' : 'text-brand'}`}>
                    S/ {r.adelanto}.00 {r.estado === 'noshow' ? '(Retenido)' : '(Pagado)'}
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${badgesReserva[r.estado][0]}`}>{badgesReserva[r.estado][1]}</span>
                  </td>
                  <td className="small fw-semibold">
                    {r.estado === 'confirmada' && (
                      <button type="button" className="btn btn-success btn-sm fw-semibold" onClick={() => setLlegada(r)}>Registrar Llegada</button>
                    )}
                    {r.estado === 'comedor' && <span className="text-muted">Abono S/ {r.adelanto} aplicado</span>}
                    {r.estado === 'noshow' && <span className="text-danger">Mesa Liberada</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {esAdmin && (
          <div className="text-center mt-4">
            <button
              type="button"
              className={`btn fw-semibold px-4 ${cerradas ? 'btn-success' : 'btn-danger'}`}
              onClick={() => setPidiendoCierre(true)}
            >
              {cerradas ? 'Reactivar reservas' : 'Cerrar reservas momentáneamente'}
            </button>
          </div>
        )}
      </section>

      <Modal show={reservando !== null} onHide={() => setReservando(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Reservar Mesa #{reservando?.numero}</Modal.Title>
        </Modal.Header>
        <form className="form-brasa" onSubmit={confirmarReserva}>
          <Modal.Body>
            <p className="small text-muted">Día: {dia} · Sede: {sede} · Mesa {reservando?.tipo} (hasta {reservando?.capacidad} pers.)</p>
            <div className="mb-3">
              <label htmlFor="res-nombre" className="form-label">Nombre completo del cliente</label>
              <input id="res-nombre" name="nombre" className="form-control" required minLength={5} />
            </div>
            <div className="mb-3">
              <label htmlFor="res-dni" className="form-label">DNI</label>
              <input id="res-dni" name="dni" className="form-control" required pattern="\d{8}" title="8 dígitos" maxLength={8} />
            </div>
            <div className="row g-3">
              <div className="col-6">
                <label htmlFor="res-personas" className="form-label">Cantidad de personas</label>
                <select id="res-personas" name="personas" className="form-select" required>
                  <option value="">Elegir</option>
                  {reservando && Object.keys(precios[reservando.tipo]).map((p) => (
                    <option key={p} value={p}>{p} (S/ {precios[reservando.tipo][p]})</option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="res-hora" className="form-label">Hora</label>
                <select id="res-hora" name="hora" className="form-select" required>
                  <option value="">Elegir</option>
                  {horas.map((h) => <option key={h} value={h}>{h} hrs</option>)}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-light border" onClick={() => setReservando(null)}>Cancelar</button>
            <button type="submit" className="btn btn-brand">Confirmar reserva</button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={confirmada !== null} onHide={() => setConfirmada(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">¡Reserva confirmada! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {confirmada && (
            <>
              <p className="fw-bold text-brand mb-1">#{confirmada.codigo}</p>
              <p className="mb-1">Mesa #{confirmada.mesa} - Salón Principal · {confirmada.personas}</p>
              <p className="mb-1">{dia} · {confirmada.hora} hrs · Sede {sede}</p>
              <p className="mb-1">A nombre de <strong>{confirmada.nombre}</strong> (DNI {confirmada.dni})</p>
              <p className="precio fs-4">Adelanto: S/ {confirmada.precio}</p>
              <p className="small text-muted">Recuerda: el cliente tiene 15 minutos de tolerancia.</p>
              <button type="button" className="btn btn-brand px-4" onClick={() => setConfirmada(null)}>Entendido</button>
            </>
          )}
        </Modal.Body>
      </Modal>

      <ModalContrasena
        show={cancelando !== null}
        titulo={`Cancelar reserva #${cancelando?.codigo}`}
        alConfirmar={cancelarReserva}
        alCerrar={() => setCancelando(null)}
      >
        <p className="small">La Mesa #{cancelando?.numero} volverá a estar habilitada el {dia}.</p>
      </ModalContrasena>

      <Modal show={llegada !== null} onHide={() => setLlegada(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Registrar llegada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1">¿Estás seguro de registrar la llegada de <strong>{llegada?.cliente}</strong> (#{llegada?.codigo})?</p>
          <p className="small text-muted mb-0">Se aplicará el abono de S/ {llegada?.adelanto} a su consumo y la mesa seguirá ocupada.</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light border" onClick={() => setLlegada(null)}>Cancelar</button>
          <button type="button" className="btn btn-success" onClick={registrarLlegada}>Continuar</button>
        </Modal.Footer>
      </Modal>

      <ModalContrasena
        show={pidiendoCierre}
        titulo={cerradas ? 'Reactivar reservas' : 'Cerrar reservas momentáneamente'}
        alConfirmar={cambiarCierre}
        alCerrar={() => setPidiendoCierre(false)}
      >
        {cerradas ? (
          <p className="small">Los clientes podrán volver a hacer reservas desde la web.</p>
        ) : (
          <ul className="small ps-3">
            <li>No se podrán hacer <strong>nuevas reservas</strong> hasta que las reactives.</li>
            <li>Las reservas ya registradas <strong>se mantienen</strong>.</li>
          </ul>
        )}
      </ModalContrasena>

      <Modal show={nuevaMesa} onHide={() => setNuevaMesa(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Nueva Mesa</Modal.Title>
        </Modal.Header>
        <form className="form-brasa" onSubmit={registrarMesa}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="mesa-sede" className="form-label">Sede</label>
              <select id="mesa-sede" name="sede" className="form-select">
                {sedes.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="mesa-numero" className="form-label">N° de mesa (automático)</label>
              <input id="mesa-numero" className="form-control bg-light text-muted" value="7" readOnly />
            </div>
            <div>
              <label htmlFor="mesa-tipo" className="form-label">Tipo de mesa</label>
              <select id="mesa-tipo" name="tipo" className="form-select">
                <option value="normal">Normal (hasta 4 personas)</option>
                <option value="familiar">Familiar (hasta 8 personas)</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-light border" onClick={() => setNuevaMesa(false)}>Cancelar</button>
            <button type="submit" className="btn btn-brand">Registrar mesa</button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={configurando} onHide={cerrarConfiguracion} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Configurar mesas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select className="form-select fw-semibold w-auto mb-3" aria-label="Sede a configurar">
            {sedes.map((s) => <option key={s}>Sede: {s}</option>)}
          </select>

          {avisoConfig && (
            <Alert variant={avisoConfig.variante} className="small" onClose={() => setAvisoConfig(null)} dismissible>
              {avisoConfig.texto}
            </Alert>
          )}

          {mesas.map((m) => (
            <div key={m.numero} className="border rounded-3 p-2 px-3 mb-2">
              <div className="d-flex align-items-center gap-3">
                <div className="flex-grow-1">
                  <strong>Mesa #{m.numero}</strong>
                  <span className="small text-muted"> · {m.tipo === 'normal' ? 'Normal, hasta 4' : 'Familiar, hasta 8'}</span>
                  {m.estado === 'mantenimiento' && <span className="badge rounded-pill badge-azul ms-2">En mantenimiento</span>}
                  <div className="small">
                    {reservasDe(m).length > 0
                      ? <span className="text-danger">Reservas pendientes: {reservasDe(m).join(', ')}</span>
                      : <span className="text-success">Sin reservaciones</span>}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  title="Configurar"
                  onClick={() => setMesaConfig(mesaConfig === m.numero ? null : m.numero)}
                >
                  <img src="/iconos/gear-fill.svg" alt="Configurar" className="icono" />
                </button>
                <button type="button" className="btn btn-eliminar btn-sm" title="Eliminar" onClick={() => eliminarMesa(m)}>
                  <img src="/iconos/trash.svg" alt="Eliminar" className="icono" />
                </button>
              </div>

              {mesaConfig === m.numero && (
                <div className="d-flex flex-wrap gap-2 mt-2 pt-2 border-top">
                  <button type="button" className="btn btn-sm btn-light border fw-semibold" onClick={() => cambiarTipo(m)}>
                    Cambiar a mesa {m.tipo === 'normal' ? 'familiar' : 'normal'}
                  </button>
                  <button type="button" className="btn btn-sm btn-light border fw-semibold" onClick={() => mantenimiento(m)}>
                    {m.estado === 'mantenimiento' ? 'Terminar mantenimiento' : 'Enviar a mantenimiento'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReservasMesas;
