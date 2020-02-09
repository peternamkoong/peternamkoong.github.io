function getHistory() {
    return document.getElementById("history").innerText;
}
function printHistory(num){
    document.getElementById("history").innerText = num;
}
alert(printHistory("9999"));