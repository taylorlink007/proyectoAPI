let currentUrl = "https://pokeapi.co/api/v2/pokemon?limit=8"; // URL inicial para los primeros 8 Pokémon

// Función para obtener Pokémon desde una URL específica
async function fetchPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Función para obtener los detalles de un Pokémon
async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    status: data.base_experience || "N/A",
    species: data.id,
    image: data.sprites.front_default || "https://via.placeholder.com/100",
  };
}

// Función para mostrar los Pokémon en la página
async function displayPokemon(url) {
  const container = document.getElementById("pokemon-list");
  container.innerHTML = ""; // Limpiar los Pokémon existentes

  const data = await fetchPokemon(url); // Obtener datos desde la API
  const pokemonList = data.results;

  for (const pokemon of pokemonList) {
    const details = await fetchPokemonDetails(pokemon.url);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${details.name}</h3>
      <p>Status: ${details.status}</p>
      <p>Species: ${details.species}</p>
      <img src="${details.image}" alt="${details.name}">
    `;

    container.appendChild(card);
  }

  // Actualizar botones de paginación
  updatePagination(data.previous, data.next);
}

// Función para actualizar los botones de paginación
function updatePagination(previousUrl, nextUrl) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Limpiar la paginación existente

  if (previousUrl) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.onclick = () => displayPokemon(previousUrl);
    paginationContainer.appendChild(prevButton);
  }

  if (nextUrl) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.onclick = () => displayPokemon(nextUrl);
    paginationContainer.appendChild(nextButton);
  }
}

// Inicializar la página con la primera URL
displayPokemon(currentUrl);
