const https = require('https');
const fsPromise = require('fs').promises;

const BASE_HOST = 'https://pokeapi.co/api/v2';

async function fetchPokemon(endpoint, id) {
  let endpointVars = '';

  if (id){
    endpointVars = id;
  }
  else{
    endpointVars = "?limit=20000";
  }
  const uri = `${BASE_HOST}/${endpoint}/${endpointVars}`
  let data = '';

  return new Promise((resolve) => {
    https.get(uri, res => {
      res.on('data', chunk => {
          data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', err => {
      console.log(err);
    });
  });
}

async function createPokemons() {
  const pokemonsList = await fetchPokemon("pokemon");
  const pokemonsCount = pokemonsList.count;
  const {count: speciesCount} = await fetchPokemon("pokemon-species");
  const {count: pokedexCount} = await fetchPokemon("pokedex");
  const pokemonRequests = [];
  const specieRequests = [];
  const pokedexRequests = [];

  for (let id = 2; id <= pokedexCount; id++){
    pokedexRequests.push(await fetchPokemon("pokedex", id));
    if (id === 9) {id++;}
    pokedexRequests[id] = {
      description: pokedexRequests[id].descriptions[
        pokedexRequests[id].descriptions.length - 1
      ].description,
      name: pokedexRequests[id].names[pokedexRequests[id].names.length - 1].name,
      pokemonsIds: pokedexRequests[id].pokemon_entries.map((p) => {
        const url = p.pokemon_species.url;
        return url.slice(42).slice(0,url.lastIndexOf()); //get non sequencial id in url
      }),
    };
  }

  for (let i = 0; i < pokemonsCount; i++) {
    const url = pokemonsList.results[i].url;
    const id = url.slice(34).slice(0,url.lastIndexOf()); //get non sequencial id in url

    pokemonRequests.push(await fetchPokemon("pokemon", id));
    if (i < speciesCount){
      specieRequests.push(await fetchPokemon("pokemon-species", id));
      
      // savepoint
      // specieRequests[i] = {color: specieRequests[i].color.name,growth_rate: specieRequests[i].growth_rate.name,generation: specieRequests[i].generation.name,habitat: specieRequests[i].habitat,isLegendary: specieRequests[i].is_legendary,shape: specieRequests[i].shape,};

      if (specieRequests[i].color !== null){
        specieRequests[i].color = specieRequests[i].color.name;
      } else {
        specieRequests[i].color = "";
      }

      if (specieRequests[i].growth_rate !== null){
        specieRequests[i].growth_rate = specieRequests[i].growth_rate.name;
      } else {
        specieRequests[i].growth_rate = "";
      }

      if (specieRequests[i].generation !== null){
        specieRequests[i].generation = specieRequests[i].generation.name;
      } else {
        specieRequests[i].generation = "";
      }

      if (specieRequests[i].habitat !== null){
        specieRequests[i].habitat = specieRequests[i].habitat.name;
      } else {
        specieRequests[i].habitat = "";
      }

      if (specieRequests[i].pal_park_encounters !== []){
        specieRequests[i].pal_park_encounters = specieRequests[i].pal_park_encounters.map(
          (e) => e.area.name
        );
      } else {
        specieRequests[i].pal_park_encounters = "";
      }

      if(specieRequests[i].shape !== null){
        specieRequests[i].shape = specieRequests[i].shape.name;
      } else {
        specieRequests[i].shape = "";
      }

     } else {
      specieRequests[i] = {
        color: "",
        growth_rate: "",
        generation: "",
        habitat: "",
        is_baby: "",
        isLegendary: "",
        is_mythical: "",
        pal_park_encounters: "",
        shape: "",
      };
    }

    pokemonRequests[i] = {
      name: pokemonRequests[i].name,
      types: pokemonRequests[i].types.map(({ type }) => type.name),
      sprite: pokemonRequests[i].sprites.front_default,
      ...specieRequests[i],
      ...pokedexRequests[i],
    };
  }

  const pokemonsStr = JSON.stringify(pokemonRequests, null, 2);
  const filePath = `${__dirname}/pokemons.json`;
  await fsPromise.writeFile(filePath, pokemonsStr);
  console.log(`Pokemons saved at ${filePath}!`);
}

async function createFilters() {
  const filePath = `${__dirname}/pokemons.json`;
  const pokemonsRaw = await fsPromise.readFile(filePath, 'utf-8');
  const pokemons = JSON.parse(pokemonsRaw);
  const filters = new Map();
  const ignoredAttributes = new Set(['name', 'sprite']);
  
  for (const pokemon of pokemons) {
    const entries = Object.entries(pokemon);
    for (const element of entries) {
      const [key, value] = element;

      if (ignoredAttributes.has(key)) continue;

      const prevFilter = filters.has(key) ? filters.get(key) : new Set();

      if (Array.isArray(value)) {
        value.forEach(prevFilter.add, prevFilter);
      } else {
        prevFilter.add(value); 
      }

      filters.set(key, prevFilter);
    }
  }

  for (let [k, v] of filters) {
    filters.set(k, Array.from(v));
  }

  const filtersObj = Object.fromEntries(filters);
  const filtersStr = JSON.stringify(filtersObj, null, 2);
  const filtersFilePath = `${__dirname}/filters.json`;

  await fsPromise.writeFile(filtersFilePath, filtersStr);

  console.log(`Filters saved at ${filtersFilePath}!`);
}

(async function() {
  await createPokemons();
  await createFilters();
})();
