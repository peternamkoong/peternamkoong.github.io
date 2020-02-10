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
} 
function previousOperand(){

}
function backspace() {
    let value = getInput();
    let symbols = "/*+-()";
    value = value.substring(0,value.length -1);
    setInput(value);
    if (symbols.includes(value[value.length-1])){
        operand = operand.substring(0,operand.length-1);
    }
    else{
        operand = previousOperand();
    }
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
}

function setNumber(id) {
    let value = getInput();
    if (id === "0"){
        if (operand[0]!="0" || operand.includes('.')){
            setInput(value+id);
            operand += id;
        }
    }
    else if(operand[0] =="0"){
        value = backspace();
        setInput(value + id);
        operand +=id;
    }
    else{
        setInput(value + id);
        operand +=id;
    }
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