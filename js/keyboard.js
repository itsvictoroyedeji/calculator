// Keyboard support for the calculator!
let keyVersion;

window.addEventListener("keydown", getKeyboardValues);

// Calculator logic for KEYBOARDS!!!
function getKeyboardValues(e) {

  // Get keyboard value from html elements
  keyVersion = document.querySelector(`button[data-key="${e.code}"]`);
  
  if (keyVersion == null) return; // prevents null errors
  keyValue = keyVersion.value;

  console.error(keyValue);

  // Remove operator highlight class if equal button is entered
  if (keyVersion === '=') {
    operatorButtons.forEach((button) => {
      button.classList.remove("click-highlight");
    })
  }

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

    operator = keyValue;
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
    splitOperation = [];
    newCalculation = 0;
    squareRoot = undefined;
    keyVersion = undefined;
  }

  switch(keyValue) {
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
    case 'backspace':
      let getNumber = function() {
        // Resets numbers if a brand new operation starts)
        if (operator === undefined) {
          operation = [];
        };

        // Removes element if Backspace is selected
        if (keyValue === 'backspace') {
          if (displayNumber.length > 1) {
            displayNumber.splice(-1,1);

          } else {
            displayNumber = [];
            // Display 0 on screen after all numbers have been removed
            mainDisplay.textContent = 0;
          }
          
        } else {
        // Add each value to displayNumber array
        displayNumber.push(keyValue);
        }

        // Limit Display Number input to 9 characters
        if (displayNumber.length > 10) {
          displayNumber.splice(-1,1);
        }

        // Don't allow more than one decimal point
        if (decimalCount === 0) {
          if (displayNumber.includes('.')) {
            decimalCount++;
          }
        } else if (decimalCount > 0) {
          if (keyValue === '.') {
            // Cuts off 2nd decimal in array
            displayNumber.splice(-1,1);
          }
        };

        // Store number value in a variable, first!
        numberValue = Number(displayNumber.join(""));

        // Display that value
        mainDisplay.textContent = numberValue;

        // Max length to display = 10. Cut off everything after
        if (displayNumber.join("").length > 10) {
          mainDisplay.textContent = displayNumber.join("").substring(0,10);

          // And Store updated number value in a variable
           numberValue = Number(displayNumber.join("").substring(0,10));
        }
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
        squareRoot = Math.sqrt(newCalculation);
        newCalculation = squareRoot;
        operation = [squareRoot];
        mainDisplay.textContent = Number(operation);

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
          numberValue = Number(operation * 0.01);
          mainDisplay.textContent = Number(numberValue);
          newCalculation = Number(numberValue);
          operation = [numberValue];

          if (mainDisplay.textContent.length > 10) {
            mainDisplay.textContent = Number(mainDisplay.textContent).toFixed(5);
          }
        }
      }

      break;
    
    case 'sign':
      // Code to execute after = is pressed.
      if (operation.length !== 0 && numberValue == 0 ) {
        if (Number(operation) > 0) {
          splitOperation = String(operation).split("");
          splitOperation.unshift("-");
          mainDisplay.textContent = Number(splitOperation.join(""));

          newCalculation = Number(splitOperation.join(""));
          operation = [newCalculation];

        } else if (Number(operation) < 0) {
          splitOperation = String(operation).split("");
          splitOperation.splice(0,1);
          mainDisplay.textContent = Number(splitOperation.join(""));

          newCalculation = Number(splitOperation.join(""));
          operation = [newCalculation];
        }

        if (splitOperation.join("").length > 10) {
          console.error("length1" )
          mainDisplay.textContent = Number(splitOperation.join("")).toFixed(1);
        }

        if (Number(splitOperation.join("")) > 10000000 || Number(splitOperation.join("")) < -10000000) {
          console.error("length2" );
          mainDisplay.textContent = Number(splitOperation.join("")).toExponential(4);
        }

      // Code to execute before = is pressed.
      } else if (numberValue >= 0) {
        // make number negative
      
        displayNumber.unshift("-");
        mainDisplay.textContent = displayNumber.join("");
        numberValue = Number(mainDisplay.textContent);

        if (mainDisplay.textContent.length > 10) {
          // console.log("length1" )
       
          mainDisplay.textContent = Number(displayNumber.join("")).toExponential(5);
         
        }

      } else if (Number(numberValue < 0)) {
        // make number positive
        displayNumber.shift();
        mainDisplay.textContent = displayNumber.join("");
        numberValue = Number(mainDisplay.textContent);

        if (mainDisplay.textContent.length > 10) {
          // console.log("length1" )
      
          mainDisplay.textContent = Number(displayNumber.join("")).toExponential(5);
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