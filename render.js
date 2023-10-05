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

function renderPokemon(pokeName, pokeIMG, pokeType, i) {
  const pokemonCon = document.getElementById("pokemon-container");
  let colors = colorType(pokeType);
  pokemonCon.innerHTML += /*html*/ `        
      <div id="pokemon" style="background-color: ${colors[0]}; background-image: linear-gradient${colors[0]}, ${colors[1]};" onclick="openPokemonCard('${i}')">
          <p id="type">${pokeType}</p>
          <img id="picture" src="${pokeIMG}" alt="Pokemon">
          <p id="name">${pokeName}</p>
      </div>`;
}

function loadMoreButton() {
  document.getElementById(
    "load-more"
  ).innerHTML = `<button type="button" class="btn btn-secondary load-button" id="load-more-button" onclick="showAllPokemons()">More Pokemons</button>`;
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
        <div onclick="closeCard()" id="close-con">
          <a>Close</a>
        </div>
      </div>`;
}

function pokemonStatsBar(attributes) {
  document.getElementById("hp-barFill").style.width = `${attributes.pokeHp}%`;
  document.getElementById(
    "attack-barFill"
  ).style.width = `${attributes.pokeAttack}%`;
  document.getElementById(
    "defense-barFill"
  ).style.width = `${attributes.pokeDefense}%`;
  document.getElementById(
    "speed-barFill"
  ).style.width = `${attributes.pokeSpeed}%`;
}

function searchNotFound(){
    document.getElementById(
      "search-error"
    ).innerHTML = `<p class="d-flex justify-content-center m-5" style="color: red; positon: fixed;">No Pokémon found.</p>`;
    closeCard();
  }
  function searchHTMLclear(){
    document.getElementById("pokemon-container").innerHTML = ``;
    document.getElementById("pokemon-card").innerHTML = ``;
    document.getElementById("search-error").innerHTML = ``;
  }