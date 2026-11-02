import React, { createContext, useContext, useEffect, useState } from 'react';
import { usuariosDemo } from '../data/usuarios';
import { leer, guardar } from '../utils/almacenamiento';

const CLAVE_SESION = 'bf_sesion';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer(CLAVE_SESION, null));

  useEffect(() => {
    guardar(CLAVE_SESION, usuario);
  }, [usuario]);

  const login = (identificador, password) => {
    const id = identificador.trim().toLowerCase();
    const encontrado = usuariosDemo.find(
      (u) => (u.usuario === id || u.email === id) && u.password === password
    );
    if (!encontrado) return { ok: false, error: 'Usuario o contraseña incorrectos.' };

    const { password: _, ...datos } = encontrado;
    setUsuario(datos);
    return { ok: true, usuario: datos };
  };

  const entrarComoInvitado = () => {
    const invitado = { nombre: 'Invitado', rol: 'invitado' };
    setUsuario(invitado);
    return invitado;
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, entrarComoInvitado, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
