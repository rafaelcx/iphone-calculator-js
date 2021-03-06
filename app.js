// ========================================================================
// DOM elements
// ========================================================================

let valueStrInMemory = null;
let operatorInMemory = null;

let valueFontSize = 130;

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
];

// ========================================================================
// Functions
// ========================================================================

const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => parseFloat(getValueAsStr());

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');

    let valueCharSize;
    if (decimalStr) {
        valueCharSize = wholeNumStr.length + decimalStr.length + 1;
    } else {
        valueCharSize = wholeNumStr.length;

    }

    valueFontSize -= (valueCharSize * 5.7);
    valueEl.style.fontSize = valueFontSize.toString() + 'px';
    valueFontSize = 130;

    decimalStr
        ? valueEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr
        : valueEl.textContent = parseFloat(valueStr).toLocaleString();
};

const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;

    if (operatorInMemory === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (operatorInMemory === 'subtraction') {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (operatorInMemory === 'multiplication') {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (operatorInMemory === 'division') {
        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }

    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
};

const handleNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    currentValueStr === '0'
        ? setStrAsValue(numStr)
        : setStrAsValue(currentValueStr + numStr);
}

// ========================================================================
// Event listeners to functions
// ========================================================================

acEl.addEventListener('click', () => {
    valueFontSize = 130;
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if (currentValueNum === 0) {
        return;
    }

    currentValueNum > 0
        ? setStrAsValue('-' + currentValueStr)
        : setStrAsValue(currentValueStr.substring(1));
});

// ========================================================================
// Event listeners to operations
// ========================================================================

additionEl.addEventListener('click', () => {
    valueFontSize = 130;
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    valueFontSize = 130;
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    valueFontSize = 130;
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    valueFontSize = 130;
    handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr())
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// ========================================================================
// Event listeners to numbers and decimal
// ========================================================================

percentEl.addEventListener('click', () => {
    const currentValueNumber = getValueAsNum();
    const newValueNum = currentValueNumber / 100;
    valueFontSize = 130;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;

});

for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click', () => {
    const currentValueAsStr = getValueAsStr();
    if (!currentValueAsStr.includes('.')) {
        setStrAsValue(currentValueAsStr + '.');
    }
});

// ========================================================================
// Setting up the iPhone clock
// ========================================================================

const updateTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();
