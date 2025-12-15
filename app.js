let aprobados = new Set(
  JSON.parse(localStorage.getItem("aprobados")) || []
);

function estaDisponible(curso) {
  return curso.requisitos.every(r => aprobados.has(r));
}

function aprobarCurso(codigo) {
  aprobados.add(codigo);
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

  cursos.sort((a,b) => a.bloque - b.bloque);

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso");

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
      ${curso.nombre}<br>
      <small>Bloque ${curso.bloque}</small>
    `;

    malla.appendChild(div);
  });
}
