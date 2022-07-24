var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // Aqui, se quisesse carregar uma view jade, teria que usar res.render
  //igual no index.js (substitui o res.send)
  // Vou deixar aqui para testar e comentar o res.send
  const { data: pokemon } = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
  res.render("index",{
    title: pokemon.name
  });

  // Lembrando de deixar a rota async (recomendado, eu acho)
  // Outra obs é q o server aguarda o fetch do axios pra enviar a resposta,
  //o que pode gerar atraso no servidor ou outros erros.

  //res.send('respond with a resource');
});

module.exports = router;
