const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String ,
        required: true,
        unique : true,
    },
    redirectUrl:{
        type: String,
        required: true,
    },
    visitHistory: {
        type : Number,
        default: 0
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},
{ timestamps: true }
);

const Db = mongoose.model("urldata",urlSchema);

module.exports = Db;
