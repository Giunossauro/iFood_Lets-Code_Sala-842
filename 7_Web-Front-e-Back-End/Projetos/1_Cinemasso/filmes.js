const express = require('express');
const router = express.Router();
const db = require('./database');
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

//recebe filmeId | orderBy | orderType | limit | offset
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
  const offset = isValidNumber(req.query.offset) ? Number(req.query.offset) : 0;

  let orderBy = req.query.orderBy;
  if (orderBy != 'id' && orderBy != 'nome' && orderBy != 'duracao' && orderBy != 'categoriaId'){
    orderBy = 'id';
  }

  let orderType = req.query.orderType;
  if (orderType != 'asc' && orderType != 'desc'){
    orderType = 'asc';
  }

  const respostaDB = await db(TABLE_FILMES).orderBy(orderBy, orderType).limit(limit).offset(offset);

  if (respostaDB){
    return res.send(respostaDB);
  } else {
    res.status(500);
    return res.send("algo errado aconteceu");
  }
});

router.get('/:filmeId', async (req, res) => {
  const filmeId = req.params.filmeId;
  if (isValidNumber(filmeId)){
    const respostaDB = await db(TABLE_FILMES).where({id: Number(filmeId)});

    if (respostaDB){
      return res.send(respostaDB);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
  }

  res.sendStatus(400);
});

router.get('/:filmeId/:outroRecurso', async (req, res) => {
  const filmeId = req.params.filmeId;
  if (isValidNumber(filmeId)){
    const outroRecurso = req.params.outroRecurso;

    const limit = isValidNumber(req.query.limit) ? Number(req.query.limit) : Number.MAX_SAFE_INTEGER;
    const offset = isValidNumber(req.query.offset) ? Number(req.query.offset) : 0;

    let orderBy = req.query.orderBy;
    if (orderBy != 'id' && orderBy != 'nome' && orderBy != 'duracao' && orderBy != 'categoriaId'){
      orderBy = 'id';
    }

    let orderType = req.query.orderType;
    if (orderType != 'asc' && orderType != 'desc'){
      orderType = 'asc';
    }

    const baseQuery = `SELECT * FROM sessoes as S WHERE S.filmeId = ${filmeId}`;
    const options = ` ORDER BY ${orderBy} ${orderType} LIMIT ${limit} OFFSET ${offset}`;

    let respostaDB;

    if (outroRecurso == 'sessoes'){
      respostaDB = (await db.raw(
        baseQuery.concat(options)
      )).rows;
    }

    else if (outroRecurso == 'salas'){
      respostaDB = (await db.raw(
        `SELECT DISTINCT Sa.* FROM salas as Sa, (SELECT * FROM sessoes as S WHERE S.filmeId = ${filmeId}) as SF WHERE SF.filmeId = ${filmeId} ${options}`
      )).rows;
    }

    else {
      res.status(404)
      return res.send(`recurso ${outroRecurso} não encontrado`);
    }

    if (respostaDB){
      return res.send(respostaDB);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
    // res.send(queryGet(filmeId));
  }

  res.sendStatus(400);
});

router.post('/', async (req, res) => {
  const nome = req.body.nome;
  const duracao = req.body.duracao;
  const categoriaid = req.body.categoriaid;
  let sucesso;

  if (nome && duracao && categoriaid){
    sucesso = await db(TABLE_FILMES).insert({
      nome: nome,
      duracao: duracao,
      categoriaid: categoriaid
    });

    if (sucesso){
      return res.sendStatus(201);
    } else {
      res.status(500);
      return res.send("algo errado aconteceu");
    }
  }

  res.status(406);
  res.send("Favor informar nome, duracao e categoriaid para adicionar um filme.");
});

router.put('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  if (isValidNumber(filmeId)){
    const novoNomeDoFilme = req.body.nome;
    const novaDuracaoDoFilme = req.body.duracao;
    const novaCategoriaIdDoFilme = req.body.categoriaid;
    let sucesso;

    if(novoNomeDoFilme && novaDuracaoDoFilme && novaCategoriaIdDoFilme){
      sucesso = await db(TABLE_FILMES)
      .where({id: filmeId})
      .update({
        nome: novoNomeDoFilme,
        duracao: novaDuracaoDoFilme,
        categoriaid: novaCategoriaIdDoFilme
      });
    } else {
      res.status(406);
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  if (isValidNumber(filmeId)){
    const novoNomeDoFilme = req.body.nome;
    const novaDuracaoDoFilme = req.body.duracao;
    const novaCategoriaIdDoFilme = req.body.categoriaid;

    let novosDados = {};

    if (novoNomeDoFilme){
      novosDados.nome = novoNomeDoFilme;
    }

    if (novaDuracaoDoFilme){
      novosDados.duracao = novaDuracaoDoFilme;
    }

    if (novaCategoriaIdDoFilme){
      novosDados.categoriaid = novaCategoriaIdDoFilme;
    }

    let sucesso = await db(TABLE_FILMES)
      .where({id: filmeId})
      .update(novosDados);

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  if(isValidNumber(filmeId)){
    let sucesso = await db(TABLE_FILMES).where('id', filmeId).del();

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;
