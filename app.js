let aprobados = new Set(
  JSON.parse(localStorage.getItem("aprobados")) || []
);

function estaDisponible(curso) {
  const reqOk = curso.requisitos.every(r => aprobados.has(r));
  const coReqOk = cumpleCorrequisitos(curso);
  return reqOk && coReqOk;
}

function aprobarCurso(codigo) {
  const curso = cursos.find(c => c.codigo === codigo);

  aprobados.add(codigo);

  // aprobar correquisitos automáticamente
  curso.correquisitos.forEach(c => aprobados.add(c));

  localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
  render();
}


function reiniciar() {
  localStorage.removeItem("aprobados");
  aprobados.clear();
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

    cursos
      .filter(c => c.bloque === numBloque)
      .forEach(curso => {
        const div = document.createElement("div");
        div.classList.add("curso");
        
        if (curso.correquisitos.length > 0) {
          div.classList.add("coodependiente");
        }


        if (aprobados.has(curso.codigo)) {
          div.classList.add("aprobado");
        } else if (estaDisponible(curso)) {
          div.classList.add("disponible");
          div.onclick = () => aprobarCurso(curso.codigo);
        } else {
          div.classList.add("bloqueado");
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
