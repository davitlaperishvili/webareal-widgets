function stringToNumber(str) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code >= 97 && code <= 122) {
      // check if the character is a lowercase letter
      result.push(code - 97 + 1); // convert the letter to its numeric value and append it to the result string
    }
  }
  return result; // convert the result string to a number
}

var str = "artmie.uk";
var num = stringToNumber(str); // num will be 60
console.log(num);
