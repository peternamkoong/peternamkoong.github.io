
let answer = document.getElementById("input");
let number = document.getElementsByClassName("number");
let history = document.getElementById("history");
let buttons = document.getElementsByTagName("button");
let brackets = 0;
let decimal = 0;
let clean = 0;
let operator = ['/','*','-','+'];
let symbols = ['(',')'];
let num = ['0'];
for (let b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click",function(){
        //debugger;
        let id = buttons[b].getAttribute("id");
        let value = answer.innerText;
        if (id == 'clear'){
            history.innerText = "";
            clean = 0;
            value = "";
        }
        else if (id === 'backspace'){
            value = value.slice(0, -1);
        }
        else if (id ==='enter'){
            history.innerText = value + "=";
            if (value === ""){
                value = "";
            }
            else {
                for (let i = 0; i<operator.length; i++) {
                    if (value.slice(-1) === operator[i]){
                        value = "Error";
                        clean = 1;
                    }
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
        else if (value.length === 15) {
            if (clean === 1){
                value = id;
            }
        }


        else if (id === '('){
            brackets += 1;
            value += id;
            console.log(brackets);
        }
        else if (id === ')') {
            if (brackets != 0){
                brackets = brackets - 1;
                value += id;
                console.log(brackets);
            }
        }
        else if (id ===".") {
            if (!value.includes(".")){
                if (value === "" || value.slice(-1) === "("){
                    value += "0" + id;
                }
                else if (value === "Error"){
                    value = "0" + id;
                }
                else{
                    value +=id;
                }
                clean = 0;
            }
        }
        else if (id === "0") {
            if (value.slice(0)!="0"){
                value +=id;
            }
        }
        else if (id === "/" || id === "*" || id === "+" || id ==="-"){
            let last = value.slice(-1);
            console.log(last);
            if (value === "" || value === "Error"){
                value = "0" + id;
            }
            else if (value.slice(-1) === "/"){
                value = value;
            }
            else if (value.slice(-1) === "*"){
                value =value ;
            }
            else if (value.slice(-1) === "+"){
                value = value;
            }
            else if (value.slice(-1) === "-"){
                value = value;
            }
            else {
                value += id;
            }
        }
        else {
            if (value === "Error"){
                value = id;
            }
            else if (clean === 1) {
                if (!isNaN(value)){
                    if (id === "/" || id === "*" || id ==="-" || id ==="+" || id === "."){
                        value += id;
                        clean = 0;
                    }
                    else if (value === "Error"){
                        clean = 0;
                        value = id; 
                    }
                    else {
                        clean = 0;
                        value = id; 
                    }
                }
                else{
                    clean = 0;
                    value += id; 
                }
            }
            else{
                value +=id;  
            }
        }
        answer.innerText = value;
    });
}