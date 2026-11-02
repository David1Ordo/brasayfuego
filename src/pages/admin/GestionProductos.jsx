import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Imagen from '../../components/Imagen';
import { categorias, productos } from '../../data/productos';
import { soles } from '../../utils/formato';

const agotados = ['chicha'];
const POR_PAGINA = 10;

const nombreCategoria = (id) => categorias.find((c) => c.id === id).nombre;

function GestionProductos() {
  const avisar = useOutletContext();
  const [pagina, setPagina] = useState(1);
  const [formulario, setFormulario] = useState(null);

  const esNuevo = formulario === 'nuevo';
  const datos = formulario && !esNuevo ? formulario : {};
  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);
  const desde = (pagina - 1) * POR_PAGINA;
  const visibles = productos.slice(desde, desde + POR_PAGINA);

  const guardar = (e) => {
    e.preventDefault();
    avisar(esNuevo ? 'Producto registrado.' : 'Cambios guardados.');
    setFormulario(null);
  };

  const eliminar = (producto) => {
    if (window.confirm(`¿Eliminar "${producto.nombre}" de la carta?`)) avisar('Producto eliminado.');
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h1 className="h3 fw-bold mb-1">Catálogo de Productos</h1>
          <p className="text-muted small mb-0">Administración centralizada de precios, categorías e inventario en tiempo real.</p>
        </div>
        <button type="button" className="btn btn-brand fw-semibold px-4" onClick={() => setFormulario('nuevo')}>+ Nuevo Producto</button>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="Buscar producto por nombre o código..." />
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select fw-semibold" aria-label="Categoría">
            <option>Categoría: Todos</option>
            {categorias.map((c) => <option key={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select fw-semibold" aria-label="Estado">
            <option>Estado: Todos</option>
            <option>Disponible</option>
            <option>Agotado</option>
          </select>
        </div>
      </div>

      <div className="card-brasa table-responsive">
        <table className="table tabla-panel align-middle mb-0">
          <thead>
            <tr>
              <th>Img</th>
              <th>Nombre del Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((p) => (
              <tr key={p.id}>
                <td><Imagen archivo={p.imagen} alt={p.nombre} style={{ width: 48, height: 48 }} /></td>
                <td className="fw-bold">{p.nombre}</td>
                <td className="text-muted">{nombreCategoria(p.categoria)}</td>
                <td className="fw-bold text-nowrap">{soles(p.precio)}</td>
                <td>
                  {agotados.includes(p.id)
                    ? <span className="badge rounded-pill badge-gris px-3 py-2">Agotado</span>
                    : <span className="badge rounded-pill badge-abierto px-3 py-2">Disponible</span>}
                </td>
                <td className="text-nowrap">
                  <button type="button" className="btn btn-sm btn-light border fw-semibold me-2" onClick={() => setFormulario(p)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-eliminar fw-semibold" onClick={() => eliminar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4">
        <span className="small text-muted fw-semibold">
          Mostrando {desde + 1} - {desde + visibles.length} de {productos.length} productos registrados
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
          <Modal.Title className="h5 fw-bold">{esNuevo ? 'Nuevo Producto' : 'Editar Producto'}</Modal.Title>
        </Modal.Header>
        <form className="form-brasa" onSubmit={guardar}>
          <Modal.Body>
            <div className="d-flex align-items-center gap-3 mb-3">
              {esNuevo
                ? <div className="img-placeholder" style={{ width: 96, height: 96 }}>Sin imagen</div>
                : <Imagen archivo={datos.imagen} alt={datos.nombre} style={{ width: 96, height: 96 }} />}
              <div className="flex-grow-1">
                <label htmlFor="pro-imagen" className="form-label">Imagen (.png o .jpg)</label>
                <input id="pro-imagen" type="file" accept=".png,.jpg" className="form-control form-control-sm" required={esNuevo} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pro-nombre" className="form-label">Nombre del producto</label>
              <input id="pro-nombre" className="form-control" defaultValue={datos.nombre} required />
            </div>
            <div className="mb-3">
              <label htmlFor="pro-descripcion" className="form-label">Descripción</label>
              <textarea id="pro-descripcion" rows={2} className="form-control" defaultValue={datos.descripcion} required />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="pro-categoria" className="form-label">Categoría</label>
                <select id="pro-categoria" className="form-select" defaultValue={datos.categoria}>
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="pro-estado" className="form-label">Estado</label>
                <select id="pro-estado" className="form-select" defaultValue={agotados.includes(datos.id) ? 'Agotado' : 'Disponible'}>
                  <option>Disponible</option>
                  <option>Agotado</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="pro-precio" className="form-label">Precio (S/)</label>
                <input id="pro-precio" type="number" min="0" step="0.10" className="form-control" defaultValue={datos.precio} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="pro-anterior" className="form-label">Precio anterior (opcional)</label>
                <input id="pro-anterior" type="number" min="0" step="0.10" className="form-control" defaultValue={datos.precioAnterior} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-light border" onClick={() => setFormulario(null)}>Cancelar</button>
            <button type="submit" className="btn btn-brand">{esNuevo ? 'Registrar producto' : 'Guardar cambios'}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default GestionProductos;
