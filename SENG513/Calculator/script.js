
let answer = document.getElementById("input");
let history = document.getElementById("history");
let buttons = document.getElementsByTagName("button");
let operator = document.getElementsByClassName("operator")[0].innerText;
console.log(operator);
let brackets = 0;
let decimal = 0;
let clean = 0;
for (let b = 0; b < buttons.length; b++) {
    
    buttons[b].addEventListener("click",function(){
        let value = answer.innerText;
        let id = buttons[b].getAttribute("id");

        if (id === 'clear'){
            value = "";
        }
        else if (id === 'backspace'){
            value = value.slice(0, -1);
        }
        else if (value.length === 15) {
            console.log("TOO LONG");
        }
        else if (id ==='enter'){
            history.innerText = value + "=";
            let e = value;
            if (e === ""){
                e = "0";
            }
            e = e.replace("÷", "/");
            e = e.replace("×", "*");
            e = e.replace("−", "-");
            value = eval(e);
            clean = 1;
        }
        else if (clean === 1) {
            clean = 0;
            value = id;
        }
        else if (id === '('){
            brackets += 1;
            value += id;
            console.log(brackets);
        }
        else if (id === ')') {
            if (brackets != 0){
                brackets = brackets - 1;
                value+=id;
                console.log(brackets);
            }
        }
        else if (id ===".") {
            if (value.slice(-1) != "."){
                value +=id;
            }
        }
        else if (id === "0") {
            if (value.slice(0)!="0"){
                value +=id;
            }
        }
        else {
                value +=id;   
        }
        answer.innerText = value;
    });
}