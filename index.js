const express = require("express");
const app = express();
const port = 8000;
const {connectmongoose} = require("./connection");
const router = require("./routes/homepage");
const userRouter = require("./routes/user");
const {auth,requiredRole} = require("./middleware/auth");
const urlRouter = require("./routes/url");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port,(req,res)=>{
  console.log(`we are listining at port ${port}`);
});
connectmongoose("mongodb://127.0.0.1:27017/urlShort")
.then(()=>{
    console.log("MongoDb is Connected");
})
.catch((err)=>{console.log(err)});


app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use("/url",urlRouter);
app.use("/",userRouter);
app.use("/",[auth,requiredRole(["Normal","Admin"])],router);

