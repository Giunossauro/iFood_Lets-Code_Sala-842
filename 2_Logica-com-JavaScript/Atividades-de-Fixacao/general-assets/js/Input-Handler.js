const inputHandler = (input, range) => {
    const inputValue = input.toString();
    const inputType = typeof input;
    let valueString;
    let dotIndex;
    if (inputType == "string") {
        valueString = inputValue
                    .replace("R$", "")
                .replace(" ", "")
            .replaceAll(",", "")
        .replaceAll(".", "");
    } else {
        valueString = inputValue.replace('.','');
        dotIndex = inputValue.indexOf('.');
    } 
    const lastCharIndex = valueString.length - 1;
    const lastChar = valueString[lastCharIndex];
    let newValue;

    if (!isNaN(parseInt(lastChar, 10))) {
        newValue = aplicarDecimal(dotIndex, lastCharIndex, valueString, typeof input, range);
    } else {
        const oldValueString = "".concat(valueString.slice(0, lastCharIndex));
        newValue = aplicarDecimal(dotIndex, lastCharIndex - 1, oldValueString, typeof input, range);
    }

    return [formatarMoeda(newValue, range), newValue]
}
    
const aplicarDecimal = (dotIndex, lastCharIndex, value, inputType, range) => {
    let result;

    if (dotIndex > 0) {
        result = value.slice(0,dotIndex).concat('.',value.slice(dotIndex,value.length)) 
    } else if (lastCharIndex == 0 && range == 2) {
        result = "0.0".concat(value);
    }
    else if (lastCharIndex == 1 && (range == 1 || range == 2)) {
        result = "0.".concat(value);
    }
    else if (range != 0) {
        if (inputType == "number") {
            result = value;
        } else {
            result = "".concat(
                value.slice(0, lastCharIndex - 1),
                ".",
                value.slice(lastCharIndex - 1)
            );
        }
    } else {
        result = value;
    }

    const resultNumberfied = Number(result);

    if (!isNaN(resultNumberfied)) {
        return resultNumberfied;
    }

    return result;
};

const formatarMoeda = (value, range) => {
    return value.toLocaleString(
        'pt-br', {
            maximumFractionDigits: range,
            style: 'currency',
            currency: 'BRL',
            useGrouping: true
        }
    );
};
