const router = require("express").Router();
const { registerController } = require("../controller/auth");

router.post("/register", registerController);
router.post("/login", () => {});

module.exports = router;
