const Terceirizado = require("./terceirizado");

class Vigilante extends Terceirizado {
  constructor(
    id,
    nome,
    cpf,
    dtNasc,
    salarioBase,
    descontos,
    empresa,
    turno,
    horasNoturnas
  ) {
    super(id, nome, cpf, dtNasc, salarioBase, descontos, empresa);
    this.turno = turno;
    this.horasNoturnas = horasNoturnas;
  }
}

module.exports = Vigilante;