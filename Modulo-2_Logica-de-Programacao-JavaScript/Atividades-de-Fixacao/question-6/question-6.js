/**
 * Ler um valor e escrever se é positivo ou negativo (considere o valor
 * zero como positivo). 
 *  
 * Obs: Utilize a interface html para receber os dados do usuário
 */

const elementoNumero = document.getElementById("numero");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let numero;

//Depois eu vejo essa gambiarra, professor..
//Agora é 4:33 da madrugada de segunda
elementoNumero.addEventListener("input", () => {
    inputValue = elementoNumero.value.replace("R$","");
    inputValue = inputValue.replace(" ","");
    inputValue = inputValue.replace(",","");
    inputValue = inputValue.replaceAll(".","");
    
    typedCharIndex = inputValue.length - 1;
    typedChar = inputValue[typedCharIndex];

    if (!isNaN(parseInt(typedChar, 10)) || (typedChar == "-" && typedCharIndex == 0)){
        colocarPontoFlutuante();
        numero = inputValue;
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elementoNumero.value = inputValue.replace(String.fromCharCode(160),"");
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        numero = inputValue;
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
    else if(numero >= 0){
        alert("O número inserido é POSITIVO.");
    }
    else{
        alert("O número inserido é NEGATIVO.");
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
        inputValue = inputValue = "".concat(
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