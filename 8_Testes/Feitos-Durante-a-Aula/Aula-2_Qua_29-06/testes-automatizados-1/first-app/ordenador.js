
const ordenar = (palavra) => 
  palavra
    .split(';')
    .sort()
    .join(';')

module.exports = ordenar