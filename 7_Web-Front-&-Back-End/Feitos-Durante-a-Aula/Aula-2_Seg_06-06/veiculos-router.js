const express = require('express');
const router = express.Router();

let veiculos = [
  'uno',
  'celta',
  'palio',
];

router.get('/', (req, res) => {
  res.send(veiculos);
});

router.get('/:veiculoID', (req, res) => {
  const veiculoID = req.params.veiculoID;
  const veiculoIDNumber = Number(veiculoID);

  if (
    veiculoIDNumber < 0 ||
    veiculoIDNumber >= veiculos.length
  ) {
    res.status(404).send('veiculo não encontrado');
  } else if (Number.isNaN(veiculoIDNumber)) {
    res.status(400).send('id inválido');
  } else {
    const veiculo = veiculos[veiculoIDNumber];
    res.send(veiculo);
  }
});

router.delete('/:veiculoID', (req, res) => {
  const veiculoID = req.params.veiculoID;
  const veiculoIDNumber = Number(veiculoID);

  if (
    veiculoIDNumber < 0 ||
    veiculoIDNumber >= veiculos.length
  ) {
    res.status(404).send('veiculo não encontrado');
  } else if (Number.isNaN(veiculoIDNumber)) {
    res.status(400).send('id inválido');
  } else {
    veiculos = veiculos.filter(_, i => veiculoIDNumber == i);
    res.send(veiculos);
  }
});

router.post('/', (req, res) => {
  const veiculoName = req.body;
  veiculos.push(veiculoName);
  res.status(201).send(veiculoName);
});

router.put('/:veiculoID', (req, res) => {
  const novoNomeDoVeiculo = req.body;
  const {veiculoID} = req.params;
  const veiculoIDNumber = Number(veiculoID);

  veiculos[veiculoIDNumber] = novoNomeDoVeiculo;
  res.send(novoNomeDoVeiculo);
});

module.exports = router;