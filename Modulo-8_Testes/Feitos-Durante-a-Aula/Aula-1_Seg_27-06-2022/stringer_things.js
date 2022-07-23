// Criar um função que receba uma frase com as palavras separadas por ';'.
// Esta função deve retornar as palavras ordenadas crescentemente unidas pelo ';'

const csvOrdenador = (frase) => {
  const palavras = frase.split(';');
  return palavras.sort();
}

module.exports = csvOrdenador;