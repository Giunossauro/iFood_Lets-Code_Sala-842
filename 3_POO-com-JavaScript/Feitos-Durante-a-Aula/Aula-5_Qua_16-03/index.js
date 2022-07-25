const BeneficioFolha = require("./beneficio-folha");
const DescontoFolha = require("./desconto-folha");
const Estagiario = require("./estagiario");
const Vendedor = require("./vendedor");
const Vigilante = require("./vigilante");

// Descontos
const inss = new DescontoFolha("INSS", 11);
const alimentacao = new DescontoFolha("Alimentação", 3);
const transporte = new DescontoFolha("Transporte", 6);
const planoSaude = new DescontoFolha("Plano de saúde", 9);
 
// Benefícios
const plr = new BeneficioFolha("PLR", 18000);
const gympass = new BeneficioFolha("Gympass", 50);
const alelo = new BeneficioFolha("Alimentação", 500);
const transporteBeneficio = new BeneficioFolha("Alimentação", 500);

const vendedor = new Vendedor(
  1,
  "Fulano de Tal",
  "01234567890",
  "1988-15-26",
  2500,
  [],
  [],
  [2500, 6000, 500, 12899]
);

const vigilante = new Vigilante(
  2,
  "Marcelo Alves",
  "15935714785",
  "1989-12-24",
  1800,
  [],
  "VigSeg Segurança Patrimonial",
  "12/36",
  45
);

console.log("==== VENDEDOR ====");
vendedor.adicionarDesconto(inss);
vendedor.adicionarDesconto(alimentacao);
vendedor.adicionarDesconto(planoSaude);
vendedor.adicionaBeneficio(plr);
vendedor.adicionaBeneficio(gympass);
vendedor.adicionaBeneficio(alelo);
vendedor.calcularSalario();
vendedor.calcularFerias();
vendedor.calculaTotalVendas();
vendedor.calcularComissao();
console.log("Salário do vendedor:", vendedor.salario);
console.log("Férias do vendedor:", vendedor.ferias);
console.log("Total de vendas:", vendedor.mostrarVendas());
console.log("Comissão total:", vendedor.comissão);

console.log("=========================================================");

console.log("==== VIGILANTE ====");
vigilante.adicionarDesconto(inss);
vigilante.adicionarDesconto(alimentacao);
vigilante.adicionarDesconto(planoSaude);
vigilante.adicionarDesconto(transporte);
vigilante.calcularSalario();
vigilante.calcularFerias();
console.log("Salário do vigilante:", vigilante.salario);
console.log("Férias do vigilante:", vigilante.ferias);

console.log("=========================================================");

console.log("==== ESTAGIÁRIO ====");
const estagiario = new Estagiario(
  3,
  "Manuel de Souza",
  "14725896332",
  "2000-06-26",
  460,
  [],
  [transporteBeneficio],
  20
);
estagiario.calcularSalario();
console.log("Salário do estagiário: ", estagiario.salario);