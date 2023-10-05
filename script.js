let url = "https://pokeapi.co/api/v2/pokemon/";
let showPokemons = 0;

loadAllPokemonNames();
let allPokemonNames = [];

async function showAllPokemons() {
  showPokemons += 15;
  if (showPokemons < 1019) {
    for (let i = 1; i < showPokemons; i++) {
      await loadPokemon(i);
    }
    loadMoreButton();
  }
}

async function loadPokemon(i) {
  let pokemonID = url + i;
  const response = await fetch(pokemonID).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = responseJSON.name;
  const pokeIMG = responseJSON.sprites.other["official-artwork"].front_default;
  const pokeType = await pokeTypes(pokemonID, 0);
  renderPokemon(pokeName, pokeIMG, pokeType, i);
}

async function loadCardPokem(i) {
  let pokemonID = url + i;
  const response = await fetch(pokemonID).catch(errorFunction);
  const responseJSON = await response.json();
  if (responseJSON) {
    const attributes = await pokemonAttributes(responseJSON, pokemonID, i);
    renderPokemonCard(attributes);
    pokemonStatsBar(attributes);
  }
}

async function loadAllPokemonNames() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1019");
  const data = await response.json();
  allPokemonNames = data.results.map((pokemon) => pokemon.name);
}

async function searchPokemon() {
  let search = document.getElementById("search").value.toLowerCase();
  searchHTMLclear()
  if(search == ""){
    showPokemons = 0;
    showAllPokemons();
    return;
  }
  const matchedPokemons = allPokemonNames.filter((pokemonName) =>
    pokemonName.includes(search)
  );
  if (matchedPokemons.length === 0) {
    searchNotFound()
    return;
  }
  for (const pokemonName of matchedPokemons) {
    loadPokemon(pokemonName);
  }
}

function openPokemonCard(i) {
  document.getElementById("load-more-button").style.display = "none";
  document.getElementById("pokemon-container").innerHTML = ``;
  document.getElementById("search-error").innerHTML = ``;
  loadCardPokem(i);
}

function closeCard() {
  document.getElementById("pokemon-card").innerHTML = "";
  showPokemons = 0;
  showAllPokemons();
}

function switchStats(i) {
  const stats = document.getElementById("stats");
  const statsMore = document.getElementById("stats-more");
  const about = document.getElementById("aboutCard");
  const base = document.getElementById("baseCard");
  if (i == "about") {
    stats.style = "";
    statsMore.style = "display: none";
    about.classList.add("active");
    base.classList.remove("active");
  } else {
    stats.style = "display: none";
    statsMore.style = "";
    about.classList.remove("active");
    base.classList.add("active");
  }
}

function errorFunction() {
  console.error("ERROR CANT LOAD");
}
