async function loadPokemon(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  const pokeName = await responseJSON.name;
  const pokeIMG = await responseJSON["sprites"]["other"]["official-artwork"][
    "front_default"
  ];
  const pokeType = await pokeTypes(url, 0);
  renderPokemon(pokeName, pokeIMG, pokeType, i);
}

async function fetchData(url) {
  try {
      const response = await fetch(url);
      return await response.json();
  } catch {
      errorFunction();
  }
}

async function pokemonAttributes(poke, url, i) {
  return {
      pokeName: poke.name,
      pokeIMG: poke.sprites.other["official-artwork"].front_default,
      pokeNumber: pokeNumbers(i),
      pokeType: await pokeTypes(url, 0),
      pokeType2: await pokeTypes(url, 1),
      pokeAbility: await pokeAbilitys(url, 0),
      pokeAbility2: await pokeAbilitys(url, 1),
      pokeHeight: poke.height,
      pokeWeight: poke.weight,
      pokeHp: poke.stats[0].base_stat,
      pokeAttack: poke.stats[1].base_stat,
      pokeDefense: poke.stats[2].base_stat,
      pokeSpeed: poke.stats[5].base_stat
  };
}

function renderPokemonCard(attributes) {
  const card = document.getElementById("pokemon-card");
  card.style.display = "flex";
  card.innerHTML = cardPokemonHTML(
      attributes.pokeName,
      attributes.pokeIMG,
      attributes.pokeType,
      attributes.pokeType2,
      attributes.pokeAbility,
      attributes.pokeAbility2,
      attributes.pokeNumber,
      attributes.pokeHeight,
      attributes.pokeWeight,
      attributes.pokeHp,
      attributes.pokeAttack,
      attributes.pokeDefense,
      attributes.pokeSpeed
  );
}

async function loadCardPokem(url, i) {
  document.getElementById("body").classList.add("stop-scrolling");
  const responseJSON = await fetchData(url);
  if (responseJSON) {
      const attributes = await pokemonAttributes(responseJSON, url, i);
      renderPokemonCard(attributes);
      pokemonStatsBar(attributes);
  }
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
  let colors = colorType(pokeType);
  pokemonCon.innerHTML += /*html*/ `        
    <div id="pokemon" style="background-color: ${colors[0]}; background-image: linear-gradient${colors[0]}, ${colors[1]};" onclick="openPokemonCard(${i})">
        <p id="type">${pokeType}</p>
        <img id="picture" src="${pokeIMG}" alt="Pokemon">
        <p id="name">${pokeName}</p>
    </div>`;
}

function openPokemonCard(i) {
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

async function pokeTypes(url, i,) {
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

function switchStats(i) {
  const stats = document.getElementById("stats");
  const statsMore = document.getElementById("stats-more");
  const about = document.getElementById("aboutCard");
  const base = document.getElementById("baseCard");
  if(i == 'about'){
    stats.style = "";
    statsMore.style = "display: none";
    about.classList.add("active");
    base.classList.remove("active");
  }else{
    stats.style = "display: none";
    statsMore.style = "";
    about.classList.remove("active");
    base.classList.add("active");
  }
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
  let colors = [];
  colors = colorType(pokeType);
  return /*html*/ `        
    <div id="pokemon-card-stats" style="background-color: ${colors[0]}; background-image: linear-gradient${colors[0]}, ${colors[1]};">
      <div id="pokemon-headline"><span>${pokeName}</span><span id="number">${i}</span></div>
      <div id="picture-card-con">
        <img src="${pokeIMG}" alt="pokemon name img" id="picture-card">
      </div>
    </div>
    <div id="pokemon-stats">
      <div id="pokemon-nav">
        <a class="poke-nav-a active" id="aboutCard" onclick="switchStats('about')">ABOUT</a>
        <a class="poke-nav-a" id="baseCard" onclick="switchStats('')">BASE STATS</a>
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
        <div class="name-stats ma-b">
          <b>HP</b>
          <div class="bar-attribute">
            <div class="bar">
              <div class="fill" id="hp-barFill"></div>
            </div>
            <p>${pokeHp}</p>
          </div>
        </div>
        <div class="name-stats ma-b">
          <b>Attack</b>
          <div class="bar-attribute">
            <div class="bar">
              <div class="fill" id="attack-barFill"></div>
            </div>
            <p>${pokeAttack}</p>
          </div>
        </div>
        <div class="name-stats ma-b">
          <b>Defense</b>
          <div class="bar-attribute">
            <div class="bar">
              <div class="fill" id="defense-barFill"></div>
            </div>
            <p>${pokeDefense}</p>
          </div>
        </div>
        <div class="name-stats ma-b">
          <b>Speed</b>
          <div class="bar-attribute">
            <div class="bar">
              <div class="fill" id="speed-barFill"></div>
            </div>
            <p>${pokeSpeed}</p>
          </div>
        </div>
      </div>
      <div onclick="closeCard(1)" id="close-con">
        <a>Close</a>
      </div>
    </div>`;
}

function pokemonStatsBar(attributes){
  document.getElementById('hp-barFill').style.width = `${attributes.pokeHp}%`;
  document.getElementById('attack-barFill').style.width = `${attributes.pokeAttack}%`;
 document.getElementById('defense-barFill').style.width = `${attributes.pokeDefense}%`;
 document.getElementById('speed-barFill').style.width = `${attributes.pokeSpeed}%`;
}

function errorFunction() {
  console.error("ERROR CANT LOAD");
}
