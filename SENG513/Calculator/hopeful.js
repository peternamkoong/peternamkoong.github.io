function getHistory() {
    return document.getElementById('history').value;
}
function setHistory(history) {
    document.getElementById('history').value = history; 
}
function getInput() {
    return document.getElementById('input').value;
}
function setInput(input) {
    document.getElementById('input').value = input;
}

function clear() {
    setHistory("");
    setInput("");
    value = "";
    operand = "";
    console.log("operand: "+ operand);
} 
function previousOperand(arr){
    //debugger;
    let symbols = "/*+-()";
    let start = "";
    for(let i = arr.length;i>=0;i--){
        if (symbols.includes(arr[i])){
            start = i+1;
            console.log("start index: " + start );
            break;
        }
        else{
            start = 0;
        }
    }
    console.log(arr.substring(start, arr.length));
    return arr.substring(start, arr.length);

}
function backspace() {
    //debugger;
    let value = getInput();
    let symbols = "/*+-()";
    if (symbols.includes(value[value.length-1]) && !isNaN(value[value.length-2])){
        let arr = value.substring(0, value.length-1);
        operand = previousOperand(arr);
        value = arr;
    }
    else{
        value = value.substring(0,value.length -1);
        operand = operand.substring(0,operand.length-1);
    }
    setInput(value);
    return value;
}

function setOperator(id) {
    
    let value = getInput();
    if (value != ""){
        let symbols = "/*+-";
        if (!symbols.includes(value[value.length-1])){
            setInput(value + id);
        }
    }
    else{
        setInput("0" + id);
    }
    currentDisplay = getInput();
    console.log("currentDisplay: " + currentDisplay);
    operand ="";
}

//FIX ZERO conditions!!
function setNumber(id) {
    //debugger;
    let value = getInput();
    if (submit === true){
        operand = id;
        setInput(id);

    }
    else if (value[value.length-1] ===")"){
        operand = id;
        setInput (value + "*"+id);
    }
    else if (operand === "0") {
        operand = id;
        console.log(currentDisplay + id);
        setInput(currentDisplay + id);
    }
    else{
        setInput(value + id);
        operand +=id;
    }
}

function setBrackets(id) {
    if (submit === true){
        operand = "";
        setInput(id);
    }
    else {
        let input = getInput();
        if (id === "(" && (!isNaN(input[input.length-1]) || input[input.length-1] === ")")){
            setInput(input + "*" + id);
        }
        else{
            setInput(getInput() + id);
        }
    }
    currentDisplay = getInput();
    console.log("currentDisplay: " + currentDisplay);
}

function enter(){
    debugger;
    let past = getInput();
    let value = "";
    try{
        if (past != "" && past != "Error"){
            value = eval(past);
        }
    }
    catch(e) {
        value = "Error";
        operand = "";
        currentDisplay = "";
    }
    setHistory(past + "=");
    setInput(value);
    if (getInput() != "Error"){
        operand = getInput();
    }
    else{
        operand = "";
    }
    submit = true;
    
}
function setDecimal(){
    if (submit === true){
        setInput("0.");
        operand = "0.";
    }
    else if (operand === ""){
        setInput(currentDisplay + "0.");
        operand = "0.";
    }
    else if (!operand.includes('.')){
        setInput(getInput() + '.');
        operand+=".";
    }
}

let currentDisplay = "";
let operand = "";
let submit = false;

function calculator() {
    let number = document.getElementsByClassName("number");
    for (let i = 0; i<number.length; i++){
        number[i].addEventListener('click', function(){
            let id = this.id;
            if (id ==="."){
                setDecimal();
            }
            else{
                setNumber(id);
            }
            submit = false;
            console.log("operand: " + operand);
        });
        
    }
    let operator = document.getElementsByClassName("operator");
    for (let i = 0; i<operator.length; i++){
        operator[i].addEventListener('click', function(){
            let id = this.id;
            if (id === "clear"){
                clear();
                pair = 0;
            }
            else if (id === "backspace"){
                backspace();
            }
            else if (id === "enter"){
                enter();
            }
            else{
                setOperator(id);
                submit = false;
            }
            console.log("operand: " + operand);
        });
    }
    
    let brackets = document.getElementsByClassName("brackets");
    for (let i = 0; i<brackets.length; i++){
        brackets[i].addEventListener('click', function(){
            let id = this.id;
            pair = setBrackets(id);
            submit = false;
            console.log("operand: " + operand);
        });
    }
}
calculator();