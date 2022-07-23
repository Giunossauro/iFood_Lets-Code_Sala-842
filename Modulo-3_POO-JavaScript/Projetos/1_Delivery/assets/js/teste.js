const teste = function(endereco1, endereco2) {
  return JSON.stringify(endereco1) === JSON.stringify(endereco2)
}

const printTeste = teste()