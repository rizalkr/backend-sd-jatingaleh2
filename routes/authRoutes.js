const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Endpoint login
router.post('/login', authController.login);

module.exports = router;