var Router = require('router');
var router = Router();
require('dotenv').config(); // Add this at the top of your file
const { handleUniqueid, handleUrl } = require("../controller/functions");
const {requiredRole} = require("../middleware/auth");
const urls = require("../models/url");
router
.get("/allurls", requiredRole(["Admin"]) , async (req, res) => {
    const fullUrl = "";
    const allurls = await urls.find({});
   
    res.render("home", { fullUrl , allurls });
})
.get("/", async (req, res) => {
    const fullUrl = "";
    const allurls = await urls.find({createdBy : req.user._id});
   
    res.render("home", { fullUrl , allurls });
})
.post("/", async (req, res) => {
    try {
        const body = req.body;
        const { url } = body;

        // Takes URL and gives unique ID
        if (!url) {
        return res.redirect("http://localhost:8000/");
        }

        const unique = await handleUniqueid(req,res,url);

        // Construct the full URL using the environment variable
        const baseUrl = process.env.BASE_URL ;
        const fullUrl = `${baseUrl}/${unique}`;
        const allurls = await urls.find({createdBy : req.user._id});
      
        res.render("home", { fullUrl , allurls });
    } catch (error) {
        console.error("Error in POST /:", error);
        res.status(500).send("Internal Server Error");
    }
})

.get("/about",(req,res)=>{
    res.render("about")
});

module.exports = router;
