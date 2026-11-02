export const categorias = [
  { id: 'promos', nombre: 'Promos Destacadas', nombreCorto: 'Promociones', icono: '🔥', titulo: 'Promociones Destacadas', imagen: 'categoria_promos' },
  { id: 'pollos', nombre: 'Pollos a la Brasa', nombreCorto: 'Pollos a la brasa', titulo: 'Pollos a la Brasa Tradicionales', imagen: 'categoria_pollos' },
  { id: 'chaufa', nombre: 'Mostritos & Chaufa', nombreCorto: 'Chaufa', titulo: 'Mostritos & Chaufa', imagen: 'categoria_chaufa' },
  { id: 'entradas', nombre: 'Piqueos & Entradas', nombreCorto: 'Entradas', titulo: 'Entradas & Complementos', imagen: 'categoria_entradas' },
  { id: 'bebidas', nombre: 'Bebidas & Chicha', nombreCorto: 'Bebidas', titulo: 'Bebidas & Chicha', imagen: 'categoria_bebidas' },
  { id: 'postres', nombre: 'Postres', nombreCorto: 'Postres', titulo: 'Postres', imagen: 'categoria_postres' },
];

export const promocionDestacada = {
  id: 'combo-banquete-fuego',
  categoria: 'promos',
  nombre: 'Combo Banquete Fuego Familiar',
  descripcion: '1 Pollo Entero + Papas Familiares + Ensalada + Chicha 1.5L + 6 Tequeños de regalo',
  precio: 72.9,
  precioAnterior: 89.9,
  descuento: 20,
  etiqueta: 'OFERTA DEL DÍA',
  imagen: 'combo_banquete_familiar',
};

export const promociones = [
  {
    id: 'duo-brasa',
    categoria: 'promos',
    nombre: 'Dúo Brasa Personal (2 Pers.)',
    descripcion: '1/2 Pollo a la brasa + Papas + Ensalada + 2 Chichas de 500ml',
    nota: '¡Ahorras S/ 7.00 en esta promo!',
    precio: 42.9,
    precioAnterior: 49.9,
    descuento: 15,
    imagen: 'duo_brasa_personal',
  },
  {
    id: 'mega-banquete',
    categoria: 'promos',
    nombre: 'Mega Banquete 1 y 1/2 Pollo',
    descripcion: '1 Pollo y Medio + Papas Gigantes + Ensalada + Chicha 2L',
    nota: 'Ideal para 5 a 6 personas',
    precio: 94.9,
    precioAnterior: 112.0,
    descuento: 18,
    imagen: 'mega_banquete',
  },
  {
    id: 'duo-mostrito',
    categoria: 'promos',
    nombre: 'Dúo Mostrito Callejero (2×1)',
    descripcion: '2 Mostritos con arroz chaufa + 1/4 pollo c/u + 2 Chichas',
    nota: 'Sabor criollo ahumado insuperable',
    precio: 46.9,
    precioAnterior: 54.9,
    descuento: 15,
    imagen: 'duo_mostrito',
  },
  {
    id: 'super-salchi',
    categoria: 'promos',
    nombre: 'Súper Salchi Combo + Tequeños',
    descripcion: 'Salchipapa Especial con trozos de pollo + 4 Tequeños + 2 Gaseosas',
    nota: 'Perfecto para piqueo rápido',
    precio: 24.9,
    precioAnterior: 31.9,
    descuento: 22,
    imagen: 'super_salchi_combo',
  },
];

const platos = [
  { id: 'pollo-entero', categoria: 'pollos', nombre: '1 Pollo Entero + Papas', descripcion: 'Con papas familiares y ensalada grande', precio: 68.9, imagen: 'pollo_entero' },
  { id: 'medio-pollo', categoria: 'pollos', nombre: '1/2 Pollo + Papas', descripcion: 'Papas medianas, ensalada y cremas de la casa', precio: 38.9, imagen: 'medio_pollo' },
  { id: 'cuarto-pollo', categoria: 'pollos', nombre: '1/4 de Pollo Personal', descripcion: 'Pieza a elección + papas y ensalada', precio: 22.9, imagen: 'cuarto_pollo' },
  { id: 'octavo-pollo', categoria: 'pollos', nombre: '1/8 de Pollo Junior', descripcion: 'Porción ideal para niños con papas', precio: 14.9, imagen: 'octavo_pollo' },
  { id: 'mostrito', categoria: 'chaufa', nombre: 'Mostrito Clásico', descripcion: '1/4 de pollo + arroz chaufa + papas fritas', precio: 24.9, imagen: 'mostrito' },
  { id: 'chaufa-pollo', categoria: 'chaufa', nombre: 'Chaufa de Pollo a la Brasa', descripcion: 'Arroz chaufa al wok con trozos de pollo a la brasa', precio: 21.9, imagen: 'chaufa_pollo' },
  { id: 'salchipapa', categoria: 'entradas', nombre: 'Salchipapa Especial', descripcion: 'Frankfurter, papas nativas y trozos brasa', precio: 18.9, imagen: 'salchipapa' },
  { id: 'tequenos', categoria: 'entradas', nombre: 'Tequeños Brasa (8 u)', descripcion: 'Queso y pollo jugoso con guacamole', precio: 15.9, imagen: 'tequenos' },
  { id: 'chicha', categoria: 'bebidas', nombre: 'Chicha Morada 1L', descripcion: 'Hecha en casa con maíz morado y piña', precio: 12.9, imagen: 'chicha_morada' },
  { id: 'gaseosa', categoria: 'bebidas', nombre: 'Gaseosa 1.5L', descripcion: 'Bien helada, sabor a elección', precio: 9.9, imagen: 'gaseosa' },
  { id: 'torta-chocolate', categoria: 'postres', nombre: 'Flan', descripcion: 'Porción húmeda casera', precio: 5.5, imagen: 'categoria_postres' },
  { id: 'clasico', categoria: 'postres', nombre: 'Clásico Mazamorra & Arroz con Leche', descripcion: 'El dúo criollo de siempre', precio: 7.9, imagen: 'mazamorra_arroz_leche' },
];

export const productos = [promocionDestacada, ...promociones, ...platos];

export const productosPorCategoria = (categoriaId) =>
  productos.filter((producto) => producto.categoria === categoriaId);
