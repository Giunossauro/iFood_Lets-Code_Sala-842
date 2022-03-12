/**
 * Escreva um algoritmo para ler o salário mensal atual de um funcionário
 * e o percentual de reajuste. Calcular e escrever o valor do novo salário.
 * 
 * Obs: Utilize a interface html para receber os dados do usuário
 */

const elementoSalario = document.getElementById("salario");
const elementoReajuste = document.getElementById("reajuste");
const elementoSalarioReajustado = document.getElementById("salario-reajustado");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let salario;
let reajuste;

elementoSalario.addEventListener("input", () => {
    inputValue = elementoSalario.value.replace("R$","");
    inputValue = inputValue.replace(" ","");
    inputValue = inputValue.replace(",","");
    inputValue = inputValue.replaceAll(".","");

    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10))){
        colocarPontoFlutuante();
        formatarMoeda(elementoSalario);
        salario = inputValue;
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        formatarMoeda(elementoSalario);
        salario = inputValue;
    }
});

elementoReajuste.addEventListener("input", () => {
    inputValue = elementoReajuste.value.replace("%","");
    valueLength = elementoReajuste.value.length;

    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (isNaN(parseInt(typedChar, 10))){
        elementoReajuste.value = "".concat(inputValue.slice(0, typedCharIndex));
        reajuste = +inputValue;
        elementoReajuste.value += "%";
    }
    else{
        reajuste = +inputValue;
        elementoReajuste.value = inputValue.concat("%");
    }
});

const reajustar = () => {
    inputValue = salario + (salario * (reajuste / 100));
    if(elementoSalario.value.length < 4 && elementoReajuste.value.length < 2){
        alert("Por favor, preencha os campos.");
    }
    else if (elementoSalario.value.length < 4){
        alert("Por favor, preencha o valor do salário.");
    }
    else if(elementoReajuste.value.length < 2){
        alert("Por favor, preencha o valor do reajuste.");
    }
    else{
        formatarMoeda(elementoSalarioReajustado);
    }
};

const formatarMoeda = (elemento) => {
    elemento.value = inputValue.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL',
            useGrouping: true
        }
    );
};

const colocarPontoFlutuante = () => {
    if(typedCharIndex == 0){
        inputValue = "0.0".concat(inputValue);
    }
    else if(typedCharIndex == 1){
        inputValue = "0.".concat(inputValue);
    }
    else{
        inputValue = inputValue = "".concat(
            inputValue.slice(0, --typedCharIndex),
            ".",
            inputValue.slice(typedCharIndex)
        );
    }
    
    if(!isNaN(+inputValue)){
        inputValue = +inputValue;
    }
};