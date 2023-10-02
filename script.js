function arrayPokemon() {
  for (let i = 0; i < pokemons.length; i++) {
    const element = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
    loadPokemon(url);
  }
}

async function loadPokemon(url) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON["name"];
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await responseJSON["types"]["0"]["type"]["name"];
  renderPokemon(pokeName, pokeIMG, pokeType);
}

function renderPokemon(pokeName, pokeIMG, pokeType) {
  const pokemonCon = document.getElementById("pokemon-container");
    let color = colorType(pokeType)    
  pokemonCon.innerHTML += 
  /*html*/`        
    <div id="pokemon" style="background-color: ${color};">
        <p id="type">${pokeType}</p>
        <img id="picture" src="${pokeIMG}" alt="Pokemon">
        <p id="name">${pokeName}</p>
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

