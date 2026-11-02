import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ModalContrasena from './ModalContrasena';

const preciosMesa = [
  { tipo: 'Mesa regular', opciones: [['1 persona', 15], ['2 personas', 25], ['3 personas', 40], ['4 personas', 50]] },
  { tipo: 'Mesa familiar', opciones: [['5 - 6 personas', 60], ['7 - 8 personas', 100]] },
];

const mensajes = {
  perfil: 'Datos del usuario actualizados.',
  precios: 'Precios de adelanto actualizados.',
  empresa: 'Datos de la sede y empresa actualizados.',
};

const direccionAdmin = 'Av. José Larco 1150, Miraflores';

function Configuracion() {
  const avisar = useOutletContext();
  const { usuario } = useAuth();
  const [editando, setEditando] = useState(false);
  const [accion, setAccion] = useState(null);

  const pedirContrasena = (tipo) => (e) => {
    e.preventDefault();
    setAccion(tipo);
  };

  const confirmar = () => {
    avisar(mensajes[accion]);
    if (accion === 'perfil') setEditando(false);
    setAccion(null);
  };

  return (
    <>
      <h1 className="h3 fw-bold mb-1">Configuración del Sistema</h1>
      <p className="text-muted small mb-4">Ajuste de parámetros del negocio, reglas de reserva, pasarela de pagos e información legal de la pollería.</p>

      <section className="card-brasa p-3 p-md-4 mb-4">
        <div className="d-flex flex-wrap align-items-center gap-4">
          <span className="avatar-perfil">
            <img src="/iconos/person-fill.svg" alt="Foto de perfil" />
          </span>
          <div className="flex-grow-1">
            <p className="fw-bold fs-5 mb-1">{usuario.nombre}</p>
            <p className="small mb-1"><span className="text-muted">Usuario:</span> <strong>{usuario.usuario}</strong></p>
            <p className="small mb-1"><span className="text-muted">Contraseña:</span> <strong>••••••••</strong></p>
            <p className="small mb-1"><span className="text-muted">DNI:</span> <strong>{usuario.dni}</strong></p>
            <p className="small mb-0"><span className="text-muted">Dirección:</span> <strong>{direccionAdmin}</strong></p>
          </div>
          {!editando && (
            <button type="button" className="btn btn-brasa-dark fw-semibold px-4 align-self-start" onClick={() => setEditando(true)}>Editar usuario</button>
          )}
        </div>

        {editando && (
          <form className="form-brasa border-top mt-4 pt-4" onSubmit={pedirContrasena('perfil')}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="adm-nombre" className="form-label">Nombre completo</label>
                <input id="adm-nombre" className="form-control" defaultValue={usuario.nombre} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="adm-usuario" className="form-label">Usuario</label>
                <input id="adm-usuario" className="form-control" defaultValue={usuario.usuario} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="adm-dni" className="form-label">DNI</label>
                <input id="adm-dni" className="form-control" defaultValue={usuario.dni} required pattern="\d{8}" title="8 dígitos" maxLength={8} />
              </div>
              <div className="col-md-6">
                <label htmlFor="adm-direccion" className="form-label">Dirección</label>
                <input id="adm-direccion" className="form-control" defaultValue={direccionAdmin} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="adm-clave" className="form-label">Nueva contraseña (opcional)</label>
                <input id="adm-clave" type="password" className="form-control" minLength={6} />
              </div>
              <div className="col-md-6">
                <label htmlFor="adm-foto" className="form-label">Foto de perfil</label>
                <input id="adm-foto" type="file" accept=".png,.jpg" className="form-control" />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button type="button" className="btn btn-light border" onClick={() => setEditando(false)}>Cancelar</button>
              <button type="submit" className="btn btn-brand px-4">Continuar</button>
            </div>
          </form>
        )}
      </section>

      <form className="card-brasa form-brasa p-3 p-md-4 mb-4" onSubmit={pedirContrasena('precios')}>
        <h2 className="h5 fw-bold mb-1">Reglas de reserva</h2>
        <p className="small text-muted mb-3">Adelanto que paga el cliente según el tipo de mesa y la cantidad de personas.</p>
        <div className="row g-4">
          {preciosMesa.map((grupo) => (
            <div key={grupo.tipo} className="col-md-6">
              <p className="fw-bold small mb-2">{grupo.tipo}</p>
              {grupo.opciones.map(([personas, precio]) => (
                <div key={personas} className="input-group input-group-sm mb-2">
                  <span className="input-group-text" style={{ width: 130 }}>{personas}</span>
                  <span className="input-group-text">S/</span>
                  <input type="number" min="0" className="form-control" defaultValue={precio} required aria-label={`Precio ${personas}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-brand fw-semibold px-4 mt-2">Guardar cambios</button>
        </div>
      </form>

      <div className="row g-4">
        <div className="col-lg-6">
          <form className="card-brasa form-brasa p-3 p-md-4 h-100" onSubmit={pedirContrasena('empresa')}>
            <h2 className="h5 fw-bold mb-1">Datos de la Sede y Empresa</h2>
            <p className="small text-muted mb-3">Información visible en comprobantes de reserva y boletas.</p>
            <div className="mb-3">
              <label htmlFor="emp-ruc" className="form-label">Razón Social y RUC</label>
              <input id="emp-ruc" className="form-control" defaultValue="BRASA Y FUEGO S.A.C. - 20601234567" required />
            </div>
            <div className="mb-3">
              <label htmlFor="emp-direccion" className="form-label">Dirección Sede Principal</label>
              <input id="emp-direccion" className="form-control" defaultValue="Av. Antúnez de Mayolo 1020, Los Olivos, Lima" required />
            </div>
            <div className="mb-3">
              <label htmlFor="emp-telefono" className="form-label">Teléfono Central de Atención</label>
              <input id="emp-telefono" className="form-control" defaultValue="(01) 500-6000 / +51 987654321" required />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-brasa-dark fw-semibold px-4">Actualizar Datos</button>
            </div>
          </form>
        </div>

        <div className="col-lg-6">
          <section className="card-brasa p-3 p-md-4 h-100">
            <h2 className="h5 fw-bold mb-1">Pasarela de Pagos e Integración</h2>
            <p className="small text-muted mb-3">Estado de conectividad con los canales de cobro web y POS.</p>
            <div className="d-flex justify-content-between align-items-center bg-light border rounded-3 p-3 mb-3">
              <div>
                <p className="fw-bold small mb-0">Cobro QR (Yape / Plin)</p>
                <p className="small text-muted mb-0">Confirmación automática de adelantos</p>
              </div>
              <span className="badge rounded-pill badge-abierto px-3 py-2">Activo</span>
            </div>
            <div className="d-flex justify-content-between align-items-center bg-light border rounded-3 p-3">
              <div>
                <p className="fw-bold small mb-0">Pasarela Tarjeta (Visa / Mastercard)</p>
                <p className="small text-muted mb-0">Procesamiento seguro de pasarela online</p>
              </div>
              <span className="badge rounded-pill badge-abierto px-3 py-2">Activo</span>
            </div>
          </section>
        </div>
      </div>

      <ModalContrasena show={accion !== null} titulo="Confirmar cambios" alConfirmar={confirmar} alCerrar={() => setAccion(null)} />
    </>
  );
}

export default Configuracion;
