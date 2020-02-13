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
    console.log("operand: "+ operand);
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
    operand ="";
    console.log("operand: "+ operand);
}

//FIX ZERO conditions!!
function setNumber(id) {
    let value = getInput();
    if (operand === "0") {
        operand = id;
        setInput(operand);
    }
    else{
        setInput(value + id);
        operand +=id;
    }
    console.log("operand: "+ operand);
}

function setBrackets(id) {
    setInput(getInput() + id);
}

function enter(){
    let past = getInput();
    try{
        value = eval(past);
    }
    catch(e) {
        value = "Error";
    }
    setHistory(past + "=");
    setInput(value);
    operand = getInput();
    console.log("operand: "+ operand);
    
}
function setDecimal(){
    if (operand === ""){
        setInput("0.");
        operand = "0.";
        
    }
    else if (!operand.includes('.')){
        setInput(getInput() + '.');
        operand+=".";
    }
    let symbols = ['/','*','+','-','(',')'];
    console.log("operand: " + operand);

}
let operand = "";
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
            }
        });
    }
    
    let brackets = document.getElementsByClassName("brackets");
    for (let i = 0; i<brackets.length; i++){
        brackets[i].addEventListener('click', function(){
            let id = this.id;
            pair = setBrackets(id);
        });
    }
}
calculator();