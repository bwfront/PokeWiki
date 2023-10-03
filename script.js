async function loadPokemon(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON["name"];
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await pokeTypes(url, 0);
  console.log(responseJSON["stats"]);
  renderPokemon(pokeName, pokeIMG, pokeType, i);
}

async function loadCardPokem(url, i) {
  document.getElementById("body").classList.add("stop-scrolling");
  const card = document.getElementById("pokemon-card");
  card.style = "display: flex;";
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON["name"];
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await pokeTypes(url, 0);
  const pokeType2 = await pokeTypes(url, 1);
  const pokeAbility = await pokeAbilitys(url, 0);
  const pokeAbility2 = await pokeAbilitys(url, 1);
  const pokeNumber = pokeNumbers(i);
  const pokeHeight = await responseJSON["height"];
  const pokeWeight = await responseJSON["weight"];
  const pokeHp = await responseJSON["stats"][0]["base_stat"];
  const pokeAttack = await responseJSON["stats"][1]["base_stat"];
  const pokeDefense = await responseJSON["stats"][2]["base_stat"];
  const pokeSpeed = await responseJSON["stats"][5]["base_stat"];
  card.innerHTML = cardPokemonHTML(
    pokeName,
    pokeIMG,
    pokeType,
    pokeType2,
    pokeAbility,
    pokeAbility2,
    pokeNumber,
    pokeHeight,
    pokeWeight,
    pokeHp,
    pokeAttack,
    pokeDefense,
    pokeSpeed
  );
}

function pokeNumbers(i) {
  i++;
  if (i < 10) {
    number = "#00" + i;
  } else if (i < 100) {
    number = "#0" + i;
  } else {
    number = "#" + i;
  }
  return number;
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

function cardPokemon(i) {
  let pokemonid = pokemons[i];
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonid}`;
  document.getElementById("pokemon-container").innerHTML = ``;
  loadCardPokem(url, i);
}

async function pokeAbilitys(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  if (!responseJSON.abilities?.[i]?.ability?.name) {
    return "";
  } else {
    return await responseJSON["abilities"][i]["ability"]["name"];
  }
}

async function pokeTypes(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  if (!responseJSON.types?.[i]?.type?.name) {
    return "";
  } else {
    return await responseJSON["types"][i]["type"]["name"];
  }
}

function closeCard(i) {
  const card = document.getElementById("pokemon-card");
  document.getElementById("body").classList.remove("stop-scrolling");
  card.style = "display: none;";
  if (i) {
    searchPokemon();
  }
}

function switchToMainStats() {
  const stats = document.getElementById("stats");
  stats.style = "";
  const statsMore = document.getElementById("stats-more");
  statsMore.style = "display: none";
  const about = document.getElementById('aboutCard');
  about.classList.add("active");
  const base = document.getElementById('baseCard');
  base.classList.remove("active");
}
function switchToBaseStats() {
  const stats = document.getElementById("stats");
  stats.style = "display: none";
  const statsMore = document.getElementById("stats-more");
  statsMore.style = "";
  const about = document.getElementById('aboutCard');
  about.classList.remove("active");
  const base = document.getElementById('baseCard');
  base.classList.add("active");
}

function cardPokemonHTML(
  pokeName,
  pokeIMG,
  pokeType,
  pokeType2,
  pokeAbility,
  pokeAbility2,
  i,
  pokeHeight,
  pokeWeight,
  pokeHp,
  pokeAttack,
  pokeDefense,
  pokeSpeed
) {
  let color = colorType(pokeType);
  return /*html*/ `        
    <div id="pokemon-card-stats" style="background-color: ${color};">
      <div id="pokemon-headline"><span>${pokeName}</span><span id="number">${i}</span></div>
      <div id="picture-card-con">
        <img src="${pokeIMG}" alt="pokemon name img" id="picture-card">
      </div>
    </div>
    <div id="pokemon-stats">
      <div id="pokemon-nav">
        <a class="poke-nav-a active" id="aboutCard" onclick="switchToMainStats()">ABOUT</a>
        <a class="poke-nav-a" id="baseCard" onclick="switchToBaseStats()">BASE STATS</a>
      </div>
      <div id="stats">
        <div class="name-stats">
            <b>Typ</b><p>${pokeType} ${pokeType2}</p>
          </div>
        <div class="name-stats">
          <b>Abilitiy</b><p>${pokeAbility} ${pokeAbility2}</p>
        </div>
        <div class="name-stats">
          <b>Height</b><p>${pokeHeight}"</p>
        </div>
        <div class="name-stats">
          <b>Weight</b><p>${pokeWeight} lbs</p>
        </div>
      </div>
      
      <div id="stats-more" style="display: none">
        <div class="name-stats">
          <b>HP</b><p>${pokeHp}</p>
        </div>
        <div class="name-stats">
          <b>Attack</b><p>${pokeAttack}</p>
        </div>
        <div class="name-stats">
          <b>Defense</b><p>${pokeDefense}</p>
        </div>
        <div class="name-stats">
            <b>Speed</b><p>${pokeSpeed}</p>
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
