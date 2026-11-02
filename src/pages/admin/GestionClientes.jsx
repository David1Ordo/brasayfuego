import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const clientes = [
  { id: 1, nombre: 'Carla Ríos', usuario: 'cliente', correo: 'cliente@brasayfuego.pe', direccion: 'Av. Benavides 1450, Miraflores', password: 'cliente123', registro: '2026-10-20' },
  { id: 2, nombre: 'Juan Carlos Pérez', usuario: 'jperez2026', correo: 'juan.perez@gmail.com', direccion: 'Av. Antúnez de Mayolo 1020, Los Olivos', password: 'juanp2026', registro: '2026-09-14' },
  { id: 3, nombre: 'María Rodríguez Silva', usuario: 'mrodriguez', correo: 'maria.rod@hotmail.com', direccion: 'Av. José Larco 850, Miraflores', password: 'maria850', registro: '2026-08-02' },
  { id: 4, nombre: 'Carlos Mendoza Castro', usuario: 'cmendoza', correo: 'carlos.mendoza@gmail.com', direccion: 'Av. Caminos del Inca 1240, Surco', password: 'cmendoza1', registro: '2026-07-11' },
];

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('');

function GestionClientes() {
  const avisar = useOutletContext();
  const [orden, setOrden] = useState('recientes');
  const [verClave, setVerClave] = useState(null);
  const [formulario, setFormulario] = useState(null);

  const esNuevo = formulario === 'nuevo';
  const datos = formulario && !esNuevo ? formulario : {};

  const ordenados = [...clientes].sort((a, b) => {
    if (orden === 'antiguos') return a.registro.localeCompare(b.registro);
    if (orden === 'az') return a.nombre.localeCompare(b.nombre);
    if (orden === 'za') return b.nombre.localeCompare(a.nombre);
    return b.registro.localeCompare(a.registro);
  });

  const guardar = (e) => {
    e.preventDefault();
    avisar(esNuevo ? 'Cliente registrado.' : 'Cambios realizados.');
    setFormulario(null);
  };

  const eliminar = (cliente) => {
    if (window.confirm(`¿Eliminar la cuenta de ${cliente.nombre}?`)) avisar('Cliente eliminado.');
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h1 className="h3 fw-bold mb-1">Gestión de Clientes 👥</h1>
          <p className="text-muted small mb-0">Administración centralizada de usuarios registrados, roles y credenciales de acceso.</p>
        </div>
        <button type="button" className="btn btn-brand fw-semibold px-4" onClick={() => setFormulario('nuevo')}>+ Nuevo Cliente</button>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="🔍 Buscar cliente por nombre, usuario, correo o DNI..." />
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select fw-semibold" aria-label="Estado">
            <option>Estado: Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select fw-semibold" aria-label="Ordenar" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="recientes">Ordenar: Más recientes</option>
            <option value="antiguos">Más antiguos</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>
      </div>

      {ordenados.map((c) => (
        <div key={c.id} className="card-brasa mb-3">
          <div className="d-flex flex-wrap align-items-center gap-3 px-3 py-2 bg-light border-bottom rounded-top-4">
            <span className="avatar">{iniciales(c.nombre)}</span>
            <strong>{c.nombre}</strong>
            <span className="small text-muted">Usuario: <strong className="text-dark">@{c.usuario}</strong></span>
            <span className="badge rounded-pill badge-abierto px-3 py-2 ms-auto">● Activo</span>
          </div>
          <div className="p-3">
            <div className="row g-3 small">
              <div className="col-md-4">
                <span className="text-muted d-block">Correo Electrónico:</span>
                <strong>{c.correo}</strong>
              </div>
              <div className="col-md-5">
                <span className="text-muted d-block">Ubicación / Dirección:</span>
                <strong>{c.direccion}</strong>
              </div>
              <div className="col-md-3">
                <span className="text-muted d-block">Contraseña:</span>
                <strong>{verClave === c.id ? c.password : '••••••••••'}</strong>
                <button type="button" className="btn btn-link btn-sm p-0 ms-2 text-decoration-none" onClick={() => setVerClave(verClave === c.id ? null : c.id)}>👁</button>
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="button" className="btn btn-sm btn-light border fw-semibold px-3" onClick={() => setFormulario(c)}>✏️ Editar Usuario</button>
              <button type="button" className="btn btn-sm btn-eliminar fw-semibold px-3" onClick={() => eliminar(c)}>🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4">
        <span className="small text-muted fw-semibold">Mostrando 1 - {clientes.length} de {clientes.length} clientes registrados</span>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-light border" disabled>◀</button>
          <button type="button" className="btn btn-sm btn-brand">1</button>
          <button type="button" className="btn btn-sm btn-light border" disabled>▶</button>
        </div>
      </div>

      <Modal show={formulario !== null} onHide={() => setFormulario(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">{esNuevo ? 'Nuevo Cliente' : 'Editar Usuario'}</Modal.Title>
        </Modal.Header>
        <form className="form-brasa" onSubmit={guardar}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="cli-nombre" className="form-label">Nombre completo</label>
              <input id="cli-nombre" className="form-control" defaultValue={datos.nombre} required minLength={5} />
            </div>
            <div className="mb-3">
              <label htmlFor="cli-usuario" className="form-label">Usuario</label>
              <input id="cli-usuario" className="form-control" defaultValue={datos.usuario} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cli-correo" className="form-label">Correo electrónico</label>
              <input id="cli-correo" type="email" className="form-control" defaultValue={datos.correo} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cli-direccion" className="form-label">Ubicación / Dirección</label>
              <input id="cli-direccion" className="form-control" defaultValue={datos.direccion} required />
            </div>
            <div>
              <label htmlFor="cli-clave" className="form-label">Contraseña</label>
              <input id="cli-clave" className="form-control" defaultValue={datos.password} required minLength={6} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-light border" onClick={() => setFormulario(null)}>Cancelar</button>
            <button type="submit" className="btn btn-brand">{esNuevo ? 'Registrar cliente' : 'Confirmar cambios'}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default GestionClientes;
