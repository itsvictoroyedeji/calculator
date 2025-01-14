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