/**
 * Ler dois valores (considere que não serão lidos valores iguais) e
 * escrever o maior deles.
 */

// Não tem como não ler valores iguais porque é necessario ler para saber se
//são iguais...

// Por favor, me perdoe pelas gambiarras.
// Está funcionando e vou refatorar num momento oportuno!
// Os exercícios 2 e 3 estão refatorados.
 
const elementoNumero1 = document.getElementById("numero-1");
const elementoNumero2 = document.getElementById("numero-2");

let typedCharIndex;
let inputValue;
let typedChar;
let valueLength;

let numero1;
let numero2;

elementoNumero1.addEventListener("input", () => {
    validar(elementoNumero1);
    numero1 = +elementoNumero1.value.replace(",",".");
});

elementoNumero2.addEventListener("input", () => {
    validar(elementoNumero2);
    numero2 = +elementoNumero2.value.replace(",",".");
});

const validar = (elemento) => {
    inputValue = elemento.value
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
        elemento.value = inputValue.replace(String.fromCharCode(160),"");
    }
    else{
        inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
        colocarPontoFlutuante();
        inputValue = formatarNumero(inputValue);

        inputValue = inputValue.replace("R$","");
        inputValue = inputValue.replace(" ","");
        elemento.value = inputValue.replace(String.fromCharCode(160),"");
    }
};

const calcular = () => {
    if((elementoNumero1.value.length < 1 || (elementoNumero1.value.length < 2 && elementoNumero1.value[0] == "-")) && (elementoNumero2.value.length < 1 || (elementoNumero2.value.length < 2 && elementoNumero2.value[0] == "-"))){
        alert("Por favor, preencha o primeiro campo com um número.");
    }
    else if(elementoNumero1.value.length < 1 || (elementoNumero1.value.length < 2 && elementoNumero1.value[0] == "-")){
        alert("Por favor, preencha o primeiro campo com um número.");
    }
    else if(elementoNumero2.value.length < 1 || (elementoNumero2.value.length < 2 && elementoNumero2.value[0] == "-")){
        alert("Por favor, preencha o primeiro campo com um número.");
    }
    else if(numero1 == numero2){
        alert("Os números são iguais! Por favor, corrija os valores");
    }
    else if(numero1 > numero2){
        alert("O número 1 é maior que o número 2.");
    }
    else{
        alert("O número 2 é maior que o número 1.");
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