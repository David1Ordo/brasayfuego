export function leer(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado === null ? valorPorDefecto : JSON.parse(guardado);
  } catch {
    return valorPorDefecto;
  }
}

export function guardar(clave, valor) {
  try {
    if (valor === null || valor === undefined) localStorage.removeItem(clave);
    else localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
  }
}
