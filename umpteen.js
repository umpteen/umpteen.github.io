var dict = ["unloaded"];
var button, textarea, result;

// construct XMLHttpRequest variable
var xhr;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
}
else { // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function()
{
    if (xhr.readyState==4 && xhr.status==200)
    {
        dict = xhr.responseText.split(" ");
        console.log("dict received. length: " + dict.length);
    }
}

xhr.open("GET","dict.txt",true);
xhr.send();

// returns whether a string is an integer > 0
// might not work with 0 or 1 index-long non-integer strings
var isNormalInteger = function (str) {
    //var n = ~~Number(str); // ~~ was causing bugs with large numbers
    var n = Number(str);
    return String(n) === str && n >= 0;
}

var displayResult = function() {
    var numberString = textarea.value;
    var number;
    
    // check if number is a positive integer >= 10
    if(numberString.length > 1 && isNormalInteger(numberString)) {
        number = parseInt(numberString);
    } else {
        console.log("invalid string");
        return;
    }
    
    // how many digits/words long the number is
    // = logBase(num, base=dict-length) + 1, rounded down
    var digitCount = Math.floor(Math.log(number) / Math.log(dict.length) + 1);
    
    var numPhrase = "";
    
    for(var i = 0; i < digitCount; i++) {
        var newWord = dict[number % dict.length];
        numPhrase = newWord + " " + numPhrase;
        number = Math.floor(number/dict.length);
    }
    
    console.log("finished! Number: " + numPhrase);
    result.innerText = "Your number: " + numPhrase;
}

window.onload = function(e){ 
    button = document.getElementById("submit");
    textarea = document.getElementById("number");
    result = document.getElementById("result");
}
