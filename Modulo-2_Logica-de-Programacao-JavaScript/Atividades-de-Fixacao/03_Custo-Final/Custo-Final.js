/**
 * O custo de um carro novo ao consumidor é a soma do custo de fábrica com
 * a porcentagem do distribuidor e dos impostos (aplicados ao custo de
 * fábrica).
 * 
 * Supondo que o percentual do distribuidor seja de 28% e os impostos
 * de 45%, escrever um algoritmo para ler o custo de fábrica de um carro, 
 * calcular e escrever o custo final ao consumidor.
 */

const TAXAS = 0.73;

const elementoCusto = document.getElementById("custo");
const elementoCustoFinal = document.getElementById("custo-final");

elementoCusto.addEventListener("input", (event) => {
    elementoCusto.value = inputHandler(event.target.value, 2)[0];
});

const reajustar = (value) => {
    if (value.length < 4){
        alert("Por favor, preencha o custo de fábrica do carro.");
    }
    else{
        const custo = inputHandler(value, 2)[1];
        const custoFinal = (custo + (custo * TAXAS));
        elementoCustoFinal.value = inputHandler(custoFinal, 2)[0];
    }
};
