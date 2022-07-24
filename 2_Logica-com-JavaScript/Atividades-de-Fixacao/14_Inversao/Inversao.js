/**
 * Faça um algoritmo para ler 20 números e armazenar em um vetor. Após a
 * leitura total dos 20 números, o algoritmo deve escrever esses
 * 20 números lidos na ordem inversa.
 */

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.

const elementoValor = document.getElementById("valor");
const elementoValores = document.getElementById("valores");

let valores = [];
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

        for(let index = 0; index < 20; index++){
            valor = valores.pop();
            valor = formatarNumero(valor).replace("R$","");
            valor = valor.replace(" ","");
            valor = valor.replace(String.fromCharCode(160),"");
            elementoValores.innerHTML += `
                <p class="text-center fs-2 mt-2">
                    ${valor}
                </p>
            `;
        }
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
    inputValue = elementoValor.value
                .replace("R$","")
            .replace(" ","")
        .replace(",","")
    .replaceAll(".","");
    
    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10)) || (typedChar == "-" && typedCharIndex == 0)){
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