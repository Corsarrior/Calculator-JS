
const addButton = document.querySelector(".add");
const substractButton = document.querySelector(".substract");
const multiplyButton = document.querySelector(".multiply");
const divideButton = document.querySelector(".divide");
const displayOperation = document.querySelector(".display-operation");
const displayResults = document.querySelector(".display-results");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll(".operator");

let value1 = 0;
let operator = "";
let isOperation = false;
let resetDisplay = false;
displayResults.valueAsNumber = 0;

addButton.addEventListener("click", add);
substractButton.addEventListener("click", substract);
multiplyButton.addEventListener("click", multiply);
divideButton.addEventListener("click", divide);
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", equalsTo);

function clear(){
    displayResults.valueAsNumber = 0;
    displayOperation.textContent = "";
    value1 = 0;
    isOperation = false;
}

function add(a, b){
    return a + b;
}
function substract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function updateDisplay(){
    // Each time that you press a button, its data-number value should be added to an variable and
    // added to the display.
    if (resetDisplay){
        displayResults.valueAsNumber = this.dataset.number;
    }
    else{
        displayResults.valueAsNumber = displayResults.valueAsNumber + this.dataset.number;
    }
    resetDisplay = false;
}

function saveValues(){
    // Function that save the value selected for the user in the display results and the operator
    // used. If there is already and operator, the operator button works as and equal operation, first will
    // resolve the previous operation and then put the new operator to the result.
    
    if(isOperation)
    {
        let value2 = displayResults.valueAsNumber;
        console.log({value2});
        value1 = operate(operator, value1, value2);
        if(value1 === Infinity){
            alert("You can't divide by 0")
            value1 = 0;
            return
        }
        if ((value1 % 1) > 0)
        {
            // is decimal
            value1 = value1.toFixed(5);
            console.log("its decimal");
        }
        let displayResultsValue = value1.toString();
        displayResults.valueAsNumber = value1; 
        operator = this.textContent;
        isOperation = true;
        displayOperation.textContent = displayResultsValue.concat(operator);
        resetDisplay = true;
        console.log("condition 1");
    }
    
    else {
        // If there is not an operator in the operation display, We just need add the results value,
        // the operator selected and add to value 1 the results value.
        operator = this.textContent;
        value1 = displayResults.valueAsNumber;
        let displayResultsValue = displayResults.valueAsNumber.toString();
        displayOperation.textContent = displayResultsValue.concat(operator);
        displayResults.valueAsNumber = ""; 
        isOperation = true;
        console.log("condition 2");
    }
    
    console.log({value1});

}

function equalsTo(){

    if(isOperation){
        let value2 = displayResults.valueAsNumber;
        console.log("equals to");
        console.log({value1});
        console.log({value2});
        value1 = operate(operator, value1, value2);
        if(value1 === Infinity){
            alert("You can't divide by 0");
            value1 = 0;
            return
        }
        if ((value1 % 1) > 0)
        {
            //is decimal
            value1 = value1.toFixed(5);
            console.log("its decimal");
        }
        displayResults.valueAsNumber = value1;
        displayOperation.textContent = value1;
        isOperation = false;
    }

}


numbers.forEach(number => number.addEventListener("click", updateDisplay))
operators.forEach(operator => operator.addEventListener("click", saveValues))

// When you click an operator, you need to save the display value, then represents the operator
// into the display, but if there is a previus value 
// You’ll need to store the first number that is input into the calculator when a user presses an operator, 
// and also save which operation has been chosen and then operate() on them when the user presses the “=” key.


function operate(operator, a, b){
    switch(operator){
        case "+":
            return add(a, b);
            break;
        case "-":
            return substract(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        default:
            break;
    }
}
