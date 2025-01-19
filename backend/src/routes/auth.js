const express = require('express');
const { register, login, getProfile } = require('../controllers/authController'); // Import from authController
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
