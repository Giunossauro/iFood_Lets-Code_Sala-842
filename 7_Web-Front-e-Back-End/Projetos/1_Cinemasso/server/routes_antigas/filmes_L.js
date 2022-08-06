var express = require('express');
var router = express.Router();
const db = require ('../database/index.js')

const checkID = (filmeid) =>{
  if (isNaN(filmeid) === true || filmeid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  }
}

router.get('/', async function(req,res,next){
  const filmes = await db.from('filmes');
  console.log(filmes)
  res.send(filmes)
})

router.get('/:filmeid', async function(req,res,next){
  const filmeid = req.params.filmeid
  if (isNaN(filmeid) === true || filmeid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const filmes = await db.select().from('filmes').where({id:filmeid});
    return res.send(filmes)
  }
})

router.post('/', async function(req, res, next){
  const filmeid = req.params.filmeid
  console.log(filmeid)
  if (isNaN(filmeid) === true || filmeid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const oqveio = req.body
    console.log(oqveio)
    //const filmes = await db.select().from('filmes').where({id:filmeid});
    //return res.send(filmes)
  }
})

module.exports = router;
