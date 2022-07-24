/**
 * Faça um algoritmo que leia três notas de um aluno, calcule e escreva a
 * média final deste aluno.
 * 
 * Considerar que a média é ponderada e que o peso das notas é 2, 3 e 5.
 * 
 * Fórmula para o cálculo da média final é: 
 * 
 *      mediaFinal = ((n1 * 2) + (n2 * 3) + (n3 * 5))/10
 */

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.

const elementoNota1 = document.getElementById("nota-1");
const elementoNota2 = document.getElementById("nota-2");
const elementoNota3 = document.getElementById("nota-3");
const elementoNotaFinal = document.getElementById("nota-final");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let nota1;
let nota2;
let nota3;

elementoNota1.addEventListener("input", () => {
    nota1 = validacao(elementoNota1);
});

elementoNota2.addEventListener("input", () => {
    nota2 = validacao(elementoNota2);
});

elementoNota3.addEventListener("input", () => {
    nota3 = validacao(elementoNota3);
});

const calcular = () => {
    if(elementoNota1.value.length < 1 && elementoNota2.value.length < 1 && elementoNota3.value.length < 1){
        alert("Por favor, preencha os campos.");
    }
    else if (elementoNota1.value.length < 1 && elementoNota2.value.length < 1){
        alert("Por favor, preencha os campos das notas 1 e 2.");
    }
    else if(elementoNota2.value.length < 1 && elementoNota3.value.length < 1){
        alert("Por favor, preencha os campos das notas 2 e 3.");
    }
    else if(elementoNota1.value.length < 1 && elementoNota3.value.length < 1){
        alert("Por favor, preencha os campos das notas 1 e 3.");
    }
    else if(elementoNota1.value.length < 1){
        alert("Por favor, preencha o campo da nota 1.");
    }
    else if(elementoNota2.value.length < 1){
        alert("Por favor, preencha o campo da nota 2.");
    }
    else if(elementoNota3.value.length < 1){
        alert("Por favor, preencha o campo da nota 3.");
    }
    else{
        elementoNotaFinal.value = formatarNota(
            ((nota1 * 2) + (nota2 * 3) + (nota3 * 5)) / 10
        );
    }
};

const colocarPontoFlutuante = () => {
    inputValue = inputValue.replace(".","");
    if(typedCharIndex == 0){
        inputValue = "0.".concat(inputValue);
    }
    else if(typedCharIndex == 3 && inputValue[0] == "0"){
        inputValue = "".concat(inputValue.slice(1,2), ".", inputValue.slice(2,inputValue.length));
    }
    else if(typedCharIndex == 3 && inputValue[0] != "0"){
        if(+"".concat(inputValue.slice(0,2), ".", inputValue.slice(2,inputValue.length)) <= 10){
            inputValue = "".concat(inputValue.slice(0,2), ".", inputValue.slice(2,inputValue.length));
        }
        else{
            alert("Digite uma nota menor que 10.");
            inputValue = "".concat(inputValue.slice(0,1), ".", inputValue.slice(2,inputValue.length));
        }
    }
    else if(inputValue == "100" || typedCharIndex == 2){
        inputValue = "10";
    }
    else if(typedCharIndex == 1 && inputValue != "10"){
        inputValue = "0";
    }
    
    if(!isNaN(+inputValue)){
        inputValue = +inputValue;
    }
};

const formatarNota = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 1,
            style: 'decimal',
            useGrouping: true
        }
    );
};

const validacao = (elemento) => {
    if (inputValue == 10 && elemento.value != "10." && elemento.value != "100" && elemento.value != "10,"){
        inputValue = "0.10";
        typedCharIndex = 3;
        typedChar = 0;
    }
    else if (inputValue == 10 && (elemento.value == "10." || elemento.value == "100" || elemento.value == "10,")){
        inputValue = "100";
        typedChar = "0";
        typedCharIndex = 2;
    }
    else if(elemento.value == ""){
        inputValue = inputValue.toString();
        typedCharIndex = 0;
        typedChar = inputValue;
    }
    else{
        inputValue = elemento.value.replace(",",".");
        typedCharIndex = inputValue.length - 1;
        typedChar = inputValue[typedCharIndex];
    }

    if(typedChar == "." && inputValue[1] != "."){
        inputValue = inputValue.replaceAll(".","");
        typedChar = inputValue;
        typedCharIndex = 2;
    }
    else if(typedChar == "." && inputValue[1] == "."){
        inputValue = inputValue.replaceAll(".","");
        typedChar = inputValue[0];
        typedCharIndex = 0;
    }
    else if(typedCharIndex == 1 && typedChar != "0"){
        inputValue = inputValue.replace("0","");
        typedCharIndex = 0;
    }

    if (!isNaN(parseInt(typedChar, 10))){
        colocarPontoFlutuante();
        elemento.value = formatarNota(inputValue);
        return inputValue;
    }
    else{
        inputValue = elemento.value.replace(".",",");
        elemento.value = "".concat(inputValue.slice(0, typedCharIndex--));
        inputValue = +elemento.value.replace(",",".");
        return inputValue;
    }
};