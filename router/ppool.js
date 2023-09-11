const express = require("express");
const ppoolController = require("../controller/ppool");
const router = express.Router();

router.post('/', ppoolController.webhookPpool);
router.get('/', ppoolController.getWebhookData);

module.exports = router;
