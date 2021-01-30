const calculator = {
  screen: document.getElementById("res"),
  result: false,
  operand1: "",
  operator: "",
  operand2: "",
  binary: (number) => parseInt((number >>> 0).toString(2)),
  decimal: (number) => parseInt(number, 2),
  getOperator: function () { 
    return this.operator 
  },
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
  inputOperator: function(operator) {
    this.operator = operator;
    this.screen.innerText += operator;
  },
  makeAddition: function() {
    this.screen.innerText = binary(decimal(this.operand1) + decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeSubtraction: function() {
    this.screen.innerText = binary(decimal(this.operand1) - decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeMultiplication : function() {
    this.screen.innerText =  binary(decimal(this.operand1) * decimal(this.operand2));
    this.result = true;
    this.resetExpression();
  },
  makeDivision: function() {
    if (b != 0) {
        this.screen.innerText = binary(parseInt(decimal(this.operand1) / decimal(this.operand2)));
    } else {
        this.screen.innerText = "Zero division error!";
    }
    this.resetExpression();
  },
  clear: function() {
    this.screen.innerText = "";
    this.result = false;
    this.resetExpression();
  },
  validExpression: function() {
    return (this.operand1 != "" && this.operator != "" && this.operand2 != "");
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
  calculator.inputOperator("+");
});

document.getElementById("btnSub").addEventListener("click", () => {
  calculator.inputOperator("-");
});

document.getElementById("btnMul").addEventListener("click", () => {
  calculator.inputOperator("*");
});

document.getElementById("btnDiv").addEventListener("click", () => {
  calculator.inputOperator("/");
});

document.getElementById("btnEql").addEventListener("click", () => {
  
  if (calculator.validExpression()) {
    
    switch(calculator.getOperator()) {
      case "+": calculator.makeAddition();
                break;
      case "-": calculator.makeSubtraction();
                break;
      case "*": calculator.makeMultiplication();
                break;
      case "/": calculator.makeDivision();
                break;
    }
    
  }

});