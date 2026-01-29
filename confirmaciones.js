const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0FIBsssQ3WPH8FjhHD05f7tek_0C7F-RYrPqE4lP26XbiUvlbK7S455So61ZA2-a2vHeU7Dkf63hF/pub?output=csv";

fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const filas = text
      .trim()
      .split("\n")
      .slice(1);

    const lista = document.querySelector(".panel-lista");
    lista.innerHTML = "";

    filas.forEach(fila => {
      if (!fila) return;

      // 👉 parseo CSV que respeta comas, saltos y comillas
      const columnas = fila.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
        ?.map(c => c.replace(/^"|"$/g, "")) || [];

      const estado = columnas[1] || "";
      const cantidad = columnas[2] || "";
      const invitados = columnas[3] || "";
      const mensaje = columnas[4] || "";

      const div = document.createElement("div");
      div.className = "fila-confirmacion";

      div.innerHTML = `
        <div class="fila-header">
          <span class="estado ${estado.includes("Confirmo") ? "confirmo" : "no"}">
            ${estado}
          </span>
          <span class="cantidad">${cantidad} personas</span>
        </div>

        <div class="detalle">
  ${
    invitados
      .split("\n")
      .map(linea =>
        linea
          .replace(/^Invitado \d+:\s*/i, "")
          .trim()
      )
      .filter(Boolean)
      .map(persona => `• ${persona}`)
      .join("<br>")
  }
</div>


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



