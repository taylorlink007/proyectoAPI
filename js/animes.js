const apiBaseUrl = "https://api.jikan.moe/v4/seasons/2017/winter?sfw";

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  fetchAnime(query);
});

async function fetchAnime(query) {
  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();

    // Convertir el título a minúsculas y comparar
    const filteredAnime = data.data.filter(
      (anime) =>
        anime.title.toLowerCase().includes(query) ||
        (anime.title_english &&
          anime.title_english.toLowerCase().includes(query)) ||
        (anime.title_japanese &&
          anime.title_japanese.toLowerCase().includes(query))
    );

    displayAnime(filteredAnime);
  } catch (error) {
    console.error("Error fetching anime:", error);
  }
}

function displayAnime(animeList) {
  const container = document.getElementById("animeList");
  container.innerHTML = "";

  if (animeList.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  animeList.forEach((anime) => {
    const animeCard = document.createElement("div");
    animeCard.className = "anime-card";

    animeCard.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Episodios: ${anime.episodes || "Desconocido"}</p>
      <a href="${anime.url}" target="_blank">Más información</a>
    `;

    container.appendChild(animeCard);
  });
}
