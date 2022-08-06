var express = require('express');
var router = express.Router();
const db = require ('../database/index.js')

const checkID = (sessoesid) =>{
  if (isNaN(sessoesid) === true || sessoesid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  }
}

router.get('/', async function(req,res,next){
  const sessoes = await db.from('sessoes');
  res.send(sessoes)
})

router.get('/:sessoesid', async function(req,res,next){
  const sessoesid = req.params.sessoesid
  if (isNaN(sessoesid) === true || sessoesid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const sessoes = await db.select().from('sessoes').where({id:sessoesid});
    return res.send(sessoes)
  }
})

router.post('/', async function(req, res, next){
  const sessoesid = req.params.sessoesid
  console.log(sessoesid)
  if (isNaN(sessoesid) === true || sessoesid < 1){
    return res.send("Para prosseguir com a request, digite um número válido")
  } else {
    const oqveio = req.body
    console.log(oqveio)
    //const sessoes = await db.select().from('sessoes').where({id:sessoesid});
    //return res.send(sessoes)
  }
})

module.exports = router;
