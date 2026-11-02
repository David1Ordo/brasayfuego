import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { usuariosDemo, ROLES, ROLES_PANEL } from '../data/usuarios';

function Login() {
  const { login, entrarComoInvitado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { from: destino, mensaje, requiereCuenta } = location.state || {};

  const [form, setForm] = useState({ identificador: '', password: '' });
  const [errorLogin, setErrorLogin] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [recuperar, setRecuperar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorLogin('');
  };

  const iniciarSesion = (e) => {
    e.preventDefault();
    const resultado = login(form.identificador, form.password);
    if (!resultado.ok) {
      setErrorLogin(resultado.error);
      return;
    }
    const porDefecto = ROLES_PANEL.includes(resultado.usuario.rol) ? '/admin' : '/';
    navigate(destino || porDefecto, { replace: true });
  };

  const entrarInvitado = () => {
    entrarComoInvitado();
    navigate(destino && !requiereCuenta ? destino : '/', { replace: true });
  };

  const abrirRecuperar = () => {
    setEnviado(false);
    setRecuperar(true);
  };

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 440 }}>
        <div className="card-brasa p-4 p-md-5 shadow-sm">
          <div className="text-center mb-4">
            <div className="marca fs-5">BRASA & FUEGO</div>
            <h1 className="h4 fw-bold mb-1">INICIAR SESIÓN</h1>
            <p className="text-muted small mb-0">Ingresa a tu cuenta para realizar reservas</p>
          </div>

          {mensaje && <Alert variant="warning" className="small py-2">{mensaje}</Alert>}
          {errorLogin && <Alert variant="danger" className="small py-2">{errorLogin}</Alert>}

          <form className="form-brasa" onSubmit={iniciarSesion}>
            <div className="mb-3">
              <label htmlFor="identificador" className="form-label">Usuario o Correo Electrónico *</label>
              <input
                id="identificador"
                name="identificador"
                className="form-control"
                placeholder="Ingresa tu usuario o correo electrónico..."
                value={form.identificador}
                onChange={cambiar}
                required
              />
            </div>

            <div className="mb-1">
              <label htmlFor="password" className="form-label">Contraseña *</label>
              <div className="input-group">
                <input
                  id="password"
                  name="password"
                  type={verPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={cambiar}
                  required
                  minLength={6}
                />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setVerPassword(!verPassword)}>
                  {verPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="text-end mb-4">
              <button type="button" className="btn btn-link p-0 text-brand fw-semibold small text-decoration-none" onClick={abrirRecuperar}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="btn btn-brand w-100 fw-semibold py-2">Iniciar sesión</button>
          </form>

          <div className="separador-o d-flex align-items-center gap-3 my-3">o</div>

          <button type="button" className="btn btn-invitado w-100 fw-semibold py-2" onClick={entrarInvitado}>
            Entrar como invitado →
          </button>
          {requiereCuenta && (
            <p className="text-muted text-center small mt-2 mb-0">Como invitado puedes hacer pedidos, pero no reservar mesa.</p>
          )}
        </div>

        <div className="card-brasa bg-brasa-gris p-3 mt-3">
          <p className="small fw-bold mb-2">🔑 Cuentas de prueba</p>
          {usuariosDemo.map((cuenta) => (
            <div key={cuenta.usuario} className="d-flex justify-content-between align-items-center small py-1">
              <span><strong>{ROLES[cuenta.rol]}:</strong> {cuenta.usuario} / {cuenta.password}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary py-0"
                onClick={() => setForm({ identificador: cuenta.usuario, password: cuenta.password })}
              >
                Usar
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal show={recuperar} onHide={() => setRecuperar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Recuperar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {enviado ? (
            <Alert variant="success" className="mb-0 small">
              Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.
            </Alert>
          ) : (
            <form className="form-brasa" onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}>
              <label htmlFor="correo-recuperar" className="form-label">Correo electrónico</label>
              <input id="correo-recuperar" type="email" className="form-control mb-3" placeholder="tucorreo@ejemplo.com" required />
              <button type="submit" className="btn btn-brand w-100 fw-semibold">Enviar enlace</button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
