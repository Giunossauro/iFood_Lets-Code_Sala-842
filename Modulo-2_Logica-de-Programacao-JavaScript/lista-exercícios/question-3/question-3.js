/**
 * O custo de um carro novo ao consumidor é a soma do custo de fábrica com
 * a porcentagem do distribuidor e dos impostos (aplicados ao custo de
 * fábrica). 
 * Supondo que o percentual do distribuidor seja de 28% e os impostos
 * de 45%, escrever um algoritmo para ler o custo de fábrica de um carro, 
 * calcular e escrever o custo final ao consumidor. 
 * 
 * Obs: Utilize a interface html para receber os dados do usuário
 */

const TAXAS = 0.73;

const elementoCusto = document.getElementById("custo");
const elementoCustoFinal = document.getElementById("custo-final");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let custo;

elementoCusto.addEventListener("input", () => {
    inputValue = elementoCusto.value.replace("R$","");
    inputValue = inputValue.replace(" ","");
    inputValue = inputValue.replace(",","");
    inputValue = inputValue.replaceAll(".","");

    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10))){
        colocarPontoFlutuante();
        formatarMoeda(elementoCusto);
        custo = inputValue;
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        formatarMoeda(elementoCusto);
        custo = inputValue;
    }
});

const reajustar = () => {
    inputValue = custo + (custo * TAXAS);
    if (elementoCusto.value.length < 4){
        alert("Por favor, preencha o custo de fábrica do carro.");
    }
    else{
        formatarMoeda(elementoCustoFinal);
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