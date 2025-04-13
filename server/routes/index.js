const router = require('express').Router();
const UserController = require("../controllers/users");
const { authenthication } = require("../helpers/auth");

router.use("/chat", require("./chat"));
router.use("/leads", require("./leads"));

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authenthication, UserController.getProfile);

module.exports = router;
