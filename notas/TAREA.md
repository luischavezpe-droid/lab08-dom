# Tarea: Mi componente interactivo

## Componente elegido
He desarrollado un **Registro de Notas de Estudiantes**. Este componente interactivo permite registrar alumnos con sus respectivos cursos y calificaciones, validando en tiempo real que la nota esté en la escala de 0 a 20, pintando de color según el estado académico (Aprobado/Desaprobado), permitiendo eliminar registros y calculando el promedio general del grupo en tiempo real.

---

## Version 1: solo DOM

* **Qué se agregó:** Creación e inserción estática de un nodo inicial mediante `document.querySelector`, `document.createElement` y `appendChild`.
* **Por qué:** Para establecer la estructura base dentro del documento HTML y comprobar cómo se renderizan los elementos de lista.
* **Qué cambió en la página:** Se muestra un elemento `<li>` inicial fijado por código en el navegador al momento de cargar la página.

```javascript
// Selección de la lista HTML
const listaEstudiantes = document.querySelector("#listaEstudiantes");

// Creación e inserción del primer elemento en el DOM
const li = document.createElement("li");
li.textContent = "Ana García - Programación Web: 16.00 (Aprobado)";
listaEstudiantes.appendChild(li);
```

---

## Version 2: con eventos

* **Qué se agregó:** Captura del formulario con el evento `submit`, validación dinámica del campo nota con el evento `input` y botón de eliminación con el evento `click`.
* **Por qué:** Para dar interactividad a la aplicación, permitir al usuario ingresar nuevos estudiantes sin recargar la página, validar datos erróneos y borrar registros.
* **Qué cambió en la página:** El formulario intercepta el envío, muestra un mensaje de alerta visual en texto si la nota es inválida y genera botones "Eliminar" que remueven filas de la pantalla.

```javascript
// Selección de elementos del DOM
const formEstudiante = document.querySelector("#formEstudiante");
const inputNombre = document.querySelector("#nombre");
const inputCurso = document.querySelector("#curso");
const inputNota = document.querySelector("#nota");
const errorNota = document.querySelector("#errorNota");
const listaEstudiantes = document.querySelector("#listaEstudiantes");

// Evento 1: input (Validación en tiempo real de la nota)
inputNota.addEventListener("input", () => {
  const valor = Number(inputNota.value);
  if (inputNota.value !== "" && (valor < 0 || valor > 20)) {
    errorNota.style.display = "block";
  } else {
    errorNota.style.display = "none";
  }
});

// Evento 2: submit (Registro de estudiante y renderizado)
formEstudiante.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const valorNota = Number(inputNota.value);
  if (valorNota < 0 || valorNota > 20) {
    errorNota.style.display = "block";
    return;
  }

  const li = document.createElement("li");
  const estado = valorNota >= 11 ? "Aprobado" : "Desaprobado";

  const textoInfo = document.createElement("span");
  textoInfo.textContent = `${inputNombre.value} -${inputCurso.value}: ${valorNota.toFixed(2)} (${estado})`;

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Eliminar";
  btnBorrar.classList.add("btn-borrar");

  // Evento 3: click (Eliminación de la fila)
  btnBorrar.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(textoInfo);
  li.appendChild(btnBorrar);
  listaEstudiantes.appendChild(li);

  formEstudiante.reset();
  errorNota.style.display = "none";
});
```

---

## Version 3: con clases y objetos

* **Qué se agregó:** La clase `Estudiante` con constructor, atributos (`id`, `nombre`, `curso`, `nota`) y métodos (`obtenerEstado`, `obtenerFormatoLista`), arreglo `listaRegistro` de estado global y función para calcular el promedio general.
* **Por qué:** Para estructurar la información mediante Programación Orientada a Objetos, separando la lógica del modelo de datos de la interfaz visual.
* **Qué cambió en la página:** Cada registro es instanciado como un objeto individual, se asignan clases CSS automáticas (aprobado/desaprobado) y se calcula y actualiza el promedio general dinámicamente al agregar o eliminar estudiantes.

```javascript
// Definición de la clase Estudiante
class Estudiante {
  constructor(nombre, curso, nota) {
    this.id = Date.now();
    this.nombre = nombre;
    this.curso = curso;
    this.nota = Number(nota);
  }

  obtenerEstado() {
    return this.nota >= 11 ? "Aprobado" : "Desaprobado";
  }

  obtenerFormatoLista() {
    return `${this.nombre} -${this.curso}: ${this.nota.toFixed(2)} (${this.obtenerEstado()})`;
  }
}

// Selección de elementos del DOM
const formEstudiante = document.querySelector("#formEstudiante");
const inputNombre = document.querySelector("#nombre");
const inputCurso = document.querySelector("#curso");
const inputNota = document.querySelector("#nota");
const errorNota = document.querySelector("#errorNota");
const listaEstudiantes = document.querySelector("#listaEstudiantes");
const promedioGeneralSpan = document.querySelector("#promedioGeneral");

// Estado de la aplicación
const listaRegistro = [];

// Función para recalcular y renderizar el promedio
function actualizarPromedio() {
  if (listaRegistro.length === 0) {
    promedioGeneralSpan.textContent = "0.00";
    return;
  }
  const sumaTotal = listaRegistro.reduce((acc, est) => acc + est.nota, 0);
  const promedio = sumaTotal / listaRegistro.length;
  promedioGeneralSpan.textContent = promedio.toFixed(2);
}

// Evento 1: input (Validación visual)
inputNota.addEventListener("input", () => {
  const valor = Number(inputNota.value);
  if (inputNota.value !== "" && (valor < 0 || valor > 20)) {
    errorNota.style.display = "block";
  } else {
    errorNota.style.display = "none";
  }
});

// Evento 2: submit (Instanciación de objetos y actualización del DOM)
formEstudiante.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const valorNota = Number(inputNota.value);
  if (valorNota < 0 || valorNota > 20) {
    errorNota.style.display = "block";
    return;
  }

  // Instanciación del objeto
  const nuevoEstudiante = new Estudiante(inputNombre.value, inputCurso.value, valorNota);
  listaRegistro.push(nuevoEstudiante);

  // Manipulación del DOM
  const li = document.createElement("li");
  li.classList.add(nuevoEstudiante.obtenerEstado().toLowerCase());

  const infoText = document.createElement("span");
  infoText.textContent = nuevoEstudiante.obtenerFormatoLista();

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Eliminar";
  btnBorrar.classList.add("btn-borrar");

  // Evento 3: click (Eliminar de la lista de objetos y del DOM)
  btnBorrar.addEventListener("click", () => {
    const index = listaRegistro.findIndex((e) => e.id === nuevoEstudiante.id);
    if (index !== -1) {
      listaRegistro.splice(index, 1);
    }
    li.remove();
    actualizarPromedio();
  });

  li.appendChild(infoText);
  li.appendChild(btnBorrar);
  listaEstudiantes.appendChild(li);

  actualizarPromedio();
  formEstudiante.reset();
  errorNota.style.display = "none";
});
```

---

## Donde uso DOM, eventos y objetos

| Pieza | Parte del código final donde aparece | Para qué sirve |
| :--- | :--- | :--- |
| **DOM** | `document.querySelector`, `createElement`, `appendChild`, `li.remove()` | Selecciona elementos del HTML, crea nuevos nodos dinámicamente y elimina etiquetas al interactuar. |
| **Eventos** | `addEventListener("submit")`, `addEventListener("input")`, `addEventListener("click")` | Escucha cuando el usuario envía el formulario, escribe la nota o presiona el botón de eliminar. |
| **Objetos** | `class Estudiante`, `new Estudiante(...)`, `obtenerEstado()`, `obtenerFormatoLista()` | Modela la entidad del alumno, encapsula la nota como tipo numérico y calcula si aprueba o desaprueba. |

---

## Pruebas realizadas

| Acción | Resultado esperado | Resultado obtenido | ¿Cumple? (Sí/No) |
| :--- | :--- | :--- | :---: |
| Escribir nota `25` en el campo nota | Muestra el mensaje de error visual "⚠️ La nota debe estar en el rango de 0 a 20." | Aparece la alerta roja debajo del input en tiempo real | Sí |
| Registrar a "Carlos" con nota `16` | Agrega el estudiante con borde verde ("Aprobado") y calcula el promedio a `16.00` | Se agrega a la lista con borde verde y el promedio cambia a 16.00 | Sí |
| Registrar a "Lucía" con nota `08` | Agrega a la estudiante con borde rojo ("Desaprobado") y actualiza promedio a `12.00` | Se crea la fila con borde rojo y el promedio actualiza a 12.00 | Sí |
| Hacer clic en "Eliminar" en el registro de Lucía | Elimina el nodo `<li>` del DOM, borra el objeto del arreglo y recalcula promedio a `16.00` | El registro desaparece de la interfaz y el promedio vuelve a 16.00 | Sí |
| Intentar enviar formulario con nota `-5` | Bloquea el envío, mantiene la alerta y evita instanciar objetos | El formulario no se envía, no crea filas y mantiene el mensaje visible | Sí |

---

## Por que disene asi mi clase

Diseñé la clase `Estudiante` con los atributos `id`, `nombre`, `curso` y `nota` para representar la información básica e imprescindible de cada alumno en el sistema. Incluí un id generado con timestamp para garantizar un identificador único al momento de buscar y eliminar elementos del arreglo general. Elegí los métodos `obtenerEstado()` y `obtenerFormatoLista()` para encapsular la regla de negocio académica (determinar si aprueba o no según si su nota es mayor o igual a 11) y estandarizar la salida en texto sin contaminar la lógica del formulario. Esto permite mantener los datos desacoplados de la manipulación visual de la interfaz.