/**
 * Escreva um algoritimo que leia um vetor Q de 20 posições (aceitar
 * somente números positivos).
 * 
 * Escrever a seguir o valor do maior elemento de Q e a respectiva
 * posição que ele ocupa no vetor. 
 * 
 * Obs: Utilize a interface html para receber os dados do usuário
 */

const elementoValor = document.getElementById("valor");
const elementoValores = document.getElementById("valores");

let valores = [];
let maiorValor;
let contador = 0;
let valor;

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

const salvar = () => {
    if(elementoValor.value == "" || elementoValor.value == "."){
        alert("Por favor, digite um valor.");
        return;
    }
    ++contador;
    if(contador < 20){
        valores.push(valor);
    }
    else{
        valores.push(valor);
        document.getElementById("botao").remove();
        elementoValor.setAttribute("readonly","");
        valor = Math.max.apply(null, valores);
        maiorValor = valor;
        maiorValor = formatarNumero(maiorValor).replace("R$","");
        maiorValor = maiorValor.replace(" ","");
        maiorValor = maiorValor.replace(String.fromCharCode(160),"");
        elementoValores.innerHTML += `
            <p class="text-center fs-2 mt-2">
                O maior valor é: ${maiorValor}, encontrado na posição: ${valores.indexOf(valor)} (contando do zero)
            </p>
        `;
    }
    elementoValor.value = "";
};

elementoValor.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("botao").click();
        elementoValor.value = "";
    }
});

elementoValor.addEventListener("input", () => {
    inputValue = elementoValor.value.replace("R$","");
    inputValue = inputValue.replace(" ","");
    inputValue = inputValue.replace(",","");
    inputValue = inputValue.replaceAll(".","");
    
    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10))){
        colocarPontoFlutuante();
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoValor.value = inputValue.replace(String.fromCharCode(160),"");
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoValor.value = inputValue.replace(String.fromCharCode(160),"");
    }
});

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
        valor = inputValue;
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