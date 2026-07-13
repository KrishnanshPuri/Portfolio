const express = require('express');
const router = express.Router();
const { listContactMessages, createContactMessage } = require('../Controllers/contactController');

router.get('/', listContactMessages);
router.post('/', createContactMessage);

module.exports = router;