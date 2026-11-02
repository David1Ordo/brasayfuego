import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Legal() {
  const { hash } = useLocation();
  const activa = hash.slice(1) || 'terminos';

  return (
    <div className="container py-5">
      <h1 className="h3 fw-bold mb-1">Centro Legal & Políticas</h1>
      <p className="text-muted small mb-4">Revisa nuestros términos de servicio, políticas de privacidad y preguntas frecuentes.</p>

      <div className="row g-4">
        <aside className="col-lg-3">
          <div className="card-brasa p-2">
            <Link to="#terminos" className={`legal-tab ${activa === 'terminos' ? 'active' : ''}`}>Términos y Condiciones</Link>
            <Link to="#privacidad" className={`legal-tab ${activa === 'privacidad' ? 'active' : ''}`}>Políticas de Privacidad</Link>
            <Link to="#faq" className={`legal-tab ${activa === 'faq' ? 'active' : ''}`}>Preguntas Frecuentes</Link>

            <div className="caja-ayuda p-3 mt-2 small">
              <p className="fw-bold mb-1">¿Necesitas ayuda directa?</p>
              <p className="text-white-50 mb-1"><img src="/iconos/envelope.svg" alt="" className="icono icono-claro me-2" />soporte@brasa.pe</p>
              <p className="text-white-50 mb-0"><img src="/iconos/telephone-forward-fill.svg" alt="" className="icono icono-claro me-2" />987 654 321</p>
            </div>
          </div>
        </aside>

        <div className="col-lg-9">
          <section className="card-brasa p-4 p-md-5 h-100">

            {activa === 'terminos' && (
              <>
                <h2 className="h4 fw-bold mb-3">1. Términos y Condiciones del Servicio</h2>
                <p className="text-muted">
                  Bienvenido a Brasa & Fuego. Al hacer tu pedido por nuestra web o por teléfono, aceptas nuestras condiciones
                  de venta. Los precios y promociones pueden variar sin previo aviso según la disponibilidad de nuestros locales.
                </p>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• Reservas de mesa:</p>
                  <p className="text-muted mb-0">
                    Las reservas son solo para clientes con cuenta y se realizan con al menos un día de anticipación. El
                    adelanto depende del tipo de mesa y de la cantidad de personas declaradas. Hay 15 minutos de tolerancia:
                    pasado ese tiempo la reserva se libera.
                  </p>
                </div>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• Aforo y cantidad de personas:</p>
                  <p className="text-muted mb-0">
                    Al reservar, el cliente declara bajo su responsabilidad la cantidad de personas que asistirán. El aforo es
                    estricto: no se permitirán personas adicionales a las declaradas. Si asisten más personas, el local podrá
                    negar el ingreso de los adicionales o anular la reserva sin devolución del adelanto.
                  </p>
                </div>
              </>
            )}

            {activa === 'privacidad' && (
              <>
                <h2 className="h4 fw-bold mb-3">2. Políticas de Privacidad y Protección de Datos</h2>
                <p className="text-muted">
                  Cumplimos con la Ley N° 29733 de Protección de Datos Personales en el Perú. Cuidamos tu información y
                  garantizamos la confidencialidad de los datos que ingresas en nuestra web.
                </p>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• Uso de tus datos personales:</p>
                  <p className="text-muted mb-0">
                    Tu nombre, DNI y teléfono  solo se utilizan para procesar tu pedido, emitir tu comprobante y
                    llevar la comida a tu mesa. No compartimos tu información con terceros.
                  </p>
                </div>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• Cuentas de cliente:</p>
                  <p className="text-muted mb-0">
                    Las cuentas se solicitan en cualquiera de nuestros locales. Puedes pedir la actualización o eliminación de
                    tus datos escribiendo a nuestro correo de soporte.
                  </p>
                </div>
              </>
            )}

            {activa === 'faq' && (
              <>
                <h2 className="h4 fw-bold mb-3">3. Preguntas Frecuentes</h2>
                <p className="text-muted">Resolvemos las dudas más comunes de nuestros clientes.</p>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• ¿Puedo pedir sin cuenta?</p>
                  <p className="text-muted mb-0">Sí. Entra como invitado y al confirmar el pedido solo te pediremos tu nombre completo y DNI.</p>
                </div>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• ¿Cómo obtengo una cuenta?</p>
                  <p className="text-muted mb-0">Solicítala en cualquiera de nuestros locales. Con tu cuenta puedes reservar mesa.</p>
                </div>
                <div className="punto-legal">
                  <p className="small fw-bold mb-1">• ¿Cuál es el horario de atención?</p>
                  <p className="text-muted mb-0">Lunes a domingo de 12:00 pm a 11:00 pm en todas nuestras sedes.</p>
                </div>
              </>
            )}

          </section>
        </div>
      </div>
    </div>
  );
}

export default Legal;
