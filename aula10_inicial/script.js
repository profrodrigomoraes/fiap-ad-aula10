// ---------- Elementos da página ----------
const grid = document.querySelector(".grid-series");
const campoBusca = document.querySelector(".busca");
const contador = document.querySelector(".contador");

// ---------- Renderizando o grid ----------
function renderizarSeries(lista) {
  grid.innerHTML = "";

  lista.forEach((serie) => {
    grid.innerHTML += `
      <div class="serie">
        <img src="${serie.poster}" alt="${serie.titulo}">
        <div class="info">
          <h2>${serie.titulo}</h2>
          <p>${serie.genero} · ${serie.ano} · ⭐ ${serie.nota}</p>
        </div>
      </div>
    `;
  });

  contador.textContent = `${lista.length} de ${series.length} séries`;
}

// ---------- Filtrando pelo texto da busca ----------
function aplicarFiltros() {
  const termo = campoBusca.value.toLowerCase();

  const filtradas = series.filter((serie) => {
    return serie.titulo.toLowerCase().includes(termo);
  });

  renderizarSeries(filtradas);
}

// ---------- Início ----------
renderizarSeries(series);
