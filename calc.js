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
mainDisplay.textContent = 0;

// Create a variable that stores the display value
let displayNumber;

// Display and Get each number after clicking the correct element
const allDigitButtons = document.querySelectorAll(".operand");
let digitButtonValue = []; // create an array

Array.from(allDigitButtons).forEach((button) => {
  button.addEventListener("click", (e) => {
    // push each clicked number to array
    digitButtonValue.push(e.target.textContent);

    // convert array to number and show on display screen
    mainDisplay.textContent = Number(digitButtonValue.join(""));

    // Limit display to max 10 numbers
    if (mainDisplay.textContent.length > 10) {
      mainDisplay.textContent = mainDisplay.textContent.substring(0,10);
    }

    // Save display number as a variable
    displayNumber = Number(mainDisplay.textContent);
  })
});
