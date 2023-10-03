async function loadPokemon(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON["name"];
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await responseJSON["types"]["0"]["type"]["name"];
  renderPokemon(pokeName, pokeIMG, pokeType, i);
}

function renderPokemon(pokeName, pokeIMG, pokeType, i) {
  const pokemonCon = document.getElementById("pokemon-container");
  let color = colorType(pokeType);
  pokemonCon.innerHTML += /*html*/ `        
    <div id="pokemon" style="background-color: ${color};" onclick="cardPokemon(${i})">
        <p id="type">${pokeType}</p>
        <img id="picture" src="${pokeIMG}" alt="Pokemon">
        <p id="name">${pokeName}</p>
    </div>`;
}

function searchPokemon() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  document.getElementById("pokemon-container").innerHTML = ``;
  closeCard();
  for (let i = 0; i < pokemons.length; i++) {
    const element = pokemons[i];
    if (element.includes(search)) {
      let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
      loadPokemon(url, i);
    }
  }
}

function cardPokemon(i) {
  let pokemonid = pokemons[i]
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonid}`;
  document.getElementById("pokemon-container").innerHTML = ``;
  loadCardPokem(url)
}

async function loadCardPokem(url){
  document.getElementById('body').classList.add('stop-scrolling');
  const card = document.getElementById("pokemon-card");
  card.style = "display: flex;"
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON["name"];
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await responseJSON["types"]["0"]["type"]["name"];
  card.innerHTML = cardPokemonHTML(pokeName, pokeIMG, pokeType);
}

function closeCard(i){
  const card = document.getElementById("pokemon-card");
  document.getElementById('body').classList.remove('stop-scrolling');
  card.style = "display: none;";
  if(i){
    searchPokemon();
  }
}

function cardPokemonHTML(pokeName, pokeIMG, pokeType) {
  let color = colorType(pokeType);
  return /*html*/ `        
    <div id="pokemon-card-stats" style="background-color: ${color};">
      <div id="pokemon-headline"><span>${pokeName}</span><span id="number">#001</span></div>
      <div id="picture-card-con">
        <img src="${pokeIMG}" alt="pokemon name img" id="picture-card">
      </div>
    </div>
    <div id="pokemon-stats">
      <div id="pokemon-nav">
        <a id="poke-nav-a">ABOUT</a>
        <a id="poke-nav-a">BASE STATS</a>
      </div>
      <div id="stats">
        <div id="name-stats">
          <p>Species</p><p>test</p>
        </div>
        <div id="name-stats">
          <p>Abilities</p><p>test</p>
        </div>
        <div id="name-stats">
          <p>Height</p><p>test</p>
        </div>
        <div id="name-stats">
          <p>Weight</p><p>test</p>
        </div>
      </div>
      <div onclick="closeCard(1)" id="close-con">
        <a>Close</a>
      </div>
    </div>`;
}

function errorFunction() {
  console.error("ERROR CANT LOAD");
}

//WAS BRAUCHE ICH FÜR INFORMATIONEN
//Name responseJSON['name']
//PICTURE responseJSON['sprites']['other']['official-artwork']['front_default']
//type responseJSON['types']['0']['type']['name']

//Height
//Weight
//Ability

//speed

//HP

//ATTACK
//DEFENSE

//SPACIEL ATTACK
//SPecial defense
