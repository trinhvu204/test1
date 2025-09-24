// Dự liệu đang nhập
let currentInput = '0';
// Dữ liệu trước khi ấn =
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;
let history = [];
// hiển thị toàn bộ biểu thức
let fullExpression = '';

const display = document.getElementById('display');
const history_panner = document.getElementById('history_panner');
const historyList = document.getElementById('historyList');

function updateDisplay() {
    if (fullExpression) {
        display.textContent = fullExpression;
    }
    else {
        display.textContent = currentInput;
    }
}
// Nhập số
function inputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
        fullExpression = '';
    }
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += num;
    }
    if (previousInput && operator) {
        const operatorSymbol = operator === '*' ? '×' : operator;
        fullExpression = `${previousInput} ${operatorSymbol} ${currentInput}`;
    } else {
        fullExpression = '';
    }
    updateDisplay();
}
// Nhập toán tử
function inputOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;

    const operatorSymbol = op === '*' ? '×' : op;
    fullExpression = `${previousInput} ${operatorSymbol} `;
    updateDisplay();
}
function calculate() {
    if (!operator || shouldResetDisplay) return;

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert("kho dc chia cho 0");
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    const operatorSymbol = operator === '*' ? '×' : operator;
    const calculation = `${previousInput} ${operatorSymbol} ${currentInput} = ${result}`;
    history.unshift(calculation);
    if (history.length > 50) {
        history.pop();
    }
    currentInput = result.toString();
    operator = '';
    shouldResetDisplay = true;
    fullExpression = '';
    updateDisplay();
    updateHistoryDisplay();
}
function clearDisplay() {
    currentInput = '0';
    fullExpression = '';
    updateDisplay();
}
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    fullExpression = '';
    updateDisplay();
}
function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    fullExpression = '';
    updateDisplay();
}
function toggleHistory() {
    history_panner.classList.toggle('show');
    updateHistoryDisplay();
}
function updateHistoryDisplay() {
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-item">No history available</div>';
    } else {
        historyList.innerHTML = history.map(item =>
            `<div class="history-item">${item}</div>`).join('');
    }
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        inputNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
updateDisplay();
updateHistoryDisplay();