var express = require('express');
var router = express.Router();
const db = require ('../database/index.js')

const checkID = (salaid) =>{
  if (isNaN(salaid) === true || salaid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  }
}

router.get('/', async function(req,res,next){
  const salas = await db.from('salas');
  console.log(salas)
  res.send(salas)
})

router.get('/:salaid', async function(req,res,next){
  const salaid = req.params.salaid
  if (isNaN(salaid) === true || salaid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const salas = await db.select().from('salas').where({id:salaid});
    return res.send(salas)
  }
})

router.post('/', async function(req, res, next){
  const salaid = req.params.salaid
  console.log(salaid)
  if (isNaN(salaid) === true || salaid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const oqveio = req.body
    console.log(oqveio)
    //const salas = await db.select().from('salas').where({id:salaid});
    //return res.send(salas)
  }
})

module.exports = router;
