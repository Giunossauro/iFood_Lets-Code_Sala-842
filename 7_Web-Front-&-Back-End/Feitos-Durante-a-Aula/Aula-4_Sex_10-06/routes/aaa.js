var express = require('express');
var router = express.Router();
const db = require ('./database/index.js')

const checkID = (filmeid) =>{
  if (isNaN(filmeid) === true || filmeid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  }
}

router.get('/', async function(req,res,next){
  const filmes = await db.from('filmes');
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
  if (isNaN(filmeid) === true || filmeid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const oqveio = req.body
    console.log(oqveio)
    //const filmes = await db.select().from('filmes').where({id:filmeid});
    //return res.send(filmes)
  }
})



/* GET home page. */
/*router.get('/', function(req, res, next) {
  const id = req.params()
   res.send([
    data = [
      titulo="Homem-Aranha",
      cinema="Cinemark",
      horario="21:00",
      sala="4b",
    ]
  ]);
})

router.get('/', function(req, res, next) {
  const id = req.params()
  if (isNan(id) == false || id <= 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
     return res.send([
    data = [
      titulo="Homem-Aranha",
      cinema="Cinemark",
      horario="21:00",
      sala="4b",
    ]
  ])
  }
})
*/

module.exports = router;
