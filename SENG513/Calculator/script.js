
let answer = document.getElementById("input");
let number = document.getElementsByClassName("number");
let history = document.getElementById("history");
let buttons = document.getElementsByTagName("button");
let brackets = 0;
let clean = 0;
let operand = "";
let operator = ['/','*','-','+'];
let symbols = ['(',')'];
let separators = ['/','*','-','+','(',')'];
let ops = "+-*/";
for (let b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click",function(){
        //debugger;
        let id = buttons[b].getAttribute("id");
        let value = answer.innerText;

        if (id == 'clear'){
            history.innerText = "";
            clean = 0;
            operand = "";
            brackets = 0;
            value = "";
        }
        else if (id === 'backspace'){
            let end = value[value.length -1];
            if (end === "/" || end === "*" || end === "+" || end ==="-" || end === ")" || end === "("){
                let start = 0;

                value = value.slice(0, -1);
                operand = operand.slice(0, -1);

                for(let i = value.length-1; i >= 0; i--){
                    if(ops.includes(value[i])){
                        start = i;
                        break;
                    }
                }
                if (value.length > 1){
                    operand = value.substring(start+1, value.length);
                }
                else{
                    operand = value.substring(start, value.length)
                }
            }
            else{
                value = value.slice(0, -1);
                operand = operand.slice(0, -1);
            }
        }
        else if (id ==='enter'){

            history.innerText = value + "=";
            if (value === ""){
                value = "";
            }
            else if (brackets != 0){
                value = "Error";
            }
            else if (value.includes("()")){
                value = "Error";
            }
            else {
                // if (ops.includes(value[value.length-2])){
                //     value = "Error";
                //     clean = 1;
                // }
                if (ops.includes(value[value.length-1])){
                    value = "Error";
                    clean = 1;
                }
                if (value.slice(-1) ==="("){
                    value = "Error";
                    clean = 1;
                }
                else if (value != "Error") {
                    value = eval(value);
                    clean = 1;
                }
            }
        }
        else if (value.length >15) {
            if (clean === 1){
                value = id;
            }
        }
        else if (id === '('){
            if (value === "Error"){
                value = id;
            }
            else if (value === ""){
                value = id;
            }
            else if (!isNaN(value)){
                value += "*" + id;
            }
            else {
                value += id;
            }
            brackets += 1;
        }
        else if (id === ')') {
            if (brackets != 0){
                brackets = brackets - 1;
                value += id;
            }
        }
        else if (id ===".") {
            if (!operand.includes(".")){
                if (value === "" || value.slice(-1) === "("){
                    value += "0" + id;
                    operand +="0" + id;
                }
                else if (value === "Error"){
                    value = "0" + id;
                    operand = "0"+id;
                }
                else{
                    value +=id;
                    operand +=id;
                }
                clean = 0;
            }
            else {
            }
        }
        //Operator Instructions
        else if (id === "/" || id === "*" || id === "+" || id ==="-"){
            let last = value.slice(-1);
            if (value === "" || value === "Error"){
                value = "0" + id;
            }
            else if (value.slice(-1) != "/" && value.slice(-1) != "*" && value.slice(-1) != "+" && value.slice(-1) != "-"){
                value += id;
            }
            operand = "";
        }

        //Number Instructions
        else {
            if (value === "Error"){
                value = id;
                operand = id;
            }
            else if (id === "0") {
                if (operand.slice(0)!="0"){
                    value +=id;
                    operand += id;
                }
            }
            else if (value.slice(-1) === ")"){
                value += "*" + id;
                operand = id;
            }
            else{
                value +=id;  
                operand += id;
            }
            
        }
        answer.innerText = value;
    });
}