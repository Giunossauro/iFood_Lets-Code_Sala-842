const express = require('express');
const router = express.Router();
const db = require('../database/index.js');
const TABLE_FILMES = 'filmes';
const TABLE_SALAS = 'salas';
const TABLE_SESSOES = 'sessoes';
const TABLE_CATEGORIAS = 'categorias';

//acho que isto pode servir pra alguma coisa, senão só excluir
const sliceByLimit = (arr, limit) => arr.slice(0, limit);

//isto aqui também
const TYPES = {
  JSON: 'json',
  HTML: 'html',
};

const isValidNumber = (maybeValidNumber) =>{
  return !(isNaN(maybeValidNumber) || maybeValidNumber < 1);
}

//recebe salaId | orderBy | orderType | limit | offset
/* function queryGet() {
  return db(TABLE_FILMES)
    .where(arguments[0] ? { id: arguments[0] } : true)
    .orderBy(
      arguments[1] ? arguments[1] : 'id', arguments[2] ? arguments[2] : 'asc'
    )
    .limit(arguments[3] ? arguments[3] : Number.MAX_SAFE_INTEGER)
    .offset(arguments[4] ? arguments[4] : 0);
} */

router.get('/', async (req, res) => {
  const limit = isValidNumber(req.query.limit) ? Number(req.query.limit) : Number.MAX_SAFE_INTEGER;
  const offset = isValidNumber(req.query.offset) ? Number(req.query.limit) : 0;

  let orderBy = req.query.orderBy;
  if (orderBy != 'id' && orderBy != 'nome' && orderBy != 'capacidade'){
    orderBy = 'id';
  }

  let orderType = req.query.orderType;
  if (orderType != 'asc' && orderType != 'desc'){
    orderType = 'asc';
  }

  let respostaDB = await db(TABLE_SALAS).orderBy(orderBy, orderType).limit(limit).offset(offset)
  
  if (respostaDB){
    return   res.render('layout_salas', { respostaDB })
    //res.send(respostaDB);
  } else {
    res.status(500);
    return res.send("algo errado aconteceu");
  }
});

router.get('/:salaId', async (req, res) => {
  const salaId = req.params.salaId;
  if (isValidNumber(salaId)){
    const respostaDB = await db(TABLE_SALAS).where({id: Number(salaId)});

    if (respostaDB){
      return res.render('individual_salas', { respostaDB: respostaDB[0] })
      //res.send(respostaDB);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
    // res.send(queryGet(salaId));
  }

  res.sendStatus(400);
});

router.post('/', async (req, res) => {
  const nome = req.body.nome;
  const capacidade = req.body.capacidade;
  let sucesso;

  if (nome && capacidade){
    sucesso = await db(TABLE_SALAS).insert({
      nome: nome,
      capacidade: capacidade
    });

    if (sucesso){
      return res.sendStatus(201);
    } else {
      res.status(500);
      return res.send("algo errado aconteceu");
    }
  }

  res.status(406);
  res.send("Favor informar nome e capacidade para adicionar uma sala.");
});

router.put('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if (isValidNumber(salaId)){
    const novoNomeDaSala = req.body.nome;
    const novaCapacidadeDaSala = req.body.capacidade;
    let sucesso;

    if(novoNomeDaSala && novaCapacidadeDaSala){
      sucesso = await db(TABLE_SALAS)
      .where({id: salaId})
      .update({
        nome: novoNomeDaSala,
        capacidade: novaCapacidadeDaSala
      });
    } else {
      res.status(406);
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("Sala não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if (isValidNumber(salaId)){
    const novoNomeDaSala = req.body.nome;
    const novaCapacidadeDaSala = req.body.capacidade;

    let novosDados = {};

    if (novoNomeDaSala){
      novosDados.nome = novoNomeDaSala;
    }

    if (novaCapacidadeDaSala){
      novosDados.capacidade = novaCapacidadeDaSala;
    }

    let sucesso = await db(TABLE_SALAS)
      .where({id: salaId})
      .update(novosDados);

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("sala não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if(isValidNumber(salaId)){
    let sucesso = await db(TABLE_SALAS).where('id', salaId).del();

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("sala não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;
