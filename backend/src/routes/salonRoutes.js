const express = require('express');
const router = express.Router();

// Import controller
const salonController = require('../controllers/salonController'); // Ensure this path is correct

// Define routes
router.get('/', salonController.getAllSalons); // Ensure `salonController.getAllSalons` is defined

module.exports = router;
