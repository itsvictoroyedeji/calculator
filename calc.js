// initialize numbers to operate on
let number1, number2, operator, result;

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
const operate = function (operator, num1, num2) {
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
      alert("Add +, -, x, or /");
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

// Calculator logic
function getButtonValues(e) {
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
      // Add each value to displayNumber array
      displayNumber.push(e.target.value);

      // Convert array value to number, then DISPLAY on calculator screen
      mainDisplay.textContent = Number(displayNumber.join(""));

      // Max length to display = 10
      if (mainDisplay.textContent.length > 10) {
        mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
      }

      // Save value in a variable
      numberValue = Number(mainDisplay.textContent);
      break;

  }
  console.log(numberValue);
}

