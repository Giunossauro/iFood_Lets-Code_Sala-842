const axios = require('axios');
const fsPromise = require('fs').promises;

const BASE_HOST = 'https://pokeapi.co/api/v2';

async function fetchPokemon(id) {
  const isNatural = Number.isInteger(id) && id > 0;
  if (!isNatural) throw new Error('invalid id');
  
  const { data: pokemon } = await axios.get(`${BASE_HOST}/pokemon/${id}`);

  const species = await fetchSpecies(id);
  
  return {
    name: pokemon.name,
    types: pokemon.types.map(({ type }) => type.name),
    sprite: pokemon.sprites.front_default,
    ...species,
  };
}

async function fetchSpecies(id) {
  const { data: species } = await axios.get(`${BASE_HOST}/pokemon-species/${id}`);

  return {
    color: species.color.name,
    generation: species.generation.name,
    habitat: species.habitat.name,
    isLegendary: species.is_legendary,
    shape: species.shape.name,
  };
}

async function createPokemons() {
  const requests = [];

  for (let i = 1; i <= 150; i++) {
    const request = fetchPokemon(i);
    requests.push(request);
  }

  const pokemons = await Promise.all(requests);
  const pokemonsStr = JSON.stringify(pokemons, null, 2);
  
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

