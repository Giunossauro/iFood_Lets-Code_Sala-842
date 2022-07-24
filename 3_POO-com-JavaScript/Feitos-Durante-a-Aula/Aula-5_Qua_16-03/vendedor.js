const Contratado = require("./contratado");

class Vendedor extends Contratado {
  vendas;
  totalVendas;

  constructor(
    id,
    nome,
    cpf,
    dtNasc,
    salarioBase,
    descontos,
    beneficios,
    vendas
  ) {
    super(id, nome, cpf, dtNasc, salarioBase, descontos, beneficios);
    this.vendas = vendas;
  }

  mostrarVendas() {
    return this.totalVendas.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
      useGrouping: true,
    });
  }

  calculaTotalVendas() {
    this.totalVendas = this.vendas.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );
  }

  calcularComissao() {
    this.comissão = (this.totalVendas * 0.08).toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
      useGrouping: true,
    });
  }
}

module.exports = Vendedor;