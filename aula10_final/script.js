// ---------- Elementos da página ----------
const grid = document.querySelector(".grid-series");
const campoBusca = document.querySelector(".busca");
const contador = document.querySelector(".contador");

// AULA 10 — endereço base da API e lista de séries preenchida pelo fetch
const API_URL = "https://api.tvmaze.com";
let series = [];

// ---------- Renderizando o grid ----------
// AULA 10 — agora usamos os campos da API direto: name, image.medium, genres, premiered, rating.average
// "||" usa o valor da direita quando o da esquerda é vazio ou null
function renderizarSeries(lista) {
  grid.innerHTML = "";

  lista.forEach((serie) => {
    grid.innerHTML += `
      <div class="serie">
        <img src="${serie.image.medium}" alt="${serie.name}">
        <div class="info">
          <h2>${serie.name}</h2>
          <p>${serie.genres[0] || "Sem gênero"} · ${(serie.premiered || "-").slice(0, 4)} · ⭐ ${serie.rating.average || "-"}</p>
        </div>
      </div>
    `;
  });

  contador.textContent = `${lista.length} séries`;
}

// AULA 10 — endpoint /shows?page=0: lista das primeiras séries da API
async function carregarSeriesIniciais() {
  contador.textContent = "Carregando...";

  try {
    const resposta = await fetch(API_URL + "/shows?page=0");
    const dados = await resposta.json();

    // ignora as séries sem imagem de pôster
    series = dados.filter((show) => show.image);
    renderizarSeries(series);
  } catch (erro) {
    contador.textContent = "Não foi possível carregar as séries.";
  }
}

// AULA 10 — endpoint /search/shows?q=texto: parâmetro de query com o texto da busca
async function buscarSeries(event) {
  event.preventDefault();

  const termo = campoBusca.value.trim();

  if (termo === "") {
    carregarSeriesIniciais();
    return;
  }

  contador.textContent = "Buscando...";

  try {
    const resposta = await fetch(API_URL + "/search/shows?q=" + termo);
    const resultados = await resposta.json();

    series = [];

    // cada resultado vem no formato { score, show }
    resultados.forEach((resultado) => {
      if (resultado.show.image) {
        series.push(resultado.show);
      }
    });

    renderizarSeries(series);
  } catch (erro) {
    contador.textContent = "Não foi possível buscar as séries.";
  }
}

// ---------- Início ----------
carregarSeriesIniciais();
