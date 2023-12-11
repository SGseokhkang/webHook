const express = require("express");
const manitoBot = require("../../controller/stove/manitoBot");
const router = express.Router();

router.post('/', manitoBot.manitoBot);

module.exports = router;
