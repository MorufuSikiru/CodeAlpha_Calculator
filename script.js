let firstValue = "";
  let operator = "";
  let waitingForSecondValue = false;

  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  function performCalculation(firstNumber, secondNumber, operator) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === "+") return firstNumber + secondNumber;
    if (operator === "-") return firstNumber - secondNumber;
    if (operator === "*") return firstNumber * secondNumber;
    if (operator === "/") {
      if (secondNumber === 0) return "Cannot divide by zero";
      return firstNumber / secondNumber;
    }
  }

  function handleInput(value) {
    // Numbers
    if (!isNaN(value) && value !== " ") {
      if (waitingForSecondValue) {
        display.textContent = value;
        waitingForSecondValue = false;
      } else if (display.textContent.trim() === "0") {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
      return;
    }

    // Decimal
    if (value === ".") {
      if (waitingForSecondValue) {
        display.textContent = "0.";
        waitingForSecondValue = false;
        return;
      }
      if (!display.textContent.includes(".")) {
        display.textContent += ".";
      }
      return;
    }

    // Operators
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (firstValue !== "" && waitingForSecondValue) {
        operator = value;
        return;
      }
      firstValue = display.textContent;
      operator = value;
      waitingForSecondValue = true;
      return;
    }

    // Equals
    if (value === "=" || value === "Enter") {
      if (firstValue === "" || operator === "") return;
      let secondValue = display.textContent;
      let result = performCalculation(firstValue, secondValue, operator);
      display.textContent = result;
      firstValue = result;
      operator = "";
      waitingForSecondValue = false;
      return;
    }

    // Clear
    if (value === "C" || value === "Escape") {
      display.textContent = "0";
      firstValue = "";
      operator = "";
      waitingForSecondValue = false;
      return;
    }

    // Backspace
    if (value === "Backspace") {
      if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
      } else {
        display.textContent = "0";
      }
      return;
    }
  }

  // Button clicks
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      handleInput(button.textContent.trim());
    });
  });

  // Keyboard support
  document.addEventListener("keydown", function(e) {
    const key = e.key;
    const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","Enter","Escape","Backspace"];

    if (validKeys.includes(key)) {
      e.preventDefault();
      handleInput(key);

      // Flash the matching button
      buttons.forEach(function(btn) {
        const btnVal = btn.textContent.trim();
        if (
          btnVal === key ||
          (key === "Enter" && btnVal === "=") ||
          (key === "Escape" && btnVal === "C")
        ) {
          btn.classList.add("active");
          setTimeout(() => btn.classList.remove("active"), 150);
        }
      });
    }
  });