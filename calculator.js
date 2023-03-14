console.log("Calculator Loaded!")

class Calculator {

    constructor() {
        this.topDisplay = "";
        this.operator = "";
        this.operand = "0";
        this.operand1 = "0";
        this.operand2 = "0";
        this.mainDisplay = "0";
    }

    reset() {
        this.topDisplay = "";
        this.operator = "";
        this.operand = "0";
        this.operand1 = "0";
        this.operand2 = "0";
        this.mainDisplay = "0";
    }

    display(input) {
        console.log("In Display")
        if (input != undefined && input.length > 0) {
            calc.mainDisplay = input;
        }
        else if (this === undefined || this.mainDisplay === undefined) {
            calc.mainDisplay = "";
        }
        else if (calc.operator != "="){
            calc.mainDisplay = calc.operand.toString();
        }
        console.log("mainDisplay: ", this.mainDisplay)
        document.getElementsByClassName("topDisplay")[0].innerHTML = this.topDisplay;
        document.getElementsByClassName("mainDisplay")[0].innerHTML = this.mainDisplay;
    }

    perform_operation(expr1, expr2, operator) {
        switch(operator) {
            case "+":
                calc.mainDisplay = (parseFloat(expr1) + parseFloat(expr2)).toString();
                break;
            case "-":
                calc.mainDisplay = (parseFloat(expr1) - parseFloat(expr2)).toString();
                break;
            case "x":
                calc.mainDisplay = (parseFloat(expr1) * parseFloat(expr2)).toString();
                break;
            case "/":
                calc.mainDisplay = (parseFloat(expr1) / parseFloat(expr2)).toString();
                break;
            case "=":
                calc.mainDisplay = (parseFloat(expr1)).toString();
                break;
            case "AC": // All CLear
                calc.reset();
                return;
            case "CE": // Clear Entry
                calc.operand = "0";
                return;
        }
    }

}

function display_2(calc, input) {
    if (calc === undefined || input === undefined) {
        console.log("Calculator Object or Input is undefined")
        return "";
    }
    else if (calc.operand === undefined || calc.operand in [undefined, NaN, null]) {
        console.log("Operand is undefined")
        calc.operand = "0";
    }

    if (operators.includes(input)) {
        console.log("Input is Operator")
        if (calc.operand1 === undefined || [undefined,NaN, null].includes(calc.operand1)) {
            calc.operand1 = calc.operand;
            calc.mainDisplay = [calc.operand1, input].join(" ");
            calc.operand = "0";
        }
        else if (calc.operand1 !== undefined || ![undefined,NaN, null].includes(calc.operand1) && calc.operand !== undefined) {
            calc.operand2 = calc.operand;
            calc.perform_operation(calc.operand1, calc.operand2, calc.operator);
            calc.operand1 = calc.mainDisplay;
            if(input != "=")
                calc.topDisplay = [calc.operand1, input, calc.operand2, " = "].join(" ");
            calc.operand2 = "0";
        }
        calc.operator = input;
        calc.display();
        calc.operand = "0";
        return;
    }
    else if (calc.operand.includes(".") || input==".") {
        console.log("Input is Float")
        calc.operand = calc.operand.concat(input)
    }
    else {
        console.log("Input is Integer")
        calc.operand = parseInt(calc.operand) * 10 + parseInt(input);
        calc.operand = calc.operand.toString();
        console.log("Operand is: ", calc.operand);
    }

    calc.display();
}

let calc = new Calculator();

let operators = ["=", "+", "-", "x", "/", "AC", "CE"];

let innerHTML_Map = {
    "op0": 0,
    "op1": 1,
    "op2": 2,
    "op3": 3,
    "op4": 4,
    "op5": 5,
    "op6": 6,
    "op7": 7,
    "op8": 8,
    "op9": 9,
    "op.": ".",
    "op=": operators[0],
    "op+": operators[1],
    "op-": operators[2],
    "opx": operators[3],
    "op/": operators[4],
    "opAC": operators[5],
    "opCE": operators[6],
}

let function_Map = {}
function_Map["op0"] = () => display_2(calc, "0");
function_Map["op1"] = () => display_2(calc, "1");
function_Map["op2"] = () => display_2(calc, "2");
function_Map["op3"] = () => display_2(calc, "3");
function_Map["op4"] = () => display_2(calc, "4");
function_Map["op5"] = () => display_2(calc, "5");
function_Map["op6"] = () => display_2(calc, "6");
function_Map["op7"] = () => display_2(calc, "7");
function_Map["op8"] = () => display_2(calc, "8");
function_Map["op9"] = () => display_2(calc, "9");
function_Map["op."] = () => display_2(calc, ".");
function_Map["op+"] = () => display_2(calc, "+");
function_Map["op-"] = () => display_2(calc, "-");
function_Map["opx"] = () => display_2(calc, "x");
function_Map["op/"] = () => display_2(calc, "/");
function_Map["op="] = () => display_2(calc, "=");
function_Map["opAC"] = () => display_2(calc, "AC");
function_Map["opCE"] = () => display_2(calc, "CE");

function myFunction() {
    console.log("ohh yeah");
    console.log(this);
}

var buttons;
window.onload = (event) => {
    buttons = document.getElementsByTagName("button");
    console.log("op1", function_Map["op1"])
    for (var i = 0 ; i < buttons.length; i++) {
        let key = buttons[i].classList[buttons[i].classList.length - 1];
        buttons[i].innerHTML = innerHTML_Map[key];
        buttons[i].addEventListener("click", function_Map[key]); 
    }
    console.log("All Buttons Loaded!!");
};






