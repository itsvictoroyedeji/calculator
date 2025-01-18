// initialize numbers to operate on
let number1, number2, operator, result;
let operation = [];

// add subtract multiply divide functions (takes account using decimals)
const add = function(...numbers) {
  return numbers.reduce((total, num) => Math.round((total + num) * 1e12) / 1e12, 0)
};

const subtract = function(num1, num2) {
  return Math.round((num1 - num2) * 1e12) / 1e12
};

const multiply = function(...numbers) {
  return numbers.reduce((total, num) => Math.round((total * num) * 1e12) / 1e12, 1)
};

const divide = function(num1, num2) {
  let answer = Math.round((num1 / num2) * 1e12) / 1e12;

// Change numbers divisible by zero to "nope"
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
let decimalPercent;
let percentCount = 0;

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

    if (operation.join("").length > 10) {
      mainDisplay.textContent = operation.join("").substring(0,10);
    }

    // Reduce Big Numbers more than 10 digits
    if (Number(operation.join("")) > 1000000000) {
      mainDisplay.textContent = Number(operation.join("")).toExponential(4);
    }

    operator = e.target.value;
    displayNumber = [];
    decimalCount = 0;
    numberValue = 0;
    percentCount = 0;
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
    percentCount = 0;
    return operate(operator, number1, number2);
  }

  function clearData() {
    operator = undefined;
    count = 0;
    operation = [];
    displayNumber = [];
    numberValue = 0;
    decimalCount = 0;
    decimalPercent = undefined;
    number1 = undefined;
    number2 = undefined;
    result = undefined;
    percentCount = 0;
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

      // run calculation AND store in variable
      newCalculation = calculateNumbers();

      if (mainDisplay.textContent === 'nope!' || mainDisplay.textContent === NaN) {
        clearData();
        break;
      }

      operator = undefined;
      operation = [];
      operation = [newCalculation];

      if (operation.join("").length > 10) {
        mainDisplay.textContent = newCalculation.toFixed(4);
      }

      if (operation.join("").length > 10) {
        mainDisplay.textContent = operation.join("").substring(0,10);
      }

      // Reduce Big Numbers more than 10 digits
      if (newCalculation > 1000000000) {
        mainDisplay.textContent = newCalculation.toExponential(4);
      }

      break;

    case 'clear':
      clearData();
      mainDisplay.textContent = 0;
      break;

    case 'sqroot':
      // Code to execute after = is pressed.
      if (displayNumber.length == 0) {
        newCalculation = Math.sqrt(newCalculation);
        operation = [newCalculation];
        mainDisplay.textContent = operation;

        if (operation.join("").length > 10) {
          mainDisplay.textContent = Number(operation.join("")).toFixed(4);
        }
        
      } else {
      // Code to execute while inputting number
      displayNumber = [];
      displayNumber.push(Math.sqrt(numberValue));

      // Convert display array value to String (to show decimals during input), then DISPLAY on calculator screen
      mainDisplay.textContent = displayNumber.join("");

      // Max length to display = 10. Cut off everything after
      if (mainDisplay.textContent.length > 10) {
        mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
      }

      // Store number value in a variable
      numberValue = Number(mainDisplay.textContent);
      }
      break;

    case 'percent':
      percentCount++;

      if (percentCount < 4) {
        if (operation.length === 0) {
          // Code to execute before any operator (+,-,*,/)
          displayNumber = []
          displayNumber.push((numberValue * 0.01));
  
          mainDisplay.textContent = displayNumber.join("");

          if (mainDisplay.textContent.length > 10) {
            mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
          }

          // Store number value in a variable
          numberValue = Number(mainDisplay.textContent);

        } else if (operator !== undefined) {
          // Code to execute after operator is pushed (+,-,*,/)
          decimalPercent = Number(displayNumber.join("")) * 0.01;

          mainDisplay.textContent = `${displayNumber.join("")}%`;
          
          if (mainDisplay.textContent.length > 9) {
            mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
          }
          // Calculate the percentage of the main number
          numberValue = Number(operation) * decimalPercent;
        } else {
          console.log("hey there!");
          numberValue = Number(operation * 0.01);
          mainDisplay.textContent = Number(numberValue);
          operation = [numberValue];

          if (mainDisplay.textContent.length > 10) {
            mainDisplay.textContent = Number(mainDisplay.textContent).toFixed(5);
          }
        }
      }

      break;

  }
  console.error("decimal count: " + decimalCount)
  console.log(displayNumber);
  console.log("numberValue: " + numberValue);
  console.log(number1);
  console.log(number2);
  console.log(operation);
  console.log("operator: " + operator);
  console.log(mainDisplay.textContent);
  console.log("newCalculation: " + newCalculation);
  console.log("percentCount: "+ percentCount);
 
}

// Final tasks:
// the other 1 buttons (  +/-  works)
// all buttons highlight when clicked (mouse down)
// but all operator buttons stay highlight when clicked (toggle highlight class)
// attach data keys to buttons! for keyboard support


