/**********************************************
 * Last Name:   Namkoong
 * First Name:  Kyoung Hwan
 * Student ID:  10125240
 * Course:      SENG 513
 * Tutorial:    05
 * Assignment:  2
 *********************************************/

let currentDisplay = "";
let operand = "";
let submit = false;

//Calculator function that sets event listeners for each button on the calculator
function calculator() {
    
    //Getting all the button elements that have the class name "number" (0,1,2,3,4,5,6,7,8,9,.)
    let number = document.getElementsByClassName("number");
    for (let i = 0; i<number.length; i++){
        number[i].addEventListener('click', function(){
            let id = this.id;
            //Check to see if the button clicked was a dot.
            if (id ==="."){
                setDecimal();
            }
            //If the button was not a dot, then it was a number from 0...9
            else{
                setNumber(id);
            }
            //if any of these buttons were clicked, then the "enter" button was not just clicked
            //thus, our submit boolean is set to false.
            submit = false;
        });
    }

    //Getting all the button elements that have the class name "operator" (*,/,+,-,CE,C,=)
    let operator = document.getElementsByClassName("operator");
    for (let i = 0; i<operator.length; i++){
        operator[i].addEventListener('click', function(){
            let id = this.id;
            //Check to see if the "C" button was clicked
            if (id === "clear"){
                //clears all the variables back to empty
                clear();

            }
            //Else, checks to see if the "CE" button was clicked
            else if (id === "backspace"){
                backspace();
                submit = false;

            }
            //Else, checks to see if the "=" button was clicked
            else if (id === "enter"){
                enter();
            }
            //Else, it was a normal operator (*,/,+,-)
            else{
                setOperator(id);
                submit = false;
            }
        });
    }
    
    //Getting all the button elements that have the class name "operator" ( )
    let brackets = document.getElementsByClassName("brackets");
    for (let i = 0; i<brackets.length; i++){
        brackets[i].addEventListener('click', function(){
            let id = this.id;
            setBrackets(id);
            submit = false;
        });
    }
}

// Get the label field ID'd "history" from the HTML document
function getHistory() {
    return document.getElementById('history').value;
}

// Set the label field ID'd "history" in the HTML document
function setHistory(history) {
    document.getElementById('history').value = history; 
}

// Get the label field ID'd "Input" from the HTML document
function getInput() {
    return document.getElementById('input').value;
}

// Set the label field ID'd "Input" in the HTML document
function setInput(input) {
    document.getElementById('input').value = input;
}

//Clears all the variables and restarts the calculator
function clear() {
    submit = false;
    setHistory("");
    setInput("");
    value = "";
    operand = "";
} 

//If backspaced, previousOperand will locate the previous operand
//by finding the next set of numbers that are bordered by operators
//and/or brackets
function previousOperand(arr){
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
    return arr.substring(start, arr.length);
}

//backspace function that removes the tail of the Input field 
function backspace() {
    let value = getInput();
    let symbols = "/*+-()";

    //If the tail was an operator and the tail-1 is a number
    if (symbols.includes(value[value.length-1]) && !isNaN(value[value.length-2])){
        let arr = value.substring(0, value.length-1);
        operand = previousOperand(arr);
        value = arr;
    }

    //else, the tail was a number and will be removed.
    else{
        value = value.substring(0,value.length -1);
        operand = operand.substring(0,operand.length-1);
    }
    setInput(value);
    return value;
}

//Function that is called when an operator button is clicked
function setOperator(id) {
    let value = getInput();

    //If the Input value is not empty, then the operator can be set
    if (value != ""){
        let symbols = "/*+-";

        //If the last character set in the Input is not another operator
        if (!symbols.includes(value[value.length-1])){
            setInput(value + id);
        }
    }

    //else, the Input is empty, and will be prefixed with a 0 before the operator
    else{
        setInput("0" + id);
    }

    currentDisplay = getInput();
    operand ="";
}

//Function that is called when one of the number buttons is clicked
function setNumber(id) {
    let value = getInput();

    //if a number is pressed RIGHT after the enter button is pressed
    //set the Input to be the number
    if (submit === true){
        operand = id;
        setInput(id);
    }
    //If the tail of the Input was a ")", add a * operator in between it
    //and the number
    else if (value[value.length-1] ===")"){
        operand = id;
        setInput (value + "*"+id);
    }
    //If the operand is set to 0, replace the 0 with the number that is pressed
    else if (operand === "0") {
        operand = id;
        setInput(currentDisplay + id);
    }
    //otherwise, just suffix the id to the value/operand
    else{
        setInput(value + id);
        operand +=id;
    }
}

//Function that is ran when one of the bracket buttons is selected
function setBrackets(id) {
    //if a bracket is clicked right after the enter button, just set it as normal
    if (submit === true){
        setInput(id);
    }
    else {
        let input = getInput();
        //if the button clicked is "(" and the tail of the Input was either a number or
        //a "(", add a * operator inbetween it.
        if (id === "(" && (!isNaN(input[input.length-1]) || input[input.length-1] === ")")){
            setInput(input + "*" + id);
        }
        else{
            setInput(getInput() + id);
        }
    }
    operand ="";
    currentDisplay = getInput();
}

//If the enter button is clicked run this function
function enter(){
    let past = getInput();
    let value = "";
    //try to evaluate the expression, as long as the Input is not  empty, or an Error
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
    //If the result was not an error, set the operand to be the result
    if (getInput() != "Error"){
        operand = getInput();
    }
    //Else, the result WAS an error, so set the operand to empty
    else{
        operand = "";
    }
    //submit is set to true, since the enter button was just clicked.
    submit = true;
}

//function that is run when the "." button is clicked
function setDecimal(){
    //if the button was pressed RIGHT after the enter key, set the
    //Input and operand to "0."
    if (submit === true){
        setInput("0.");
        operand = "0.";
    }
    //if the operand is empty, set it to have a 0 in front of the "."
    else if (operand === ""){
        setInput(currentDisplay + "0.");
        operand = "0.";
    }
    //else, if the operand doesn't already have a ".", add one.
    else if (!operand.includes('.')){
        setInput(getInput() + '.');
        operand+=".";
    }
}

calculator();