// Clase que representa a un Estudiante
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
    return `${this.nombre} - ${this.curso}: ${this.nota.toFixed(2)} (${this.obtenerEstado()})`;
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

// Arreglo para almacenar los objetos
const listaRegistro = [];

// Función para actualizar el promedio general en el DOM
function actualizarPromedio() {
  if (listaRegistro.length === 0) {
    promedioGeneralSpan.textContent = "0.00";
    return;
  }
  const sumaTotal = listaRegistro.reduce((acc, est) => acc + est.nota, 0);
  const promedio = sumaTotal / listaRegistro.length;
  promedioGeneralSpan.textContent = promedio.toFixed(2);
}

// Evento 1: input (Validación en tiempo real del campo Nota)
inputNota.addEventListener("input", () => {
  const valor = Number(inputNota.value);
  if (inputNota.value !== "" && (valor < 0 || valor > 20)) {
    errorNota.style.display = "block";
  } else {
    errorNota.style.display = "none";
  }
});

// Evento 2: submit (Registro de estudiante)
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

  // Manipulación del DOM (createElement)
  const li = document.createElement("li");
  li.dataset.id = nuevoEstudiante.id;
  li.classList.add(nuevoEstudiante.obtenerEstado().toLowerCase());

  const infoText = document.createElement("span");
  infoText.textContent = nuevoEstudiante.obtenerFormatoLista();

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Eliminar";
  btnBorrar.classList.add("btn-borrar");

  // Evento 3: click (Eliminación de elemento)
  btnBorrar.addEventListener("click", () => {
    // Eliminar del arreglo de datos
    const index = listaRegistro.findIndex((e) => e.id === nuevoEstudiante.id);
    if (index !== -1) {
      listaRegistro.splice(index, 1);
    }
    // Eliminar del DOM
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

