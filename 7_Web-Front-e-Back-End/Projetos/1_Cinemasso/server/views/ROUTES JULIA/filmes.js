var express = require('express');
var router = express.Router();
const db = require('../public/javascripts/database.js')

const checkID = (filmeid) => {
  if (isNaN(filmeid) === true || filmeid < 1) {
    return res.send("Para prosseguir com a request, digite um número válido")
  }
}

router.get('/', async function (req, res, next) {
  const filmes = await db.from('filmes');
  const { id, nome, duracao, imagemSrc } = filmes
  // console.log({ filmes })
  res.render('layout', { filmes });


  //res.send(filmes)
})

router.get('/:filmeid', async function (req, res, next) {
  const filmeid = req.params.filmeid
  if (isNaN(filmeid) === true || filmeid < 1) {
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const filmes = await db.select().from('filmes').where({ id: filmeid });
    //const { id, nome } = filmes


    console.log({ filmes })
    res.render('individual', { filmes: filmes[0] });

  }
})

router.post('/', async function (req, res, next) {
  const filmeid = req.params.filmeid
  console.log(filmeid)
  if (isNaN(filmeid) === true || filmeid < 1) {
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const oqveio = req.body
    console.log(oqveio)
    //const filmes = await db.select().from('filmes').where({id:filmeid});
    //return res.send(filmes)
  }
})

module.exports = router;
