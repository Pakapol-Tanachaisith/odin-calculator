const digitsButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operators button");
const clearButton = document.querySelector("#clear-btn");
const equalButton = document.querySelector("#equal-btn");
const calculatorDisplay = document.querySelector("#display");

let currentValue = "0";
let currentOperator = "";
let currentOperant = "";

const operations = {
  "+": () => Number(currentValue) + Number(currentOperant),
  "-": () => Number(currentValue) - Number(currentOperant),
  "*": () => Number(currentValue) * Number(currentOperant),
  "/": () => Number(currentValue) / Number(currentOperant),
};

const refreshDisplay = () => {
  calculatorDisplay.textContent = currentValue;
};

const selectOperator = (operator) => {
  currentOperant = "";
  currentOperator = operator;
  console.log({ currentValue, currentOperator, currentOperant });
};

const selectOperant = (operant) => {
  if (!currentOperator) {
    if (currentValue === "0") {
      currentValue = String(operant);
      refreshDisplay();
    } else {
      currentValue = currentValue.concat(operant);
      refreshDisplay();
    }
  } else {
    currentOperant = currentOperant ? currentOperant.concat(operant) : operant;
  }

  console.log({ currentValue, currentOperator, currentOperant });
};

const operate = () => {
  if (!currentOperator || !currentOperant || !currentOperator in operations)
    return;

  if (
    currentValue === "0" &&
    currentOperant === "0" &&
    currentOperator === "/"
  ) {
    alert("Ha! Nice Try!");
    return;
  }

  let newValue = operations[currentOperator]();
  if (newValue.isFloat) {
    newValue = newValue.toFixed(2);
  }
  currentValue = newValue;
  refreshDisplay();
};

const clear = () => {
  currentValue = "0";
  currentOperant = "";
  currentOperator = "";

  refreshDisplay();
};

operatorButtons.forEach((item) => {
  item.addEventListener("click", () => {
    selectOperator(item.id);
  });
});

digitsButtons.forEach((item) => {
  item.addEventListener("click", () => selectOperant(item.textContent));
});

equalButton.addEventListener("click", operate);

clearButton.addEventListener("click", clear);
