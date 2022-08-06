var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.send("Api destinada a saber informações de filmes, horários e as salas onde serão exibidos. Para saber mais, adicione ao endereço 'localhost/XXX' /filmes, ou /salas ou /horarios");
});

module.exports = router;
