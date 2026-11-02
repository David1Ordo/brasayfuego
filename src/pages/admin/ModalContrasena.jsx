import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { usuariosDemo } from '../../data/usuarios';

function ModalContrasena({ show, titulo, children, alConfirmar, alCerrar }) {
  const { usuario } = useAuth();
  const [error, setError] = useState(false);

  const confirmar = (e) => {
    e.preventDefault();
    const cuenta = usuariosDemo.find((u) => u.usuario === usuario.usuario);
    if (cuenta && cuenta.password === e.target.clave.value) {
      setError(false);
      alConfirmar();
    } else {
      setError(true);
    }
  };

  const cerrar = () => {
    setError(false);
    alCerrar();
  };

  return (
    <Modal show={show} onHide={cerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
        <form className="form-brasa" onSubmit={confirmar}>
          <label htmlFor="clave-confirmar" className="form-label">Ingresa tu contraseña para continuar</label>
          <input id="clave-confirmar" name="clave" type="password" className="form-control" required autoFocus />
          {error && <p className="small text-danger mt-1 mb-0">Contraseña incorrecta.</p>}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-light border" onClick={cerrar}>Cancelar</button>
            <button type="submit" className="btn btn-brand">Continuar</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalContrasena;
