const express = require('express');
const router = express.Router();
const { getStatusChecks, createStatusCheck } = require('../Controllers/statusController.js');


router.get('/', getStatusChecks);
router.post('/', createStatusCheck);

module.exports = router;