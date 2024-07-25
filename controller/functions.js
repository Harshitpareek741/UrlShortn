const userData = require("../models/url");
var uniqid = require('uniqid'); 


async function handleUniqueid(req,res,url){
    const shortId = uniqid();
    let cnt = 0 ; 
    const newSchema =  new userData({
        shortId : shortId,
        redirectUrl : url,
        visitHistory: cnt,
        createdBy: req.user._id
    });

   await newSchema.save();
  return shortId;
}

async function handleUrl(id){
    const data = await userData.findOne({shortId : id});
    if(!data)return "";
   let cnt =  data.visitHistory;
   data.visitHistory = cnt+1;
   await data.save();
    return data.redirectUrl;
}

module.exports = {handleUniqueid,handleUrl};