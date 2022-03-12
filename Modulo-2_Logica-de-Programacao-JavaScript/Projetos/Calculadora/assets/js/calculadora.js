/**
 * 
 * 
 * 
 */

var hasOperator = false;
var operandValue = 0;
var symbolValue = "";

const inputVisor = (input) => {
    const visorText = visor.innerText;
    if(!visorText.includes(",")){
        if(input == ","){
            visor.innerText = visorText + input;
            return;
        }
        visor.innerText = formatVisor(visorText + input);
    }
    else if(input != ","){
        visor.innerText += input;
    }
};

const inputComma = () => {
    visor.innerText += ",";
};

const percent = () => {
    if(hasOperator){
        visor.innerText = formatVisor(toNumber(visor.innerText) * 0.01);
        return;
    }
    clearEntry();
};

const invertSignal = () => {
    const visorText = visor.innerText;
    if(toNumber(visorText) != 0){
        if(!visorText.includes("-")){
            visor.innerText = "-".concat(visorText);
        }
        else{
            visor.innerText = visorText.slice(1);
        }
    }
};

const backspace = () => {
    const visorText = visor.innerText;
    visor.innerText = formatVisor(
        visorText.substring(0, visorText.length - 1)
    );
};

const squareOf = () => {
    const visorNumber = toNumber(visor.innerText);
    visor.innerText = formatVisor(visorNumber * visorNumber);
};

const squareRootOf = () => {
    const visorNumber = toNumber(visor.innerText);
    visor.innerText = formatVisor(Math.sqrt(visorNumber));
};

const oneOver = () => {
    const visorNumber = toNumber(visor.innerText);
    visor.innerText = formatVisor(1 / visorNumber);
};

const operator = (symbol) => {
    const visorInput = visor.innerText;
    if (!hasOperator){
        if (symbol == "="){
            hasOperator = false;
            operand.innerText = "0";
            visor.innerText = "0";
        }
        else{
            hasOperator = true;
            operand.innerText = visorInput;
            visor.innerText = "0";
            operandValue = toNumber(visorInput);
            symbolValue = symbol;
        }
    }
    else{
        calculationHistory.innerHTML += `
            <span class="ps-1">${formatVisor(operandValue)}</span>
        `;
        switch (symbol != "=" ? symbol : symbolValue) {
            case "+":
                operandValue += toNumber(visorInput);
                break;

            case "-":
                operandValue -= toNumber(visorInput);
                break;

            case "*":
                operandValue *= toNumber(visorInput);
                break;

            case "/":
                operandValue /= toNumber(visorInput);
                break;

            default:
                break;
        }

        calculationHistory.innerHTML += `
            ${symbolValue}
            ${formatVisor(visorInput)}
            =
            <b class="fs-4">${formatVisor(operandValue)}</b>
            <hr class="hr mt-1 mb-1">
        `;

        visor.innerText = "0";

        if (symbol == "="){
            operand.innerText = "0";
            hasOperator = false;
            operandValue = 0;
            symbolValue = "";
        }
        else{
            operand.innerText = formatVisor(operandValue);
            symbolValue = symbol;
        }
    }
};

const clearEntry = () => {
    visor.innerText = "0";
};

const clearAll = () => {
    visor.innerText = "0";
    operand.innerText = "0";
    hasOperator = false;
    operandValue = 0;
    symbolValue = "";
};

const clearHistory = () => {
    calculationHistory.innerHTML = "";
};

const toNumber = (string) => {
    string = string.replaceAll(".","");
    string = +string.replace(",",".");
    return string;
};

const formatVisor = (input) => {
    if (typeof(input) == "string"){
        input = toNumber(input);
    }
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 20,
            style: 'decimal',
            useGrouping: true
        }
    );
};

document.addEventListener("keypress",(event) => {
    const key = event.key;
    if(!isNaN(key) || key == ",") {
        inputVisor(key);
    }
    else if(key == "."){
        inputVisor(",");
    }
    else if(key == "+" || key == "" || key == "*" || key == "/"){
        operator(key);
    }
    else if(key == "Backspace"){
        backspace();
    }
    else if(key == "Enter" || key == "="){
        operator("=");
    }
});

document.addEventListener("keydown",(event) => {
    if(event.key == "Esc" || event.key == "Escape"){
        if (visor.innerText != "0") clearEntry();
        else if(operand.innerText != "0") clearAll();
        else clearHistory();
    }
});