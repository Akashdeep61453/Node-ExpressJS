function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}
// we need to export such that anyone can use it
// module.exports = "akash";

// module.exports = add;
// module.exports = subtract;// it Overwrites add

module.exports={
    add,
    subtract,
}