var dict = ["unloaded"];
var button, input, radNum, radPhrase, result;

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
        
        if(result.innerText) result.innerText = "Dictionary loaded!";
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

Array.prototype.binaryIndexOf = function(val) {
    var minIndex = 0;
    var maxIndex = this.length;
    
    while(minIndex !== maxIndex) {
      var currIndex = Math.floor((maxIndex + minIndex)/2);
      var currVal = this[currIndex];
      
      if(currVal > val) {
          if(maxIndex === currIndex) {break;}
          maxIndex = currIndex; 
      } else if(currVal < val) {
          if(minIndex === currIndex) {break;}
          minIndex = currIndex;
      } else {
          return currIndex;
      }
    }
    
    return -1;
};

var getPhraseResult = function(input) {
    var number;
    
    // check if number is a positive integer >= 10
    if(input.length > 1 && isNormalInteger(input)) {
        number = parseInt(input);
    } else {
        console.log("invalid number");
        return "Invalid number";
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
    
    return numPhrase;
}


var getNumResult = function(input) {
    var words = input.split(" ");
    
    var decodedNum = 0;
    
    for(var i = 0; i < words.length; i++) {
        var word = words[i];
        var num = dict.binaryIndexOf(word);
        
        if(num === -1) {
            console.log("invalid word " + word);
            return "invalid word " + word;
        }
        
        decodedNum += num * Math.pow(dict.length, words.length - i - 1);
    }
    
    return decodedNum;
}

var displayResult = function() {
    var inputString = input.value;
    var resultString;
    
    if(radPhrase.checked) {
        resultString = "" + getNumResult(inputString);
    } else if(radNum.checked) {
        resultString = getPhraseResult(inputString);
    } else {
        resultString = "Checkbox Segmentation fault (core dumped)";
    }
    
    console.log("finished! Result: " + resultString);
    result.innerText = "Your result: " + resultString;
}

window.onload = function(e){ 
    button = document.getElementById("submit");
    input = document.getElementById("input");
    radNum = document.getElementById("numchecked");
    radPhrase = document.getElementById("phrasechecked");
    result = document.getElementById("result");
}
