/***********************
 * ESTADOS
 ***********************/
let estados = JSON.parse(localStorage.getItem("estados")) || {};

const ESTADOS = {
  BLOQUEADO: "bloqueado",
  PENDIENTE: "pendiente",
  EN_CURSO: "en_curso",
  APROBADO: "aprobado"
};

/***********************
 * LOGICA DE REQUISITOS
 ***********************/
function requisitosAprobados(curso) {
  return curso.requisitos.every(r => estados[r] === ESTADOS.APROBADO);
}

function estaDesbloqueado(curso) {
  return requisitosAprobados(curso);
}

/***********************
 * RENDER
 ***********************/
function render() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const bloques = [...new Set(cursos.map(c => c.bloque))].sort((a, b) => a - b);

  bloques.forEach(numBloque => {
    const bloqueDiv = document.createElement("div");
    bloqueDiv.classList.add("bloque");

    const titulo = document.createElement("h2");
    titulo.textContent = `Bloque ${numBloque}`;
    bloqueDiv.appendChild(titulo);

    const cursosDiv = document.createElement("div");
    cursosDiv.classList.add("cursos-bloque");

    cursos
      .filter(c => c.bloque === numBloque)
      .forEach(curso => {
        const div = document.createElement("div");
        div.classList.add("curso");
        div.dataset.codigo = curso.codigo;

        /* Estado */
        let estadoActual = estados[curso.codigo];

        if (!estaDesbloqueado(curso)) {
          estadoActual = ESTADOS.BLOQUEADO;
        } else if (!estadoActual) {
          estadoActual = ESTADOS.PENDIENTE;
        }

        div.classList.add(estadoActual);

        if (estadoActual !== ESTADOS.BLOQUEADO) {
          div.onclick = () => alternarEstado(curso.codigo);
        }

        /* Contenido */
        div.innerHTML = `
          <strong>${curso.codigo}</strong><br>
          ${curso.nombre}
          <div class="creditos">🎓 Créditos: ${curso.creditos}</div>
        `;

        /* Correquisitos (visual) */
        if (curso.correquisitos.length > 0) {
          div.classList.add("coodependiente");

          const coText = document.createElement("div");
          coText.classList.add("correquisitos-texto");
          coText.innerHTML = `🔗 Correquisito con: <strong>${curso.correquisitos.join(", ")}</strong>`;
          div.appendChild(coText);

          div.onmouseenter = () => resaltarCorrequisitos(curso.codigo, true);
          div.onmouseleave = () => resaltarCorrequisitos(curso.codigo, false);
        }

        cursosDiv.appendChild(div);
      });

    bloqueDiv.appendChild(cursosDiv);
    malla.appendChild(bloqueDiv);
  });
}

/***********************
 * INTERACCIONES
 ***********************/
function alternarEstado(codigo) {
  const actual = estados[codigo] || ESTADOS.PENDIENTE;

  let siguiente;
  switch (actual) {
    case ESTADOS.PENDIENTE:
      siguiente = ESTADOS.EN_CURSO;
      break;
    case ESTADOS.EN_CURSO:
      siguiente = ESTADOS.APROBADO;
      break;
    case ESTADOS.APROBADO:
      siguiente = ESTADOS.PENDIENTE;
      break;
    default:
      siguiente = ESTADOS.PENDIENTE;
  }

  estados[codigo] = siguiente;
  localStorage.setItem("estados", JSON.stringify(estados));
  render();
}

function resaltarCorrequisitos(codigo, activar) {
  const curso = cursos.find(c => c.codigo === codigo);
  if (!curso) return;

  curso.correquisitos.forEach(cod => {
    const elem = document.querySelector(`[data-codigo="${cod}"]`);
    if (elem) {
      elem.style.outline = activar ? "3px solid #00bfff" : "none";
    }
  });
}

/***********************
 * RESET
 ***********************/
function reiniciar() {
  localStorage.removeItem("estados");
  estados = {};
  render();
}

/***********************
 * INIT
 ***********************/
render();
