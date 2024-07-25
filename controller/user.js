const userModel = require("../models/user");
const { handleUniqueid } = require("./functions");
const {setId} = require("../service/cookie");


async function handleUserSignup(req,res){
   const body = req.body;
   const {name,password,email} = body;
   let roles = "Normal";
   const mail = 'harshitpareek132@gmail.com';
   console.log(email);
   if(email==mail){
      console.log("user is a admin");
      roles = "Admin";}
   if(!name || !password || !email){
      return res.redirect("/signup");
   }
   try{
      await userModel.create({
         name : name,
         password : password,
         email : email,
         role : roles,
        });
   }
   catch(err){
      return res.redirect("/signup");
   }
  
   const data = await userModel.findOne({name: name , password: password});
   const token =  setId(data);

   res.cookie("uid",token); 
   return res.redirect("/");
}

async function handleUserLogin(req,res){
    const body = req.body;
    const {name,password} = body;
    const data = await userModel.find({name: name , password: password});
    if(!data.length){
     return res.redirect("/login");
   }
   const token = setId(data);
   res.cookie("uid",token); 
   res.redirect("/");
 }

 module.exports = {handleUserLogin,handleUserSignup};