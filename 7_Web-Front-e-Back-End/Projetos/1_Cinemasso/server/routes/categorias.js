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

//recebe categoriaId | orderBy | orderType | limit | offset
/* function queryGet() {
  return db(TABLE_CATEGORIAS)
    .where(arguments[0] ? { id: arguments[0] } : true)
    .orderBy(
      arguments[1] ? arguments[1] : 'id', arguments[2] ? arguments[2] : 'asc'
    )
    .limit(arguments[3] ? arguments[3] : Number.MAX_SAFE_INTEGER)
    .offset(arguments[4] ? arguments[4] : 0);
} */

router.get('/', async (req, res) => {
  const limit = isValidNumber(req.query.limit) ? Number(req.query.limit) : Number.MAX_SAFE_INTEGER;
  const offset = isValidNumber(req.query.offset) ? Number(req.query.offset) : 0;

  let orderBy = req.query.orderBy;
  if (orderBy != 'id' && orderBy != 'nome'){
    orderBy = 'id';
  }

  let orderType = req.query.orderType;
  if (orderType != 'asc' && orderType != 'desc'){
    orderType = 'asc';
  }

  let respostaDB = await db(TABLE_CATEGORIAS) .orderBy(orderBy, orderType).limit(limit).offset(offset);

  if (respostaDB){
    return res.render('layout_categorias', { respostaDB }); 
    //
    //res.send(respostaDB);
  } else {
    res.status(500);
    return res.send("algo errado aconteceu");
  }
});

router.get('/:categoriaId', async (req, res) => {
  const categoriaId = req.params.categoriaId;
  if (isValidNumber(categoriaId)){
    const respostaDB = await db(TABLE_CATEGORIAS).where({id: Number(categoriaId)});

    if (respostaDB){
      return  res.render('individual_categorias', { respostaDB: respostaDB[0] });
      //res.send(respostaDB);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
    // res.send(queryGet(categoriaId));
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.post('/', async (req, res) => {
  const nome = req.body.nome;
  let sucesso;

  if (nome){
    sucesso = await db(TABLE_CATEGORIAS).insert({
      nome: nome
    });

    if (sucesso){
      return res.sendStatus(201);
    } else {
      res.status(500);
      return res.send("algo errado aconteceu");
    }
  }

  res.status(400);
  res.send("Favor informar nome, duracao e categoriaid para adicionar um filme.");
});

router.put('/:categoriaId', async (req, res) => {
  const categoriaId = Number(req.params.categoriaId);

  if (isValidNumber(categoriaId)){
    const novoNomeDeCategoria = req.body.nome;
    let sucesso;

    if(novoNomeDeCategoria){
      sucesso = await db(TABLE_CATEGORIAS)
      .where({id: categoriaId})
      .update({
        nome: novoNomeDeCategoria
      });
    } else {
      res.status(400);
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("categoria não encontrada ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:categoriaId', async (req, res) => {
  const categoriaId = Number(req.params.categoriaId);

  if (isValidNumber(categoriaId)){
    const novoNomeDeCategoria = req.body.nome;

    let novosDados = {};

    if (novoNomeDeCategoria){
      novosDados.nome = novoNomeDeCategoria;
    }

    let sucesso = await db(TABLE_CATEGORIAS)
      .where({id: categoriaId})
      .update(novosDados);

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("categoria não encontrada ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:categoriaId', async (req, res) => {
  const categoriaId = Number(req.params.categoriaId);

  if(isValidNumber(categoriaId)){
    let sucesso = await db(TABLE_CATEGORIAS).where('id', categoriaId).del();

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("categoria não encontrada ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;
