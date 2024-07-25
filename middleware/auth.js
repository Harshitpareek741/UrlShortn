const {getId} = require("../service/cookie.js");

const auth = async (req, res, next) => {
    const token = req.cookies.uid;
    if (!token) {
        return res.redirect("/login");
    }

    try {
        const th =  getId(token); // Wait for the promise to resolve
        if (!th) {
            return res.redirect("/login");
        }
        
        req.user = th;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error:', error);
        res.redirect("/login"); // Redirect on error, or handle it as needed
    }
};

function requiredRole(role){
    return async function (req,res,next) {
        if(!req.user)return res.redirect("/login");
        if(!role.includes(req.user.role))return res.end("unAuth");
        next();
    }
}

module.exports = {auth,requiredRole} ; 