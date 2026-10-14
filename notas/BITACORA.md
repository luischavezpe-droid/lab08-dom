# Bitacora de JavaScript interactivo
Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: (escribe aqui cual usaste)
## Ejercicio 2: Seleccionar y modificar el DOM

| Instrucción | ¿Qué cambió en la pantalla? | ¿Se mantiene al recargar? (Sí/No) |
| :--- | :--- | :---: |
| textContent desde la consola | Modifica el texto del elemento seleccionado en tiempo real. | No |
| textContent desde app.js | Modifica el texto del elemento cada vez que la página carga y se ejecuta el script. | Sí |
| style.color | Cambia el color del texto del elemento mediante estilos en línea. | No |
| classList.add | Agrega una clase CSS al elemento, aplicando sus estilos correspondientes. | No |
| createElement + appendChild | Crea un nuevo elemento y lo inserta en el DOM dentro del contenedor seleccionado. | No |

## Ejercicio 3: Evento click

| Tipo de evento | Qué acción lo dispara | Cuánto suma por acción |
| :--- | :--- | :---: |
| `click` | Hacer un clic simple sobre el botón | 1 |
| `dblclick` | Hacer un doble clic rápido sobre el botón | 1 |
| `mouseover` | Pasar el puntero del mouse sobre el botón | 0 |

## Ejercicio 4: Eventos input y submit

| Prueba | Qué pasó en la pantalla | ¿Se recargó la página? (Sí/No) |
| :--- | :--- | :---: |
| Escribir en el campo nombre | Los caracteres ingresados se muestran dentro del campo de texto en tiempo real. | No |
| Enviar sin `preventDefault` | El formulario realiza el envío por defecto, parpadea la pantalla y reinicia el estado. | Sí |
| Enviar con `preventDefault`, correo sin `@` | Se evita el envío automático y el navegador o script muestra un mensaje de error de validación. | No |
| Enviar con `preventDefault`, correo con `@` | Se evita la recarga de la página y se ejecuta la lógica personalizada (p. ej., mensaje de éxito). | No |

## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
| :--- | :--- | :---: | :--- | :---: |
| `laptop` | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| `mouse` | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| `teclado` | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| `monitor` | Monitor | 680 | Monitor - S/ 680.00 | 510 |

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba | Total que muestra la página | ¿Correcto? (Sí/No) |
| :--- | :--- | :---: |
| Cuaderno 12.50 | 12.50 | Sí |
| + Lapicero 3.20 | 15.70 | Sí |
| + Mochila 89.90 | 105.60 | Sí |
| Sin `Number()` | Error en consola (`.toFixed` no es una función) | No |

| Pieza | Línea(s) de tu código donde aparece | Para qué sirve |
| :--- | :--- | :--- |
| **DOM** | `document.querySelector(...)`, `document.createElement("li")`, `appendChild(...)` | Permite seleccionar, manipular y agregar elementos dinámicamente al HTML. |
| **Evento** | `formProducto.addEventListener("submit", ...)` | Escucha cuando el usuario envía el formulario y desencadena la función para procesar los datos. |
| **Objeto** | `const carrito = new Carrito();` y `const producto = new Producto(...)` | Instancia las clases para almacenar la información de las compras y gestionar sus métodos. |