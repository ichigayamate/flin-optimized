const router = require('express').Router();

router.use("/chat", require("./chat"));
router.use("/leads", require("./leads"));

module.exports = router;
