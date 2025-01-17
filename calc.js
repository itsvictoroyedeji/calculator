// initialize numbers to operate on
let number1, number2, operator, result;
let operation = [];

// add subtract multiply divide functions
const add = function(...numbers) {
  return numbers.reduce((total, num) => total + num, 0)
};

const subtract = function(num1, ...numbers) {
  return num1 - numbers.reduce((total, num) => total + num, 0);
};

const multiply = function(...numbers) {
  return numbers.reduce((total, item) => total * item, 1)
};

const divide = function(num1, ...numbers) {
  let answer = num1 / numbers.reduce((total, num) => total + num, 0);

  if (answer === Infinity) {
    answer = "nope!"
  }

  return answer;
}

// Operate on the numbers
const operate = function(operator, num1, num2) {
  switch(operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case 'x':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
  }
 
  return result;
}

// Create a variable for the display, and assign to 0
const mainDisplay = document.getElementById("main-display");

// Display content is 0;
mainDisplay.textContent = 0;

// Create an array that stores the display value
let displayNumber = [];
let numberValue;

// Add Click event to all buttons
const getAllButtonElements = document.querySelectorAll("button");

getAllButtonElements.forEach((button) => {
  button.addEventListener("click", getButtonValues)
});

let count = 0;
let newCalculation;
let decimalCount = 0;

// Calculator logic
function getButtonValues(e) {

  function getCalculation() {
    if (operation.length > 0 && count > 0 && displayNumber.length === 0) {
      operation;
    } else if (operation.length > 0 && count === 1) {
      newCalculation = calculateNumbers();
      operation = [];
      operation = [newCalculation];
    } else if (operation.length === 0 && count === 0) {
      operation.push(numberValue);
    } else {
      operation = [newCalculation]; 
    }

    if (operation.join("").length > 10) {
      mainDisplay.textContent = Number(operation.join("")).toFixed(4);
    }

    operator = e.target.value;
    displayNumber = [];
    decimalCount = 0;
    numberValue = 0;
    count++;
  }

  function calculateNumbers() {
    operation.push(numberValue);
    [number1, number2] = operation;
    mainDisplay.textContent = operate(operator, number1, number2); 
    count = 0;
    numberValue = 0;
    // reset for new equation
    displayNumber = [];
    decimalCount = 0;
    return operate(operator, number1, number2);
  }

  function clearData() {
    operator = undefined;
    count = 0;
    operation = [];
    displayNumber = [];
    numberValue = 0;
    decimalCount = 0;
    number1 = undefined;
    number2 = undefined;
    result = undefined;
  }

  switch(e.target.value) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      let getNumber = function() {
        // Resets numbers if a brand new operation starts)
        if (operator === undefined) {
          operation = [];
        };
        
        // Add each value to displayNumber array
        displayNumber.push(e.target.value);

        // Don't allow more than one decimal point
        if (decimalCount === 0) {
          if (displayNumber.includes('.')) {
            decimalCount++;
          }
        } else if (decimalCount > 0) {
          if (e.target.value === '.') {
            // Cuts off 2nd decimal in array
            displayNumber.splice(-1,1);
          }
        }

        // Convert display array value to String (to show decimals during input), then DISPLAY on calculator screen
        mainDisplay.textContent = displayNumber.join("");

        // Max length to display = 10. Cut off everything after
        if (mainDisplay.textContent.length > 10) {
          mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
        }

        // Store number value in a variable
        numberValue = Number(mainDisplay.textContent);
      };

      getNumber();
      break;

    case '+':
    case '-':
    case 'x':
    case '/':
      getCalculation();
      break;
      
    case '=': 
      if (operator == undefined) {
        break;      
      };

      // run calculation
      newCalculation = calculateNumbers();

      if (mainDisplay.textContent === 'nope!' || mainDisplay.textContent === NaN) {
        clearData();
        break;
      }

      operator = undefined;
      operation = [];
      operation = [newCalculation];

      if (operation.join("").length > 10) {
        mainDisplay.textContent = Number(operation.join("")).toFixed(4);
      }
      break;

    case 'clear':
      clearData();
      mainDisplay.textContent = 0;
      break;
  }
  console.log("decimal count: " + decimalCount)
  console.log(displayNumber);
  console.log(numberValue);
  console.log(number1);
  console.log(number2);
  console.log(operation);
  console.log(operator);
 
}

// Final tasks:
// remove trailing zero from answer (30.2 + 32.4)
// the other 3 buttons (sq root, percentage and +/- all work)
// all buttons highlight when clicked (mouse down)
// but all operator buttons stay highlight when clicked (toggle highlight class)
// attach data keys to buttons! for keyboard support


