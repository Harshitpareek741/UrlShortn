var Router = require('router');
var userRouter = Router();
const {handleUserLogin,handleUserSignup} = require("../controller/user");


userRouter
.get("/signup",(req,res)=>{
    return res.render("signUp");
})
.post("/signup",async (req,res)=>{
  await handleUserSignup(req,res);
})
.get("/login",(req,res)=>{
    res.render("login");
})
.post("/login",async (req,res)=>{
  await handleUserLogin(req,res);
})

module.exports = userRouter;