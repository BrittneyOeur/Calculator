let numberStored = "";
let operandSymbol = "";

const regex = /\d+/;
const buttons = document.querySelectorAll("button");
const display = document.querySelector('.number-on-display');

let didEquals = false;
let newInput = false; 

function add(valueA, valueB) {
    return valueA + valueB;
}

function subtract(valueA, valueB) {
    return valueA - valueB;
}

function multiply(valueA, valueB) {
    return valueA * valueB;
}

function modulo(valueA, valueB) {
    return valueA % valueB;
}

function divide(valueA, valueB) {
    return valueA / valueB;
}

// Depending on the operator, it will call an specific function
// that matches the symbol
function operate(operator, valueA, valueB) {
    if (operator == '+') {
        return add(valueA, valueB);
    }

    else if (operator == "-") {
        return subtract(valueA, valueB);
    }

    else if (operator == "*") {
        return multiply(valueA, valueB);
    }

    else if (operator == "%") {
        return modulo(valueA, valueB);
    }

    else if (operator == "/") {
        return divide(valueA, valueB);
    }

    else {
        return null;
    }
}

// Add values into the display
function addValuesDisplay(number) {
    let displayNum = display.textContent;

    // If the display is empty
    if (newInput) {
        newInput = false;
        displayValue(number); // Replace current display value with new input
    } 
    
    // If the display is '0'
    else if (displayNum == 0) {
        displayValue(number); // Replace display if current value is 0
    } 
    
    else {
        if (displayNum.includes('e')) {
            displayNum = Number(displayNum); // Convert exponential notation to number
        }

        displayNum = displayNum + number; // Concatenate new number
        displayValue(displayNum); // Update the display
    }
}

// Display the values
function displayValue(displayNum) {
    // Convert input to string
    displayNum = displayNum.toString(); 

    if (displayNum.length > 13) {
        // Parse input to a float
        displayNum = parseFloat(displayNum); 

        // Convert to exponential notation if too long
        displayNum = displayNum.toExponential(2); 
    }

    // Update the display
    display.textContent = displayNum; 
}

// Clears display
function clearDisplay() {
    display.textContent = 0;
    numberStored = 0;
    operandSymbol = 0;
}

// Computes the operation
function compute(operator) {
    if (!numberStored) {
        numberStored = display.textContent;
    }

    else {
        numberStored = operate(operandSymbol, Number(numberStored), Number(display.textContent));
    }

    operandSymbol = operator;
    newInput = true;
    didEquals = false;
}

// All the buttons get the same behavior, instead of 
// rpeating code for each individual button
buttons.forEach(button => {
    button.addEventListener("click", function () {
        // Get the textContent of the clicked button
        let getInput = this.textContent; 

        if (getInput.match(regex)) {
            if (didEquals) {
                // Display value
                displayValue(getInput); 

                // Reset didEquals
                didEquals = false; 
            } 
            
            else {
                // Add value to display
                addValuesDisplay(getInput); 
            }
        }

        else if (getInput == "DE") {
            // If there's content in the display
            if (display.textContent) {
                display.textContent = display.textContent.slice(0, -1);

                if (!display.textContent) {
                    display.textContent = 0;
                }
            }     
        }

        else if (getInput == "AC") {
            clearDisplay();
        }

        else if (getInput == "=") {
            // If the stored value or the operand symbol does not exist
            if (!numberStored || !operandSymbol) {
                clearDisplay();
            }

            else {
                numberStored = operate(operandSymbol, Number(numberStored), Number(display.textContent));
                operandSymbol = "";
                displayValue(numberStored);
                numberStored = "";
                didEquals = true;
            }
        }

        else if (getInput == ".") {
            if (!display.textContent.includes(".")) {
                display.textContent = display.textContent + ".";  

            }

            else {
                display.textContent = display.textContent;
            }
        }

        // If user clicks an operand
        else {
            compute(getInput);

            // If an different operand is clicked after
            // update current operand to the new one and compute based on that operand
        }
    });
});

