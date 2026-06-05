// console.log("hey node");

// can split code into different files
// function add(a,b){
//     return a+b;
// }
const math= require("./math")//./  found in current directory
//require('http')  Find in builint package
// require('fs')

// console.log("math value is",math.add(2,5));
console.log("math value is",math.subtract  (2,5));

console.log(math);