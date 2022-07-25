const express = require('express');
const app = express();
const filmesRouter = require('./filmes');
const salasRouter = require('./salas');
const sessoesRouter = require('./sessoes');
const categoriasRouter = require('./categorias');

app.use(express.text());
app.use(express.json());

app.use('/filmes', filmesRouter);
app.use('/salas', salasRouter);
app.use('/sessoes', sessoesRouter);
app.use('/categorias', categoriasRouter);

app.use('*', (req, res) => {
  res.send('não há mapeamento para essa rota!');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`servidor disponível em http://localhost:${PORT}`);
});