const fs = require('fs');// it makes the changes permanent in files

function logReqRes(filename) { //filename must be descriptive
    return (req, res, next) => {
        fs.appendFile(filename,
        `\n${Date.now()}: ${req.method}: ${req.path}`,
        (err, data) =>{
            next();
        }
    );
    }
}

module.exports = {
    logReqRes,
}