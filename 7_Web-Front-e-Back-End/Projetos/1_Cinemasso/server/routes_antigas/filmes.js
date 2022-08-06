const express = require('express');
const router = express.Router();
const db = require('../database/index.js');
const TABLE_FILMES = 'filmes';
const TABLE_SALAS = 'salas';
const TABLE_SESSOES = 'sessoes';
const TABLE_CATEGORIAS = 'sessoes';

//acho que isto pode servir pra alguma coisa, senão só excluir
const sliceByLimit = (arr, limit) => arr.slice(0, limit);

//isto aqui também
const TYPES = {
  JSON: 'json',
  HTML: 'html',
};

const isValidNumber = (maybeValidNumber) =>{
  return (isNaN(maybeValidNumber) || maybeValidNumber < 1);
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
  const offset = isValidNumber(req.query.offset) ? Number(req.query.limit) : 0;

  let orderBy = req.query.orderBy;
  if (orderBy != 'id' && orderBy != 'nome' && orderBy != 'capacidade'){
    orderBy = 'id';
  }

  let orderType = req.query.orderType;
  if (orderType != 'asc' && orderType != 'desc'){
    orderType = 'asc';
  }

  res.send(await
    db(TABLE_FILMES)
    .orderBy(orderBy, orderType)
    .limit(limit ? limit : Number.MAX_SAFE_INTEGER)
    .offset(offset ? offset : 0)
    //queryGet(null, orderBy, orderType, limit, offset)
  );
});

router.get('/:filmeId', async (req, res) => {
  if (isValidNumber(req.query.filmeId)){
    return res.send(await db(TABLE_FILMES).where({id: Number(req.params.filmeId)}));
    // res.send(queryGet(filmeId));
  }

  res.send(`${req.query.filmeId} não é um id valido. Favor informar um id válido`);
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

    return res.send(sucesso ? "POST realizado com sucesso" : "algo errado aconteceu");
  }

  res.send("Favor informar nome, duracao e categoriaid para adicionar um filme.");
});

router.put('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  if (isValidNumber(req.query.filmeId)){
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
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    return res.send(sucesso ? "PUT realizado com sucesso" : "filme não encontrado");
  }
  
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  console.log(filmeId)
  console.log(typeof filmeId) 

  if (isValidNumber(filmeId)){
    const novoNomeDoFilme = req.body.nome;
    const novaDuracaoDoFilme = req.body.duracao;
    const novaCategoriaIdDoFilme = req.body.categoriaid;

    let props = {};

    if (novoNomeDoFilme){
      props.nome = novoNomeDoFilme;
    }

    if (novaDuracaoDoFilme){
      props.duracao = novaDuracaoDoFilme;
    }

    if (novaCategoriaIdDoFilme){
      props.categoriaid = novaCategoriaIdDoFilme;
    }

    let sucesso = await db(TABLE_FILMES)
      .where({id: filmeId})
      .update(props/* {
        nome: novoNomeDoFilme,
        duracao: novaDuracaoDoFilme,
        categoriaid: novaCategoriaIdDoFilme
      } */);

    return res.send(sucesso ? "PATCH realizado com sucesso" : "filme não encontrado");
  }
  
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:filmeId', async (req, res) => {
  const filmeId = Number(req.params.filmeId);

  if(isValidNumber(filmeId)){
    let sucesso = await db(TABLE_FILMES).where('id', filmeId).del();

    await db.raw(`ALTER TABLE filmes ALTER COLUMN id RESTART WITH ${filmeId}`);
    return res.send(sucesso ? "DELETE realizado com sucesso" : "filme não encontrado");
  }

  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;