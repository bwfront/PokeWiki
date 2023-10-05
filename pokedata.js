function colorType(pokeType) {
  let color, gradient;
  switch (pokeType) {
    case "grass":
      color = "#103000";      
      gradient = "#5caa44";   
      break;
    case "bug":
      color = "#607a10";
      gradient = "#c9ff70";
      break;
    case "fire":
      color = "#a80300";
      gradient = "#ff9270";
      break;
    case "normal":
      color = "#8c8971";
      gradient = "#e6e3c5";
      break;
    case "water":
      color = "#0a3566";
      gradient = "#61a0d4";
      break;
    case "rock":
      color = "#2d1c0f";
      gradient = "#9f947a";
      break;
    case "poison":
      color = "#450960";
      gradient = "#bf76c9";
      break;
    case "electric":
      color = "#706800";
      gradient = "#e6e844";
      break;
    case "ground":
      color = "#8e8010";
      gradient = "#fff89d";
      break;
    case "psychic":
      color = "#680220";
      gradient = "#e05f88";
      break;
    case "fighting":
      color = "#5c0200";
      gradient = "#e25a5f";
      break;
    case "ice":
      color = "#082529";
      gradient = "#62a6b5";
      break;
    case "ghost":
      color = "#2e193b";
      gradient = "#9885b2";
      break;
    case "dragon":
      color = "#1b0049";
      gradient = "#8d6fd1";
      break;
    case "dark":
      color = "#1a110d";
      gradient = "#8b8378";
      break;
    case "steel":
      color = "#2c2c2c";
      gradient = "#b1b1b1";
      break;
    case "fairy":
      color = "#e8568c";
      gradient = "#ffdbee";
      break;
    default:
      color = "#000000";
      gradient = "#555555";
  }
    return [color, gradient];
}

function pokeNumbers(poke) {
  let number =  poke.id
  if (number < 10) {
    number = "#00" + number;
  } else if (number < 100) {
    number = "#0" + number;
  } else {
    number = "#" + number;
  }
  return number;
}

async function pokeAbilitys(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  if (!responseJSON.abilities?.[i]?.ability?.name) {
    return "";
  } else {
    return await responseJSON.abilities[i].ability.name;
  }
}

async function pokeTypes(url, i) {
  const response = await fetch(url).catch(errorFunction);
  const responseJSON = await response.json();
  if (!responseJSON.types?.[i]?.type?.name) {
    return "";
  } else {
    return await responseJSON.types[i].type.name;
  }
}

async function pokemonAttributes(poke, url) {
  return {
    pokeName: poke.name,
    pokeIMG: poke.sprites.other["official-artwork"].front_default,
    pokeNumber: pokeNumbers(poke),
    pokeType: await pokeTypes(url, 0),
    pokeType2: await pokeTypes(url, 1),
    pokeAbility: await pokeAbilitys(url, 0),
    pokeAbility2: await pokeAbilitys(url, 1),
    pokeHeight: poke.height,
    pokeWeight: poke.weight,
    pokeHp: poke.stats[0].base_stat,
    pokeAttack: poke.stats[1].base_stat,
    pokeDefense: poke.stats[2].base_stat,
    pokeSpeed: poke.stats[5].base_stat,
  };
}