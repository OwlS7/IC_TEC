let estados = JSON.parse(localStorage.getItem("estados")) || {};
const ESTADOS = {
  BLOQUEADO: "bloqueado",
  PENDIENTE: "pendiente",
  EN_CURSO: "en_curso",
  APROBADO: "aprobado"
};
function requisitosAprobados(curso) {
  return curso.requisitos.every(r => estados[r] === ESTADOS.APROBADO);
}

function estaDesbloqueado(curso) {
  return requisitosAprobados(curso);
}


function estaDisponible(curso) {
  const reqOk = curso.requisitos.every(r => aprobados.has(r));
  const coReqOk = cumpleCorrequisitos(curso);
  return reqOk && coReqOk;
}

function cambiarEstado(codigo, nuevoEstado) {
  estados[codigo] = nuevoEstado;

  const curso = cursos.find(c => c.codigo === codigo);

  if (nuevoEstado === ESTADOS.APROBADO) {
    curso.correquisitos.forEach(c => {
      estados[c] = ESTADOS.APROBADO;
    });
  }

  localStorage.setItem("estados", JSON.stringify(estados));
  render();
}


function reiniciar() {
  localStorage.removeItem("estados");
  estados = {};
  render();
}

function render() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const bloques = [...new Set(cursos.map(c => c.bloque))].sort((a,b) => a - b);

  bloques.forEach(numBloque => {
    const bloqueDiv = document.createElement("div");
    bloqueDiv.classList.add("bloque");

    const titulo = document.createElement("h2");
    titulo.textContent = `Bloque ${numBloque}`;
    bloqueDiv.appendChild(titulo);

    const cursosDiv = document.createElement("div");
    cursosDiv.classList.add("cursos-bloque");
    div.dataset.codigo = curso.codigo;

    cursos.filter(c => c.bloque === numBloque).forEach(curso => {
      const div = document.createElement("div");
      div.classList.add("curso");

      // coodependiente
      if (curso.correquisitos.length > 0) {
        div.classList.add("coodependiente");
      
        const coText = document.createElement("div");
        coText.classList.add("correquisitos-texto");
        coText.innerHTML = `🔗 Correquisito con: <strong>${curso.correquisitos.join(", ")}</strong>`;
        div.appendChild(coText);
      
        div.onmouseenter = () => resaltarCorrequisitos(curso.codigo, true);
        div.onmouseleave = () => resaltarCorrequisitos(curso.codigo, false);
      }

      let estadoActual = estados[curso.codigo];

      if (!estaDesbloqueado(curso)) {
        estadoActual = ESTADOS.BLOQUEADO;
      }

      if (!estadoActual && estaDesbloqueado(curso)) {
        estadoActual = ESTADOS.PENDIENTE;
      }

      div.classList.add(estadoActual);
      
      if (estadoActual !== ESTADOS.BLOQUEADO) {
        div.onclick = () => alternarEstado(curso.codigo);
      }

      div.innerHTML = `
        <strong>${curso.codigo}</strong><br>
        ${curso.nombre}
        <div class="creditos">🎓 Créditos: ${curso.creditos}</div>
      `;

      cursosDiv.appendChild(div);
    });

    bloqueDiv.appendChild(cursosDiv);
    malla.appendChild(bloqueDiv);
  });
}

function cumpleCorrequisitos(curso) {
  return curso.correquisitos.every(c => 
    aprobados.has(c) || estaDisponible(cursos.find(x => x.codigo === c))
  );
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

