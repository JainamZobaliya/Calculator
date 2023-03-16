console.log("Calculator Script Started!")

class Calculator {

    constructor() {
        this.queue = undefined;
        this.result = undefined;
        this.mainDisplay = "0";
        this.topDisplay = "";
    }

    display() {
        console.log("In Display")
        console.log("\ttopDisplay: ", this.topDisplay);
        console.log("\tmainDisplay: ", this.mainDisplay);
        document.getElementsByClassName("topDisplay")[0].innerHTML = this.topDisplay;
        document.getElementsByClassName("mainDisplay")[0].innerHTML = this.mainDisplay;
    }

    reset() {
        this.queue = undefined;
        this.result = undefined;
        this.mainDisplay = "0";
        this.topDisplay = "";
        if(check(this.queue)) {
            this.queue = ["0"];
        }
        this.mainDisplay = this.queue[0];
        console.log("Reseted!!");
    }
    
    calculate(exp1, opr, exp2) {
        switch(opr) {
            case "+":
                this.result = (parseFloat(exp1) + parseFloat(exp2)).toString();
                return this.result;
            case "-":
                this.result = (parseFloat(exp1) - parseFloat(exp2)).toString();
                return this.result;
            case "x":
                this.result = (parseFloat(exp1) * parseFloat(exp2)).toString();
                return this.result;
            case "/":
                this.result = (parseFloat(exp1) / parseFloat(exp2)).toString();
                return this.result;
        }
    }
    
    calculate_operation() {
        var result = "0";
        if (this.queue.length <= 2) { // 1=, 5=;  
            result = this.queue[0];
            return result; // 1, 5;
        }
        // 1+2=, 3+4-5=, ...;
        var exp1 = this.queue[0];
        var op = this.queue[1];
        var exp2 = this.queue[2];
        for (var i=3; i<this.queue.length; i+=2) { // 3, 5 // Iterating through operators
            if (i == this.queue.length - 1) {
                return this.calculate(exp1, op, exp2); // 1+2->3, 7-5->2
            }
            result = this.calculate(exp1, op, exp2); // 3+4, 
            exp1 = result; // 7;
            op = this.queue[i]; // -;
            exp2 = this.queue[i+1]; // 5;
        }
        return result;    
    }
}

let rejection = [undefined, NaN, null];
let operators = ["=", "+", "-", "x", "/", "CE", "AC"];

let calc = new Calculator();

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

function check(input) {
    return input === undefined || rejection.includes(input);
}

function toggleAC_CE(switct_to_CE) {
    if(switct_to_CE) {
        console.log("\t Now Working as CE");
        document.getElementById("reset").classList.add('opCE');
        document.getElementById("reset").classList.remove('opAC');
        document.getElementById("reset").innerHTML = 'CE';
        document.getElementById("reset").onclick = function_Map["opCE"]; 
    }
    else {
        console.log("\t Now Working as AC");
        document.getElementById("reset").classList.add('opAC');
        document.getElementById("reset").classList.remove('opCE');
        document.getElementById("reset").innerHTML = 'AC';
        document.getElementById("reset").onclick = function_Map["opAC"]; 
    }
}

function display_2(calc, input) {
    if(check(calc.queue)) {
        calc.queue = ["0"];
    }
    if (operators.includes(input)) {
        // Push Operator to calc.queue and its check with previous element.
        if(input == operators[operators.length - 1]) { // ALL CLEAR
            calc.reset();
            calc.mainDisplay = "0";
            calc.mainDisplay = calc.queue.join(" ");
            calc.display();
            toggleAC_CE(true);  // Making button to work as CE 
            return;
        }
        if(!check(calc.result)){
            calc.result = undefined;
            toggleAC_CE(true);  // Making button to work as CE 
        }
        if(input == operators[operators.length - 2]) { // CLEAR ENTRY
            if(!check(calc.queue) && calc.queue.length > 0) {
                lastElement = calc.queue.pop();
                if( !["Infinity", "NaN", "Error"].includes(lastElement) && lastElement.length > 1){
                    lastElement = lastElement.substring(0, lastElement.length - 1);
                    calc.queue.push(lastElement);
                }
            }
            if(calc.queue.length == 0) {
                calc.queue.push("0");
            }
            calc.mainDisplay = calc.queue.join(" ");
            calc.topDisplay = "";
            calc.display();
            return;
        }
        var lastElement = "0";
        toggleAC_CE(true);  // Making button to work as CE 
        if(calc.queue.length > 0) {
            lastElement = calc.queue[calc.queue.length - 1];
        }
        if(operators.includes(lastElement)) { // Replace previous operator with current operator
            lastElement = calc.queue.pop();
        }
        calc.queue.push(input);
        calc.mainDisplay = calc.queue.join(" ");
        if(input == operators[0]) { // input is =
            calc.result = calc.calculate_operation();
            calc.mainDisplay = calc.result;
            if(calc.queue.length == 1) {
                calc.topDisplay = "";
            }
            else {
                calc.topDisplay = calc.queue.join(" ");
            }
            calc.queue = [calc.result];
            toggleAC_CE(true);  // Making button to work as AC
        }
    }
    else {
        toggleAC_CE(true);  // Making button to work as CE
        var lastElement = "0";
        if(calc.queue.length > 0 && !operators.includes(calc.queue[calc.queue.length - 1])){
            lastElement = calc.queue.pop();
            if(!check(calc.result) && calc.result == lastElement){
                calc.result = undefined;
                calc.queue = [];
                lastElement = "0";
            }
        }
        if(lastElement.includes(".")) {
            if(input != ".") {
                calc.queue.push(lastElement.concat(input));
            }
            else {
                calc.queue.push(lastElement);
            }
        }
        else if(input == ".") {
            calc.queue.push(lastElement.concat(input));
        }
        else {
            calc.queue.push(parseFloat(lastElement.concat(input)).toString());
        }
        calc.mainDisplay = calc.queue.join(" ");
    }
    calc.display();
}

var buttons;
window.onload = (event) => {
    buttons = document.getElementsByTagName("button");
    for (var i = 0 ; i < buttons.length; i++) {
        let key = buttons[i].classList[buttons[i].classList.length - 1];
        buttons[i].innerHTML = innerHTML_Map[key];
        if(["opCE", "opAC"].includes(key)) {
            continue;
        }
        buttons[i].addEventListener("click", function_Map[key]); 
    }
    toggleAC_CE(true);  // Making button to work as CE
    console.log("All Buttons Loaded!!");
    calc.display();
};






