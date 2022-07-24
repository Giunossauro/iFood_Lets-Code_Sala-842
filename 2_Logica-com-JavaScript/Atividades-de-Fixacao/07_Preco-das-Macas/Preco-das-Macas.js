/**
 *  As maçãs custam R$ 1,30 cada se forem compradas menos de uma dúzia,
 * e R$ 1,00 se forem compradas pelo menos 12.
 * 
 * Escreva um programa que leia o número de maçãs compradas, calcule e
 * escreva o custo total da compra.
 */

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.

const elementoNumero = document.getElementById("numero");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let numero;

elementoNumero.addEventListener("input", () => {
    inputValue = elementoNumero.value.replace("R$","");
    inputValue = inputValue.replace(" ","");
    
    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10))){
        numero = +inputValue;
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoNumero.value = inputValue.replace(String.fromCharCode(160),"");
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        numero = +inputValue;
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoNumero.value = inputValue.replace(String.fromCharCode(160),"");
    }
});

const calcular = () => {
    if(elementoNumero.value.length < 1){
        alert("Por favor, preencha o campo com um número.");
    }
    else if(numero > 11){
        alert("Hmm... Essas maçãs vão custar: R$ ".concat(formatarPreco(numero),"!"));
    }
    else{
        alert("Hmm... Essas maçãs vão custar: R$ ".concat(formatarPreco(numero * 1.3),"!"));
    }
};

const formatarNumero = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 0,
            style: 'currency',
            currency: "BRL",
            useGrouping: true
        }
    );
};

const formatarPreco = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 2,
            style: 'currency',
            currency: "BRL",
            useGrouping: true
        }
    );
};