const https = require('https');

const BASE_HOST = 'https://pokeapi.co/api/v2';

async function fetchPokemon(id) {
  let data = '';

  return new Promise((resolve) => {
    https.get(`${BASE_HOST}/pokemon/${id}`, res => {
      res.on('data', chunk => {
          data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', err => {
      console.log("erro");
      console.log(err);
    });
  });
}

async function createPokemons() {
  const bodyJ = await fetchPokemon(1);
  console.log(
    {
      name: bodyJ.name,
      types: bodyJ.types.map(({ type }) => type.name),
      sprite: bodyJ.sprites.front_default,
    }
  );
}

(async function() {
  await createPokemons();
})();
