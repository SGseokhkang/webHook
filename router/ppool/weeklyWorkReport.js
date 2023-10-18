const express = require("express");
const weeklyReportController = require("../../controller/stove/weeklyWorkReport");
const router = express.Router();

router.post('/', weeklyReportController.weeklyReport);

module.exports = router;
