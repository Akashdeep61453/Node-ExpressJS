const fs = require('fs');
console.log("1");

const os = require('os');

console.log(os.cpus().length); // 12


// By default thread pool size 4, 4 Workers
// max depends on cpu cores
// 2 will print after the synchronous Blocking code
// const res = fs.readFileSync("contacts.txt","utf-8");
// console.log(res);
// console.log("2");

// NON Blocking is good
// non blocking request will print at last through callback 
fs.readFile("contacts.txt","utf-8",(err,result)=>{
    console.log(result);
})
console.log("2");
