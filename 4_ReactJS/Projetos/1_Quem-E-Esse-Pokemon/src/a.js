const fsPromise = require('fs').promises;

async function a(){
const filePath = `${__dirname}/pokemons.json`;
const pokemonsRaw = await fsPromise.readFile(filePath, 'utf-8');
let pokemons = JSON.parse(pokemonsRaw);
for (let x = 0; x < pokemons.length; x++){
  if (x < 898){
    pokemons[x].id = `${x + 1}`;
  }
  else{
    pokemons[x].id = `${x + 9103}`;
  }
}
const pokemonsStr = JSON.stringify(pokemons, null, 2);
const filePath2 = `${__dirname}/pokemons22.json`;
await fsPromise.writeFile(filePath2, pokemonsStr);
console.log(`Pokemons saved at ${filePath}!`);
}

a();