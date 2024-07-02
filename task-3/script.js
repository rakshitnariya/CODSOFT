const operationDisplay = document.getElementById('operation');
const resultDisplay = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operator = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const { number, operator: op } = button.dataset;
        if (number !== undefined) {
            appendNumber(number);
        } else if (op !== undefined) {
            chooseOperator(op);
        } else if (button.id === 'equals') {
            calculate();
        } else if (button.id === 'clear') {
            clear();
        } else if (button.id === 'delete') {
            deleteLast();
        } else if (button.id === 'negate') {
            negate();
        }
    });
});

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function negate() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function updateDisplay() {
    operationDisplay.textContent = `${previousInput} ${operator || ''} ${currentInput}`;
    resultDisplay.textContent = currentInput;
}
