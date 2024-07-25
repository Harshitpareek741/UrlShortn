const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String , 
        required: true,
    },
    email : {
        type: String , 
        required:true,
        unique : true,
    },
    role : {
        type: String,
        required:true,
    }
});

const userModel = mongoose.model("userinfo",userSchema);

module.exports = userModel;
