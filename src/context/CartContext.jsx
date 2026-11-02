import React, { createContext, useContext, useEffect, useState } from 'react';
import { leer, guardar } from '../utils/almacenamiento';

const CLAVE_CARRITO = 'bf_carrito';
const CLAVE_SEDE = 'bf_sede';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => leer(CLAVE_CARRITO, []));
  const [sede, setSede] = useState(() => leer(CLAVE_SEDE, 'olivos'));
  const [abierto, setAbierto] = useState(false);
  const [aviso, setAviso] = useState(null);

  useEffect(() => guardar(CLAVE_CARRITO, items), [items]);
  useEffect(() => guardar(CLAVE_SEDE, sede), [sede]);

  const agregar = (producto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
    });
    setAviso({ nombre: producto.nombre, clave: Date.now() });
  };

  const cambiarCantidad = (id, delta) =>
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );

  const quitar = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const vaciar = () => setItems([]);

  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const cantidad = items.reduce((suma, item) => suma + item.cantidad, 0);

  const valor = {
    items, total, cantidad, agregar, cambiarCantidad, quitar, vaciar,
    sede, setSede,
    abierto, abrir: () => setAbierto(true), cerrar: () => setAbierto(false),
    aviso, limpiarAviso: () => setAviso(null),
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
