/**
 * Escreva um algoritmo para ler o salário mensal atual de um funcionário
 * e o percentual de reajuste. Calcular e escrever o valor do novo salário.
 */

const elementoSalario = document.getElementById("salario");
const elementoReajuste = document.getElementById("reajuste");

elementoSalario.addEventListener("input", (event) => {
    elementoSalario.value = inputHandler(event.target.value)[0];
});

elementoReajuste.addEventListener("input", (event) => {
    const inputValue = event.target.value.replace("%", "");
    const typedCharIndex = inputValue.length - 1;
    const typedChar = inputValue[typedCharIndex];

    if (isNaN(parseInt(typedChar, 10))) {
        elementoReajuste.value = "".concat(inputValue.slice(0, typedCharIndex), "%");
    } else {
        elementoReajuste.value = inputValue.concat("%");
    }
});

const reajustar = (salarioValue, reajusteValue) => {
    const salario = inputHandler(salarioValue)[1]
    const reajuste = Number(reajusteValue.replace('%', ''));
    const salarioReajustado = salario + (salario * (reajuste / 100));

    if (salarioValue.length < 4 && reajusteValue.length < 2) {
        alert("Por favor, preencha os campos.");
    } else if (salarioValue.length < 4) {
        alert("Por favor, preencha o valor do salário.");
    } else if (reajusteValue.length < 2) {
        alert("Por favor, preencha o valor do reajuste.");
    } else {
        document.getElementById("salario-reajustado").value = formatarMoeda(salarioReajustado);
    }
};
