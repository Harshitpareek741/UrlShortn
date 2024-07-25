const jwt = require('jsonwebtoken');
const secret = "harSHI132"

function setId(user){
    return jwt.sign({ 
        _id : user._id,
        email : user.email,
        role : user.role
     }, secret);
}

function getId(token){
   if(!token)return null;
   return jwt.verify(token,secret);
}

module.exports = {setId,getId};