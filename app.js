function render() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const bloques = [...new Set(cursos.map(c => c.bloque))].sort((a,b) => a - b);

  bloques.forEach(numBloque => {
    const bloqueDiv = document.createElement("div");
    bloqueDiv.classList.add("bloque");

    const titulo = document.createElement("h2");
    titulo.textContent = `📦 Bloque ${numBloque}`;
    bloqueDiv.appendChild(titulo);

    const cursosDiv = document.createElement("div");
    cursosDiv.classList.add("cursos-bloque");

    cursos
      .filter(c => c.bloque === numBloque)
      .forEach(curso => {
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
          ${curso.nombre}
          <div class="creditos">🎓 Créditos: ${curso.creditos}</div>
        `;

        cursosDiv.appendChild(div);
      });

    bloqueDiv.appendChild(cursosDiv);
    malla.appendChild(bloqueDiv);
  });
}
