const Contratado = require("./contratado");

class Estagiario extends Contratado {
  constructor(
    id,
    nome,
    cpf,
    dtNasc,
    salarioBase,
    descontos,
    beneficios,
    cargaHoraria
  ) {
    super(id, nome, cpf, dtNasc, salarioBase, descontos, beneficios);
    this.cargaHoraria = cargaHoraria;
  }
 
  fazerCafe() {
    console.log("Um cafezinho saindo, quem quer?");
  }
}

module.exports = Estagiario;