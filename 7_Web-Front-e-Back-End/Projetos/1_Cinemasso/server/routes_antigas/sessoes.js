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
  return !(isNaN(maybeValidNumber) || maybeValidNumber < 1);
}

//recebe sessaoId | orderBy | orderType | limit | offset
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
    db(TABLE_SESSOES)
    .orderBy(orderBy, orderType)
    .limit(limit ? limit : Number.MAX_SAFE_INTEGER)
    .offset(offset ? offset : 0)
    //queryGet(null, orderBy, orderType, limit, offset)
  );
});

router.get('/:sessaoId', async (req, res) => {
  if (isValidNumber(req.query.sessaoId)){
    return res.send(await db(TABLE_SESSOES).where({id: Number(req.params.sessaoId)}));
    // res.send(queryGet(sessaoId));
  }

  res.send(`${req.query.sessaoId} não é um id valido. Favor informar um id válido`);
});

router.post('/', async (req, res) => {
  const filmeId = req.body.filmeId;
  const salaId = req.body.salaId;
  const dataInicio = req.body.dataInicio;
  let sucesso;

  if (filmeId && salaId && dataInicio){
    sucesso = await db(TABLE_SESSOES).insert({
      filmeId: filmeId,
      salaId: salaId,
      dataInicio: dataInicio
    });

    return res.send(sucesso ? "POST realizado com sucesso" : "algo errado aconteceu");
  }

  res.send("Favor informar filmeId, salaId e dataInicio para adicionar uma sessao");
});

router.put('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if (isValidNumber(req.query.sessaoId)){
    const novoFilmeIdDaSessao = req.body.filmeId;
    const novoSalaIdDaSessao = req.body.salaId;
    const novaDataInicioDaSessao = req.body.dataInicio;
    let sucesso;

    if(novoFilmeIdDaSessao && novoSalaIdDaSessao && novaDataInicioDaSessao){
      sucesso = await db(TABLE_SESSOES)
      .where({id: sessaoId})
      .update({
        filmeId: novoFilmeIdDaSessao,
        SalaId: novoSalaIdDaSessao,
        DataInicio: novaDataInicioDaSessao
      });
    } else {
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    return res.send(sucesso ? "PUT realizado com sucesso" : "filme não encontrado");
  }
  
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if (isValidNumber(req.query.sessaoId)){
    const novoFilmeIdDaSessao = req.body.filmeId;
    const novoSalaIdDaSessao = req.body.salaId;
    const novaDataInicioDaSessao = req.body.dataInicio;

    let props = {};

    if (novoFilmeIdDaSessao){
      props.filmeId = novoFilmeIdDaSessao;
    }

    if (novoSalaIdDaSessao){
      props.salaId = novoSalaIdDaSessao;
    }

    if (novaDataInicioDaSessao){
      props.dataInicio = novaDataInicioDaSessao;
    }

    let sucesso = await db(TABLE_SESSOES)
      .where({id: sessaoId})
      .update(props/* {
        filmeId: novoFilmeIdDaSessao,
        SalaId: novoSalaIdDaSessao,
        DataInicio: novaDataInicioDaSessao
      } */);

    return res.send(sucesso ? "PATCH realizado com sucesso" : "filme não encontrado");
  }
  
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if(isValidNumber(sessaoId)){
    let sucesso = await db(TABLE_SESSOES).where('id', sessaoId).del();

    await db.raw(`ALTER TABLE filmes ALTER COLUMN id RESTART WITH ${sessaoId}`);
    return res.send(sucesso ? "DELETE realizado com sucesso" : "filme não encontrado");
  }

  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;