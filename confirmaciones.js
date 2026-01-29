const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0FIBsssQ3WPH8FjhHD05f7tek_0C7F-RYrPqE4lP26XbiUvlbK7S455So61ZA2-a2vHeU7Dkf63hF/pub?output=csv";

fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const filas = text.split("\n").slice(1); // quitamos encabezado
    const lista = document.querySelector(".panel-lista");

    lista.innerHTML = ""; // limpiamos contenido de prueba

    filas.forEach(fila => {
      if (!fila.trim()) return;

      const columnas = fila.split(",");

      const estado = columnas[1];       // ¿Vas a asistir?
      const cantidad = columnas[2];     // Cantidad de personas
      const invitados = columnas[3];    // Datos invitados
      const mensaje = columnas[4];      // Mensaje

      const div = document.createElement("div");
      div.className = "fila-confirmacion";

      div.innerHTML = `
        <div class="fila-header">
          <span class="estado ${estado.includes("Confirmo") ? "confirmo" : "no"}">
            ${estado}
          </span>
          <span class="cantidad">${cantidad} personas</span>
        </div>

        <div class="nombre">Confirmación</div>

        <div class="detalle">${invitados || ""}</div>

        ${
          mensaje
            ? `<div class="mensaje">
                <strong>Mensaje</strong>
                ${mensaje}
              </div>`
            : ""
        }
      `;

      lista.appendChild(div);
    });
  });
