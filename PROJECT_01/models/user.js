const mongoose = require("mongoose");



//user schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,// means we MUST have to give this
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true, //unique email 
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},
{timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;