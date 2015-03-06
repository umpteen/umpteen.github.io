var data = ["unloaded"];

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
        document.getElementById("result").innerHTML = xhr.responseText;
        
        var data = document.getElementById("dict").innerText.split(" ");
        
    }
}

xhr.open("GET","dict.txt",true);
xhr.send();


var button = document.getElementById("submit");
var result = document.getElementById("result");

if (button.addEventListener) {
    button.addEventListener("submit", function (evt) {
                            evt.preventDefault();
                            
                            result.innerHTML = "yes";
                            }, true);
} else {
    button.attachEvent('onsubmit', function (evt) {
                       evt.preventDefault();
                       
                       result.innerHTML = "yes";
                       });
}

// returns whether a string is an integer > 0
// might not work with 0 or 1 index-long non-integer strings
var isNormalInteger = function (str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}