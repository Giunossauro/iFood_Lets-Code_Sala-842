/**
 * A jornada de trabalho semanal de um funcionário é de 40 horas.
 * O funcionário que trabalhar mais de 40 horas receberá hora extra, 
 * cujo cálculo é o valor da hora regular com um acréscimo de 50%.
 * 
 * Escreva um algoritmo que leia o número de horas trabalhadas em um mês, 
 * o salário por hora e escreva o salário total do funcionário, que deverá
 * ser acrescido das horas extras, caso tenham sido trabalhadas 
 * (considere que o mês possua 4 semanas exatas).
 */

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.

const elementoHoras1 = document.getElementById("horas-1");
const elementoHoras2 = document.getElementById("horas-2");
const elementoHoras3 = document.getElementById("horas-3");
const elementoHoras4 = document.getElementById("horas-4");
const elementoSalarioHora = document.getElementById("salario-hora");
const elementoSalarioTotal = document.getElementById("salario-total");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let horas1;
let horas2;
let horas3;
let horas4;
let salarioHora;
let salarioTotal = 0;

elementoHoras1.addEventListener("input", () => {
    horas1 = validar(elementoHoras1);
    elementoHoras1.value = horas1;
    horas1 = +horas1;
});

elementoHoras2.addEventListener("input", () => {
    horas2 = validar(elementoHoras2);
    elementoHoras2.value = horas2;
    horas2 = +horas2;
});

elementoHoras3.addEventListener("input", () => {
    horas3 = validar(elementoHoras3);
    elementoHoras3.value = horas3;
    horas3 = +horas3;
});

elementoHoras4.addEventListener("input", () => {
    horas4 = validar(elementoHoras4);
    elementoHoras4.value = horas4;
    horas4 = +horas4;
});

elementoSalarioHora.addEventListener("input", () => {
    salarioHora = +validar(elementoSalarioHora);
});

const calcular = () => {
    if(!elementoHoras1.value || !elementoHoras2.value || !elementoHoras3.value || !elementoHoras4.value || !elementoSalarioHora.value){
        alert("Por favor, preencha todos os campos.");
    }
    else{
        salarioTotal += (horas1 * salarioHora) + (horas2 * salarioHora) + (horas3 * salarioHora) + (horas4 * salarioHora);
        if (horas1 > 40){
            salarioTotal += ((horas1 - 40) * (salarioHora * 0.5));
        }
        if (horas2 > 40){
            salarioTotal += ((horas2 - 40) * (salarioHora * 0.5));
        }
        if (horas3 > 40){
            salarioTotal += ((horas3 - 40) * (salarioHora * 0.5));
        }
        if (horas4 > 40){
            salarioTotal += ((horas4 - 40) * (salarioHora * 0.5));
        }
        elementoSalarioTotal.value = salarioTotal;
        salarioTotal = 0;
    }
};

const validar = (elemento) =>{
    inputValue = elemento.value
                .replace("R$","")
            .replace(" ","")
        .replace(",","")
    .replaceAll(".","");

    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if(typedChar == "0" && typedCharIndex == 0){
        typedChar = "a";
    }

    if (!isNaN(parseInt(typedChar, 10))){
        if(elemento.id == "salario-hora"){
            colocarPontoFlutuante();
            elemento.value = formatarMoeda(inputValue);
            return inputValue;
        }
        formatarHora(inputValue);
        return inputValue;
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        if(elemento.id == "salario-hora"){
            colocarPontoFlutuante();
            elemento.value = formatarMoeda(inputValue);
            return inputValue;
        }
        formatarHora(inputValue);
        return inputValue;
    }
};

const formatarHora = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 0,
            style: 'currency',
            currency: "BRL",
            useGrouping: true
        }
    );
};

const formatarMoeda = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 2,
            style: 'currency',
            currency: "BRL",
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
        inputValue = "".concat(
            inputValue.slice(0, --typedCharIndex),
            ".",
            inputValue.slice(typedCharIndex)
        );
    }
    
    if(!isNaN(+inputValue)){
        inputValue = +inputValue;
    }
};