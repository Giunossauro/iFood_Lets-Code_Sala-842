/**
 * Ler um valor N e imprimir todos os valores inteiros entre 1 (inclusive)
 * e N (inclusive). Considere que o N será sempre maior que ZERO.
 */

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.

const elementoNumero = document.getElementById("numero");
const elementoResultado = document.getElementById("resultado");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let numero;

elementoNumero.addEventListener("input", () => {
    inputValue = elementoNumero.value
                .replace("R$","")
            .replace(" ","")
        .replace(",","")
    .replaceAll(".","");
    
    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10)) || (typedChar == "-" && typedCharIndex == 0)){
        colocarPontoFlutuante();
        numero = Math.floor(inputValue);
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoNumero.value = inputValue.replace(String.fromCharCode(160),"");
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        numero = Math.floor(inputValue);
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoNumero.value = inputValue.replace(String.fromCharCode(160),"");
    }
});

const calcular = () => {
    if(elementoNumero.value.length < 1 || (elementoNumero.value.length < 2 && elementoNumero.value[0] == "-")){
        alert("Por favor, preencha o campo com um número.");
    }
    else if(numero < 0){
        alert("Por favor, preencha o campo com um número maior que 0.");
    }
    else{
        elementoResultado.innerHTML = "";
        imprimir(numero);
    }
};

const colocarPontoFlutuante = () => {
    if(typedCharIndex == 0 && typedChar != "-"){
        inputValue = "0.0".concat(inputValue);
    }
    else if(typedCharIndex == 0 && typedChar == "-"){
        inputValue = "".concat(inputValue);
    }
    else if(typedCharIndex == 1 && inputValue[0] != "-"){
        inputValue = "0.".concat(inputValue);
    }
    else if(typedCharIndex == 1 && inputValue[0] == "-"){
        inputValue = "-0.0".concat(inputValue[1]);
    }
    else{
        inputValue = "".concat(
            inputValue.slice(0, --typedCharIndex),
            ".",
            inputValue.slice(typedCharIndex)
        );
    }
    
    if(!isNaN(+inputValue) && (typedChar == "-" || typedChar != "-")){
        inputValue = +inputValue;
    }
};

const formatarNumero = (input) => {
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 2,
            style: 'currency',
            currency: "BRL",
            useGrouping: true
        }
    );
};

const imprimir = (valor) => {
    if(valor > 0){
        elementoResultado.innerHTML += `
            <p class="text-center fs-3">
                ${valor}
            </p>
        `;
        imprimir(valor - 1);
    }
};
