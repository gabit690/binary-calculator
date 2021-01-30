const calculator = {
  screen: document.getElementById("res"),
  result: false,
  operand1: "",
  operator: "",
  operand2: "",
  binary: (number) => parseInt((number >>> 0).toString(2)),
  decimal: (number) => parseInt(number, 2),
  existResult: function () {
    return this.result;
  },
  inputZero: function() {
    if (!this.result) {
      this.screen.innerText += "0";
    }
  },
  inputOne: function() {
    if (!this.result) {
      this.screen.innerText += "1";
    }
  },
  setOperator: function(operator) {

    if (this.operator == "" && /[01]$/.test(this.screen.innerText)) {
      this.operator = operator;
      this.screen.innerText += operator;
    } else if (/[+\-*\/]$/.test(this.screen.innerText)) {
      this.operator = operator;
      const newExpression = this.screen.innerText.slice(0, this.screen.innerText.length - 1);
      this.screen.innerText = newExpression + operator;
    }

    if (this.result && /[01]+/.test(this.screen.innerText)) {
      this.result = false;
    }

  },
  makeAddition: function() {
    this.screen.innerText = this.binary(this.decimal(this.operand1) + this.decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeSubtraction: function() {
    this.screen.innerText = this.binary(this.decimal(this.operand1) - this.decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeMultiplication : function() {
    this.screen.innerText =  this.binary(this.decimal(this.operand1) * this.decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeDivision: function() {
    if (this.operand2 != 0) {
        this.screen.innerText = this.binary(parseInt(this.decimal(this.operand1) / this.decimal(this.operand2)));
    } else {
        this.screen.innerText = "Zero division error!";
    }
    this.result = true;
    this.resetExpression();
  },
  makeOperation: function() {

    this.operand1 = this.screen.innerText.match(/^[01]+/)[0];
    this.operand2 = this.screen.innerText.match(/[01]+$/)[0];

    switch(this.operator) {
      case "+": this.makeAddition();
                break;
      case "-": this.makeSubtraction();
                break;
      case "*": this.makeMultiplication();
                break;
      case "/": this.makeDivision();
                break;
    }
  },
  clear: function() {
    this.screen.innerText = "";
    this.result = false;
    this.resetExpression();
  },
  validExpression: function() {
    const expectedExpression = /^[01]+[+\-*\/][01]+$/;
    return (expectedExpression.test(this.screen.innerText));
  },
  resetExpression: function() {
    this.operand1 = "";
    this.operator = "";
    this.operand2 = "";
  }
};

// FUNCIONALIDAD PARA LOS BOTONES

document.getElementById("btnClr").addEventListener("click", () => {
  calculator.clear();
});

document.getElementById("btn0").addEventListener("click", () => {
  if (!calculator.existResult()) {
    calculator.inputZero();
  }
});

document.getElementById("btn1").addEventListener("click", () => {
  if (!calculator.existResult()) {
    calculator.inputOne();
  }
});

document.getElementById("btnSum").addEventListener("click", () => {
  calculator.setOperator("+");
});

document.getElementById("btnSub").addEventListener("click", () => {
  calculator.setOperator("-");
});

document.getElementById("btnMul").addEventListener("click", () => {
  calculator.setOperator("*");
});

document.getElementById("btnDiv").addEventListener("click", () => {
  calculator.setOperator("/");
});

document.getElementById("btnEql").addEventListener("click", () => {
  if (calculator.validExpression()) {
    calculator.makeOperation();
  }
});