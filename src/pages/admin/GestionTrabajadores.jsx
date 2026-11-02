import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const cargos = ['Chef', 'Mozo', 'Cajero', 'Recepción', 'Supervisor de sede'];
const turnos = ['Tarde (10:00 hrs - 16:00 hrs)', 'Noche (16:00 hrs - 22:00 hrs)'];
const sedes = ['Sede Miraflores - Larco', 'Sede Surco - Chacarilla', 'Sede Los Olivos - Mayolo'];

const trabajadoresIniciales = [
  { id: 1, nombre: 'Luis Paredes', dni: '45678912', cargo: 'Recepción', turno: turnos[0], correo: 'recepcion@brasayfuego.pe', sede: sedes[0], activo: true },
  { id: 2, nombre: 'Carlos Ruiz Paredes', dni: '72849103', cargo: 'Recepción', turno: turnos[1], correo: 'carlos.ruiz@brasayfuego.pe', sede: sedes[1], activo: true },
  { id: 3, nombre: 'Ana Gutiérrez Torres', dni: '75920184', cargo: 'Cajero', turno: turnos[1], correo: 'ana.gutierrez@brasayfuego.pe', sede: sedes[0], activo: true },
  { id: 4, nombre: 'Miguel Benítez Castro', dni: '71039482', cargo: 'Chef', turno: turnos[1], correo: 'miguel.benitez@brasayfuego.pe', sede: sedes[2], activo: false },
  { id: 5, nombre: 'Rosa Quispe Huamán', dni: '70451236', cargo: 'Mozo', turno: turnos[0], correo: 'rosa.quispe@brasayfuego.pe', sede: sedes[0], activo: true },
  { id: 6, nombre: 'Diego Salazar Rojas', dni: '73582914', cargo: 'Mozo', turno: turnos[1], correo: 'diego.salazar@brasayfuego.pe', sede: sedes[1], activo: true },
  { id: 7, nombre: 'Lucía Fernández Vega', dni: '76014528', cargo: 'Chef', turno: turnos[0], correo: 'lucia.fernandez@brasayfuego.pe', sede: sedes[1], activo: true },
  { id: 8, nombre: 'Jorge Castillo Ramos', dni: '72236810', cargo: 'Supervisor de sede', turno: turnos[1], correo: 'jorge.castillo@brasayfuego.pe', sede: sedes[2], activo: true },
];

const POR_PAGINA = 5;

function GestionTrabajadores() {
  const avisar = useOutletContext();
  const [trabajadores, setTrabajadores] = useState(trabajadoresIniciales);
  const [pagina, setPagina] = useState(1);
  const [formulario, setFormulario] = useState(null);

  const esNuevo = formulario === 'nuevo';
  const datos = formulario && !esNuevo ? formulario : {};
  const totalPaginas = Math.ceil(trabajadores.length / POR_PAGINA);
  const desde = (pagina - 1) * POR_PAGINA;
  const visibles = trabajadores.slice(desde, desde + POR_PAGINA);

  const guardar = (e) => {
    e.preventDefault();
    avisar(esNuevo ? 'Trabajador registrado.' : 'Cambios realizados.');
    setFormulario(null);
  };

  const cambiarEstado = (trabajador) => {
    setTrabajadores(trabajadores.map((t) => (t.id === trabajador.id ? { ...t, activo: !t.activo } : t)));
    avisar(`${trabajador.nombre} ${trabajador.activo ? 'desactivado' : 'activado'}.`);
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h1 className="h3 fw-bold mb-1">Gestión de Trabajadores</h1>
          <p className="text-muted small mb-0">Control de personal del restaurante, asignación de roles, turnos de atención y permisos del sistema.</p>
        </div>
        <button type="button" className="btn btn-brand fw-semibold px-4" onClick={() => setFormulario('nuevo')}>+ Nuevo Trabajador</button>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-xl-4">
          <input className="form-control" placeholder="Buscar trabajador por nombre, DNI, usuario o cargo..." />
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select className="form-select fw-semibold" aria-label="Rol">
            <option>Rol: Todos</option>
            {cargos.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select className="form-select fw-semibold" aria-label="Turno">
            <option>Turno: Todos</option>
            <option>Tarde</option>
            <option>Noche</option>
          </select>
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select className="form-select fw-semibold" aria-label="Estado">
            <option>Estado: Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select className="form-select fw-semibold" aria-label="Sede">
            <option>Sede: Todos</option>
            {sedes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {visibles.map((t) => (
        <div key={t.id} className="card-brasa p-3 p-md-4 mb-3">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <span className={`avatar avatar-grande ${t.activo ? 'avatar-azul' : 'avatar-amarillo'}`}>
              <img src="/iconos/person-fill.svg" alt="" className="icono" />
            </span>
            <strong>{t.nombre}</strong>
            <span className="small text-muted">DNI: <strong className="text-dark">{t.dni}</strong></span>
            <span className={`badge rounded-pill px-3 py-2 ms-auto ${t.activo ? 'badge-abierto' : 'badge-amarillo'}`}>
              {t.activo ? '● Activo' : 'Inactivo'}
            </span>
          </div>
          <div className="row g-3 small">
            <div className="col-md-3">
              <span className="text-muted d-block">Cargo:</span>
              <strong>{t.cargo}</strong>
            </div>
            <div className="col-md-4">
              <span className="text-muted d-block">Turno de Trabajo:</span>
              {t.turno}
            </div>
            <div className="col-md-5">
              <span className="text-muted d-block">Contacto Directo:</span>
              {t.correo}
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-end gap-2 mt-3">
            <button type="button" className="btn btn-sm btn-light border fw-semibold px-4" onClick={() => setFormulario(t)}>Editar</button>
            <button
              type="button"
              className={`btn btn-sm fw-semibold px-4 ${t.activo ? 'btn-eliminar' : 'btn-activar'}`}
              onClick={() => cambiarEstado(t)}
            >
              {t.activo ? 'Desactivar' : 'Activar'}
            </button>
            <div className="small ms-md-auto">
              <span className="text-muted d-block">Sede</span>
              <strong>{t.sede}</strong>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4">
        <span className="small text-muted fw-semibold">
          Mostrando {desde + 1} - {desde + visibles.length} de {trabajadores.length} trabajadores registrados
        </span>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-light border" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>◀</button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" className={`btn btn-sm ${n === pagina ? 'btn-brand' : 'btn-light border'}`} onClick={() => setPagina(n)}>{n}</button>
          ))}
          <button type="button" className="btn btn-sm btn-light border" disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>▶</button>
        </div>
      </div>

      <Modal show={formulario !== null} onHide={() => setFormulario(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">{esNuevo ? 'Nuevo Trabajador' : 'Editar Trabajador'}</Modal.Title>
        </Modal.Header>
        <form className="form-brasa" onSubmit={guardar}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-8">
                <label htmlFor="tra-nombre" className="form-label">Nombre completo</label>
                <input id="tra-nombre" className="form-control" defaultValue={datos.nombre} required minLength={5} />
              </div>
              <div className="col-md-4">
                <label htmlFor="tra-dni" className="form-label">DNI</label>
                <input id="tra-dni" className="form-control" defaultValue={datos.dni} required pattern="\d{8}" title="8 dígitos" maxLength={8} />
              </div>
              <div className="col-md-6">
                <label htmlFor="tra-cargo" className="form-label">Cargo</label>
                <select id="tra-cargo" className="form-select" defaultValue={datos.cargo}>
                  {cargos.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="tra-turno" className="form-label">Turno</label>
                <select id="tra-turno" className="form-select" defaultValue={datos.turno}>
                  {turnos.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="tra-correo" className="form-label">Correo de contacto</label>
                <input id="tra-correo" type="email" className="form-control" defaultValue={datos.correo} required />
              </div>
              <div className="col-12">
                <label htmlFor="tra-sede" className="form-label">Sede</label>
                <select id="tra-sede" className="form-select" defaultValue={datos.sede}>
                  {sedes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-light border" onClick={() => setFormulario(null)}>Cancelar</button>
            <button type="submit" className="btn btn-brand">{esNuevo ? 'Registrar trabajador' : 'Confirmar cambios'}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default GestionTrabajadores;
