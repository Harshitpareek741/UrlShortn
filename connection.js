const mongoose = require("mongoose");

function connectmongoose(url){
   return  mongoose.connect(url);
}


module.exports ={ connectmongoose};