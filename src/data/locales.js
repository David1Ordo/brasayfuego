// Sedes. La imagen del mapa
export const locales = [
  { id: 'miraflores', nombre: 'Sede Miraflores - Larco', direccion: 'Av. José Larco 850, Miraflores', telefono: '(01) 480-0777', anexo: 'Anexo 1' },
  { id: 'surco', nombre: 'Sede Surco - Chacarilla', direccion: 'Av. Caminos del Inca 1240, Surco', telefono: '(01) 480-0777', anexo: 'Anexo 2' },
  { id: 'olivos', nombre: 'Sede Los Olivos - Mayolo', direccion: 'Av. Antúnez de Mayolo 1020, Los Olivos', telefono: '(01) 480-0777', anexo: 'Anexo 3' },
];

export const buscarLocal = (id) => locales.find((local) => local.id === id);
