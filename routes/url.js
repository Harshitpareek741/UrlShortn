var Router = require('router');
var router = Router();
const {  handleUrl } = require("../controller/functions");

router
.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Takes unique ID and gives URL
        if (!id) {
            return res.status(400).send("ID is not found");
        }

        const url = await handleUrl(id);
        if (!url) {
            return res.status(404).send("ID not found");
        } else {
            res.redirect(url);
        }
    } catch (error) {
        console.error("Error in GET /:id:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;