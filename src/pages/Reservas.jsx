import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Mesacard from '../components/Mesacard';
import { useAuth } from '../context/AuthContext';

const mesas = [
  { numero: 1, nombre: 'Mesa #1', tipo: 'normal', capacidad: 4 },
  { numero: 2, nombre: 'Mesa #2', tipo: 'normal', capacidad: 4 },
  { numero: 3, nombre: 'Mesa #3', tipo: 'normal', capacidad: 4 },
  { numero: 4, nombre: 'Mesa #4', tipo: 'normal', capacidad: 4 },
  { numero: 5, nombre: 'Mesa Familiar #5', tipo: 'familiar', capacidad: 8 },
  { numero: 6, nombre: 'Mesa Familiar #6', tipo: 'familiar', capacidad: 8 },
];

const precios = {
  normal: { '1 persona': 15, '2 personas': 25, '3 personas': 40, '4 personas': 50 },
  familiar: { '5 - 6 personas': 60, '7 - 8 personas': 100 },
};

const sedes = ['Sede Miraflores - Larco', 'Sede Surco - Chacarilla', 'Sede Los Olivos - Mayolo'];
const horas = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

const hoy = new Date();
const nombreMes = hoy.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
const diasDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
const espaciosVacios = (new Date(hoy.getFullYear(), hoy.getMonth(), 1).getDay() + 6) % 7;
const mesActual = hoy.getMonth() + 1;

function Reservas() {
  const { usuario } = useAuth();
  const [sede, setSede] = useState(sedes[0]);
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState('');
  const [mesaElegida, setMesaElegida] = useState(null);
  const [personas, setPersonas] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [reservadas, setReservadas] = useState([2, 5]);
  const [confirmada, setConfirmada] = useState(null);

  const mesa = mesas.find((m) => m.numero === mesaElegida);
  const precio = mesa && personas ? precios[mesa.tipo][personas] : null;
  const completo = mesa && personas && dia && hora && acepta;

  const elegirMesa = (numero) => {
    setMesaElegida(numero === mesaElegida ? null : numero);
    setPersonas('');
  };

  const pagarAdelanto = () => {
    setConfirmada({ mesa: mesa.nombre, personas, dia, hora, sede, precio });
    setReservadas([...reservadas, mesa.numero]);
    setMesaElegida(null);
    setPersonas('');
    setAcepta(false);
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">

        <aside className="col-lg-3 reservas-sidebar p-3 p-xl-4" data-bs-theme="dark">
          <h1 className="h4 fw-bold mb-3">Reservas</h1>

          <div className="fila-reserva mb-2">
            <label htmlFor="sede-reserva">Sede</label>
            <select id="sede-reserva" className="form-select" value={sede} onChange={(e) => setSede(e.target.value)}>
              {sedes.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="fila-reserva mb-2">
            <label htmlFor="personas-reserva">Cantidad personas</label>
            <select id="personas-reserva" className="form-select" value={personas} onChange={(e) => setPersonas(e.target.value)} disabled={!mesa}>
              <option value="">{mesa ? 'Elegir' : 'Elige una mesa'}</option>
              {mesa && Object.keys(precios[mesa.tipo]).map((opcion) => (
                <option key={opcion} value={opcion}>{opcion} (S/ {precios[mesa.tipo][opcion]})</option>
              ))}
            </select>
          </div>

          <div className="fila-reserva mb-2">
            <span>Día</span>
            <span className="text-white-50 small">{dia ? `${dia}/${mesActual}` : 'Elegir'}</span>
          </div>
          <div className="calendario p-2">
            <p className="fw-bold text-uppercase small text-center mb-2">{nombreMes}</p>
            <div className="calendario-grid">
              <span className="calendario-semana">Lu</span>
              <span className="calendario-semana">Ma</span>
              <span className="calendario-semana">Mi</span>
              <span className="calendario-semana">Ju</span>
              <span className="calendario-semana">Vi</span>
              <span className="calendario-semana">Sá</span>
              <span className="calendario-semana">Do</span>
              {Array.from({ length: espaciosVacios }, (_, i) => <span key={`vacio-${i}`} />)}
              {Array.from({ length: diasDelMes }, (_, i) => i + 1).map((numero) => (
                <button
                  key={numero}
                  type="button"
                  className={`calendario-dia ${dia === numero ? 'activo' : ''}`}
                  onClick={() => setDia(numero)}
                >
                  {numero}
                </button>
              ))}
            </div>
          </div>

          <div className="fila-reserva mt-2 mb-4">
            <label htmlFor="hora-reserva">Hora</label>
            <select id="hora-reserva" className="form-select" value={hora} onChange={(e) => setHora(e.target.value)}>
              <option value="">Elegir</option>
              {horas.map((h) => <option key={h} value={h}>{h} hrs</option>)}
            </select>
          </div>

          <div className="caja-oscura p-3 mb-3">
            <p className="fw-bold text-amarillo small mb-1">⏱ 15 mins de tolerancia</p>
            <p className="small text-white-50 mb-0">Tolerancia máxima de 15 minutos. De no llegar, la reserva se libera.</p>
          </div>

          <div className="caja-oscura caja-resumen p-3 mb-3">
            <p className="text-white-50 fw-bold mb-1 small">RESUMEN RESERVA:</p>
            {mesa ? (
              <>
                <p className="fw-bold mb-1">{mesa.nombre} - Salón Principal {personas && `(${personas})`}</p>
                <p className="small mb-0">{dia ? `${dia}/${mesActual}` : 'Día por elegir'} • {hora ? `${hora} hrs` : 'Hora por elegir'}</p>
                <p className="small fw-semibold mb-0">{sede}</p>
              </>
            ) : (
              <p className="small mb-0">Elige una mesa disponible.</p>
            )}
          </div>

          <button type="button" className="btn btn-brand w-100 fw-bold py-2" disabled={!completo} onClick={pagarAdelanto}>
            PAGAR ADELANTO<br />{precio ? `S/ ${precio}` : 'S/ --'}
          </button>
          {!completo && <p className="small text-white-50 mt-2 mb-0">Elige mesa, personas, día, hora y acepta los términos.</p>}

          <div className="caja-gris p-3 mt-4 small">
            <p className="fw-bold mb-2">Contáctanos:</p>
            <p className="mb-1"><img src="/iconos/envelope.svg" alt="" className="icono icono-claro me-2" />brasayfuego@gmail.com</p>
            <p className="mb-1"><img src="/iconos/telephone-forward-fill.svg" alt="" className="icono icono-claro me-2" />+51 123 456 789</p>
            <p className="text-white-50 mb-0">Atención 12:00 pm - 11:00 pm</p>
          </div>
        </aside>

        <div className="col-lg-9 p-3 p-md-5">
          <h2 className="h3 fw-bold mb-3">Elige tu Mesa en el Salón Principal</h2>
          <p className="text-muted small mb-4">
            Configura tus filtros en la barra lateral izquierda y selecciona tu mesa disponible.<br />
            Las reservas se deben realizar con al menos un día de anticipación.
          </p>

          <div className="row g-4 mb-4">
            {mesas.map((m) => (
              <div className="col-md-6" key={m.numero}>
                <Mesacard
                  mesa={m}
                  estado={reservadas.includes(m.numero) ? 'reservada' : m.numero === mesaElegida ? 'seleccionada' : 'disponible'}
                  alElegir={elegirMesa}
                />
              </div>
            ))}
          </div>

          <div className="form-check">
            <input id="acepto-terminos" type="checkbox" className="form-check-input" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
            <label htmlFor="acepto-terminos" className="form-check-label small fw-semibold">
              Acepto los <Link to="/legal#terminos" target="_blank" className="text-brand">Términos y Condiciones</Link> y
              declaro que asistirán {personas ? <strong>{personas}</strong> : 'las personas indicadas'} (aforo estricto por
              reserva: no se permitirán personas adicionales).
            </label>
          </div>
        </div>
      </div>

      <Modal show={confirmada !== null} onHide={() => setConfirmada(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">¡Reserva confirmada! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {confirmada && (
            <>
              <p className="mb-1">{confirmada.mesa} - Salón Principal · {confirmada.personas}</p>
              <p className="mb-1">{confirmada.dia}/{mesActual} · {confirmada.hora} hrs · {confirmada.sede}</p>
              <p className="mb-1">A nombre de <strong>{usuario.nombre}</strong></p>
              <p className="precio fs-4">Adelanto: S/ {confirmada.precio}</p>
              <p className="small text-muted">Recuerda: tienes 15 minutos de tolerancia.</p>
              <button type="button" className="btn btn-brand px-4" onClick={() => setConfirmada(null)}>Entendido</button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reservas;
