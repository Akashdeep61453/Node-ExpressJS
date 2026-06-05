// create read files
const { log } = require("console");
const fs = require("fs");
// write file, write file sync

// blocking
// fs.writeFileSync('./test.txt','Hello world');
// // create file this is a synchronous file

// fs.writeFile('./test.txt','Hello world',(err) =>{});
// create file this is a Asynchronous file

// synchronous can return results
// const result =fs.readFileSync('./contacts.txt',"utf-8");// how to decode
// console.log(result);

// Async expects a callback function (don't return anything)
fs.readFile('./contacts.txt',"utf-8",(err,result) =>{
    if(err){
        console.log("error",err);
    }
    else{
        console.log(result);
        
    }
})

fs.appendFileSync('./test.txt',`Hey there\n`);

fs.appendFileSync('./test.txt',`${Date.now()} Hey`)