const Funcionario = require("./funcionario");

class Terceirizado extends Funcionario {
  constructor(id, nome, cpf, dtNasc, salarioBase, descontos, empresa) {
    super(id, nome, cpf, dtNasc, salarioBase, descontos);
    this.empresa = empresa;
  }
}

module.exports = Terceirizado;