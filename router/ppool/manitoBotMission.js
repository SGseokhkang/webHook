const express = require("express");
const manitoBotMission = require("../../controller/stove/manitoBotMission");
const router = express.Router();

router.post('/', manitoBotMission.manitoBotMission);

module.exports = router;
