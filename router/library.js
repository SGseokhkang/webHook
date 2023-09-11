const express = require("express");
const libraryController = require("../controller/library");
const router = express.Router();

router.post('/', libraryController.webhookLibrary);
router.get('/', libraryController.getLibraryData);

module.exports = router;
