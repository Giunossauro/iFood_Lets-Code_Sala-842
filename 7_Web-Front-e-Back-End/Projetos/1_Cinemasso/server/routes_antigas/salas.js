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

  res.send(await
    db(TABLE_SALAS)
    .orderBy(orderBy, orderType)
    .limit(limit ? limit : Number.MAX_SAFE_INTEGER)
    .offset(offset ? offset : 0)
    //queryGet(null, orderBy, orderType, limit, offset)
  );
});

router.get('/:salaId', async (req, res) => {
  if (isValidNumber(req.query.salaId)){
    return res.send(await db(TABLE_SALAS).where({id: Number(req.params.salaId)}));
    // res.send(queryGet(salaId));
  }

  res.send(`${req.query.salaId} não é um id valido. Favor informar um id válido`);
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

    return res.send(sucesso ? "POST realizado com sucesso" : "algo errado aconteceu");
  }

  res.send("Favor informar nome e capacidade para adicionar uma sala.");
});

router.put('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if (isValidNumber(req.query.salaId)){
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
      return res.send("para realizar o PUT, são necessários todos os dados");
    }

    return res.send(sucesso ? "PUT realizado com sucesso" : "filme não encontrado");
  }

  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.patch('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if (isValidNumber(req.query.salaId)){
    const novoNomeDaSala = req.body.nome;
    const novaCapacidadeDaSala = req.body.capacidade;

    let props = {};

    if (novoNomeDaSala){
      props.nome = novoNomeDaSala;
    }

    if (novaCapacidadeDaSala){
      props.capacidade = novaCapacidadeDaSala;
    }

    let sucesso = await db(TABLE_SALAS)
      .where({id: salaId})
      .update(props/* {
        nome: novoNomeDaSala,
        capacidade: novaCapacidadeDaSala
      } */);

    return res.send(sucesso ? "PATCH realizado com sucesso" : "filme não encontrado");
  }

  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

router.delete('/:salaId', async (req, res) => {
  const salaId = Number(req.params.salaId);

  if(isValidNumber(salaId)){
    let sucesso = await db(TABLE_SALAS).where('id', salaId).del();

    await db.raw(`ALTER TABLE filmes ALTER COLUMN id RESTART WITH ${salaId}`);
    return res.send(sucesso ? "DELETE realizado com sucesso" : "filme não encontrado");
  }

  res.send("Id inválido! Um id válido precisa ser um número maior que 1.");
});

module.exports = router;