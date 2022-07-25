const BeneficioFolha = require("./beneficio-folha");
const Funcionario = require("./funcionario");

class Contratado extends Funcionario {
  #beneficios;
  constructor(id, nome, cpf, dtNasc, salarioBase, descontos, beneficios) {
    super(id, nome, cpf, dtNasc, salarioBase, descontos);
    this.#beneficios = beneficios;
  } 

  adicionaBeneficio(beneficio) {
    if (beneficio instanceof BeneficioFolha) {
      this.#beneficios.push(beneficio);
    }
  }

  #calcularBeneficiosTotal() {
    return this.#beneficios.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual.valor,
      0
    );
  }

  get salario() {
    const salario = super.calcularSalario();
    return salario + this.#calcularBeneficiosTotal();
  }
}

module.exports = Contratado;