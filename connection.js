const mongoose = require("mongoose"); // using mongo db

async function connectMongoDb(url) {
    mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
};