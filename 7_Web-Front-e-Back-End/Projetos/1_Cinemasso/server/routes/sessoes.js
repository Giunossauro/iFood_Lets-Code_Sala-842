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
  if (orderBy != 'id' && orderBy != 'filmeId' && orderBy != 'salaId' && orderBy != 'dataInicio'){
    orderBy = 'id';
  }

  let orderType = req.query.orderType;
  if (orderType != 'asc' && orderType != 'desc'){
    orderType = 'asc';
  }

  let respostaDB = await db(TABLE_SESSOES) .orderBy(orderBy, orderType).limit(limit).offset(offset);

  if (respostaDB){
    return   res.render('layout_sessoes', { respostaDB }); 
    //res.send(respostaDB);
  } else {
    res.status(500);
    return res.send("algo errado aconteceu");
  }
});

router.get('/:sessaoId', async (req, res) => {
  const sessaoId = req.params.sessaoId;
  if (isValidNumber(sessaoId)){
    const respostaDB = await db(TABLE_SESSOES).where({id: Number(sessaoId)});

    if (respostaDB){
      return      res.render('individual_sessoes', { respostaDB: respostaDB[0] });
      ///res.send(respostaDB);
    } else {
      res.status(500);
      return res.send("filme não encontrado ou algum outro erro");
    }
    // res.send(queryGet(sessaoId));
  }

  res.status(400);
  res.send(`${sessaoId} não é um id valido. Favor informar um id válido`);
});

router.post('/', async (req, res) => {
  const filmeId = req.body.filmeid;
  const salaId = req.body.salaid;
  const dataInicio = (new Date(req.body.datainicio))/* .getTime() */;

  let sucesso;

  if (filmeId && salaId && dataInicio){
    sucesso = await db(TABLE_SESSOES).insert({
      filmeid: filmeId,
      salaid: salaId,
      datainicio: dataInicio /// 1000
    });

    if (sucesso){
      return res.sendStatus(201);
    } else {
      res.status(500);
      return res.send("algo errado aconteceu");
    }
  }

  res.status(400);
  res.send("Favor informar filmeId, salaId e dataInicio para adicionar uma sessao");
});

router.put('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if (isValidNumber(sessaoId)){
    const novoFilmeIdDaSessao = req.body.filmeid;
    const novoSalaIdDaSessao = req.body.salaid;
    const novaDataInicioDaSessao = req.body.datainicio;
    let sucesso;

    if(novoFilmeIdDaSessao && novoSalaIdDaSessao && novaDataInicioDaSessao){
      sucesso = await db(TABLE_SESSOES)
      .where({id: sessaoId})
      .update({
        filmeid: novoFilmeIdDaSessao,
        salaid: novoSalaIdDaSessao,
        datainicio: novaDataInicioDaSessao
      });
    } else {
      res.status(400);
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("sessao não encontrada ou algum outro erro");
    }
  }
  
  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if (isValidNumber(sessaoId)){
    const novoFilmeIdDaSessao = req.body.filmeid;
    const novoSalaIdDaSessao = req.body.salaid;
    const novaDataInicioDaSessao = req.body.datainicio;

    let novosDados = {};

    if (novoFilmeIdDaSessao){
      novosDados.filmeid = novoFilmeIdDaSessao;
    }

    if (novoSalaIdDaSessao){
      novosDados.salaid = novoSalaIdDaSessao;
    }

    if (novaDataInicioDaSessao){
      novosDados.datainicio = novaDataInicioDaSessao;
    }

    let sucesso = await db(TABLE_SESSOES)
      .where({id: sessaoId})
      .update(novosDados);

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("sessao não encontrada ou algum outro erro");
    }
  }
  
  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:sessaoId', async (req, res) => {
  const sessaoId = Number(req.params.sessaoId);

  if(isValidNumber(sessaoId)){
    let sucesso = await db(TABLE_SESSOES).where('id', sessaoId).del();

    if (sucesso){
      return res.sendStatus(200);
    } else {
      res.status(500);
      return res.send("sessao não encontrada ou algum outro erro");
    }
  }

  res.status(400);
  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;
