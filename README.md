
# Brasa & Fuego

Página web de una pollería: carta, promociones, locales, reservas de mesa, libro de reclamaciones y un panel de administración.

Es una versión representativa: no usa base de datos, la información está dentro del proyecto. La sesión y el carrito se guardan en el navegador.

Está hecha con **React**, **React Router** y **Bootstrap**.

## Requisitos

- Un editor de código, por ejemplo Visual Studio Code.
- Descargar e instalar la versión LTS más reciente de Node.js: https://nodejs.org/

## Instalación

1. Descargar el proyecto desde GitHub y extraerlo en la computadora.
2. Abrir el CMD (símbolo del sistema).
3. Dirigirse a la carpeta principal del proyecto utilizando el comando `cd`:

```bash
cd "ruta de la carpeta del proyecto"
```

4. Una vez dentro de la carpeta donde se encuentra el archivo `package.json`, ejecutar el siguiente comando para instalar las dependencias:

```bash
npm install
```

## Ejecutar la aplicación

Después de instalar las dependencias, ejecutar:

```bash
npm start
```

Se abrirá la página en http://localhost:3000. Al guardar cambios en el código, la página se actualiza sola.

Para detenerla, pulsa `Ctrl + C` en la terminal.

## Probar la aplicación

Con la página abierta, puedes iniciar sesión con estas cuentas de prueba (también aparecen en la pantalla de Login):

| Tipo de usuario | Permisos |
|---|---|
| Cliente | Pedir y reservar mesa |
| Administrador | Todo, incluido el panel completo |
| Recepcionista | Panel: solo Reservas y Mesas |

También puedes entrar **como invitado**: puede hacer pedidos (con nombre y DNI), pero no reservar.

Algunas cosas extra:

- Agregar productos al carrito desde la **Carta** y confirmar el pedido.
- Reservar una mesa en **Reservas** (solo con cuentas registradas).
- Entrar al **panel** (`/admin`) con la cuenta de administrador o recepcionista. Si se intenta entrar con otra cuenta, envía al Login.

Las acciones del panel (editar, eliminar, reservar, etc.) son de demostración: muestran un mensaje, pero no guardan cambios.

## Estructura básica

```text
public/
  img/                 Imágenes
  iconos/              Iconos

src/
  components/          Piezas reutilizables (Navbar, Footer, carrito...)
  context/             Sesión de usuario y carrito
  data/                Productos, locales y usuarios de prueba
  pages/               Páginas de la web
  pages/admin/         Panel de administración
```
