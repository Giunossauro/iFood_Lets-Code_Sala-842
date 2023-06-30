/* 
 * Obs.: A calculadora FUNCIONA QUE É UMA BELEZA, mas o código ainda
 * está um pouco feio porque ainda não tinha aprendido a
 * aplicar os conceitos da programação funcional.
 */ 

const limitAlert = new bootstrap.Popover(
    visor,
    {
        content: `Números acima de (ou abaixo de -) ${
            (Number.MAX_SAFE_INTEGER).toLocaleString(
                'pt-br',{
                    maximumFractionDigits: 0,
                    maximumSignificantDigits: 21,
                    style: 'decimal',
                    useGrouping: true
                }
            )
        } não são permitidos nesta versão da calculadora.`,
        trigger: "manual"
    }
);

const limitOverflow = new bootstrap.Popover(
    calculationHistory,
    {
        content: `Números acima de (ou abaixo de -) ${
            (Number.MAX_SAFE_INTEGER).toLocaleString(
                'pt-br',{
                    maximumFractionDigits: 0,
                    maximumSignificantDigits: 21,
                    style: 'decimal',
                    useGrouping: true
                }
            )
        } não são permitidos nesta versão da calculadora.`,
        trigger: "manual"
    }
);

let hasOperator = false;
let operandValue = 0;
let symbolValue = "";
let hasTypedValue = false;
let timerStarted = false;

const inputVisor = (input) => {
    const visorText = visor.innerText;

    hasTypedValue = true;
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
    hasTypedValue = true;
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
            visor.innerText = "0";
            operand.innerText = "0";
            operandSymbol.innerText = "";
        }
        else if (hasTypedValue){
            hasOperator = true;
            operand.innerText = visorInput;
            visor.innerText = "0";
            operandValue = toNumber(visorInput);
            operandSymbol.innerText = symbol;
            symbolValue = symbol;
        }
        else{
            operandSymbol.innerText = symbol;
            symbolValue = symbol;
        }
    }
    else if(hasTypedValue || symbol == "="){
        const operandHist =  `
            <span class="ps-1">${formatVisor(operandValue)}</span>
        `;// + calculationHistory.innerHTML;
        switch (symbolValue) {
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

        calculationHistory.innerHTML = `
            ${operandHist}
            ${symbolValue}
            ${formatVisor(visorInput)}
            =
            <b class="fs-4">${formatVisor(operandValue)}</b>
            <hr class="hr mt-1 mb-1">
        ` + calculationHistory.innerHTML;

        visor.innerText = "0";

        if (!Number.isSafeInteger(operandValue.toFixed(0) - 1) && !timerStarted){
            showAlert(limitOverflow);
        }

        if (symbol == "="){
            operand.innerText = "= " + operandValue;
            operandSymbol.innerText = "";
            hasOperator = false;
            operandValue = 0;
            symbolValue = "";
        }
        else{
            operand.innerText = formatVisor(operandValue);
            operandSymbol.innerText = symbol;
            symbolValue = symbol;
        }
    }
    else{
        operandSymbol.innerText = symbol;
        symbolValue = symbol;
    }
    hasTypedValue = false;
};

const clearEntry = () => {
    visor.innerText = "0";
    hasTypedValue = false;
};

const clearAll = () => {
    visor.innerText = "0";
    operand.innerText = "0";
    operandSymbol.innerText = "";
    hasTypedValue = false;
    hasOperator = false;
    operandValue = 0;
    symbolValue = "";
};

const clearHistory = () => {
    calculationHistory.innerHTML = "";
};

const toNumber = (string) => {
    string = (string.replaceAll(".",""));
    string = string.replace(",",".");
    const completeNumber = +string;
    const numberBeforDecimal = +(string.slice(0,string.indexOf(".")));
    if (Number.isSafeInteger(numberBeforDecimal - 1)){
        return completeNumber;
    }
    
    if(!timerStarted){
        showAlert(limitAlert);
    }
    
    return +string.slice(0, string.length - 1);
};

const formatVisor = (input) => {
    if (typeof(input) == "string"){
        input = toNumber(input);
    }
    return input.toLocaleString(
        'pt-br',{
            maximumFractionDigits: 20,
            maximumSignificantDigits: 21,
            style: 'decimal',
            useGrouping: true
        }
    );
};

const showAlert = (popover) => {
    popover.show();
    document.getElementsByClassName("popover-header")[0].innerText = "Peço perdão!";
    timerStarted = true;
    setTimeout(function() {popover.hide(); timerStarted = false;}, 6000);
}

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
    else if(key == "Enter" || key == "="){
        operator("=");
    }
});

document.addEventListener("keydown",(event) => {
    const key = event.key;
    if(key == "Esc" || key == "Escape"){
        if (visor.innerText != "0") clearEntry();
        else if(operand.innerText != "0") clearAll();
        else clearHistory();
    }
    else if(key == "Backspace"){
        backspace();
    }
});

const resizeObserver = new ResizeObserver(entries => {
    const calculatorElement = document.getElementsByTagName("section")[0];
    const tempVisorText = visor.innerText;
    let calculatorWidth;
    visor.innerText = "";
    calculatorElement.setAttribute("style","width:fit-content");
    calculatorWidth = calculatorElement.offsetWidth;
    visor.innerText = tempVisorText;
    calculatorElement.setAttribute("style",`width:${calculatorWidth}px`);
});

resizeObserver.observe(document.body);
