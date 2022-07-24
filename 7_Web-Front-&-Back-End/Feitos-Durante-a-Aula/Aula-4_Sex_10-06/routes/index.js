var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render chama das views
  res.render('index', {
    title: 'Express', // title é uma var, como as props do ReactJS
    now: new Date().toISOString() //mesma coisa do de cima
  });
});

module.exports = router;
