const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

function inputDigit(digit) {
    const {displayValue, waitingForSecondOperand} = calculator

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false
    } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
     calculator.displayValue = displayValue === '0'? digit: displayValue+digit
    }

    console.log(calculator);
}  

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false
        return
    }
    // If the `displayValue` property does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  
function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator

    // `parseFloat` converts the string contents of `displayValue`
    // to a floating-point number
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator)
        return
    }
    if (firstOperand === null && !isNaN(inputValue)) {
      // Update the firstOperand property
      calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        //calculator.displayValue = String(result) 
        //To avoid rounding error 0.1 + 0.2 = 0.300000000, 
        //hence fixing number to decimal places
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
 return secondOperand
}
  
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator)
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', event => {
    const { target } = event; // is equivalent to event.target (destructuring)
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        // check if the key is an integer
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });
  
