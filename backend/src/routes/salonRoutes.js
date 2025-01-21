const express = require('express');
const router = express.Router();

// Import controller
const salonController = require('../controllers/salonController'); // Ensure this path is correct

// Define routes
router.get('/', salonController.getAllSalons); // Ensure `salonController.getAllSalons` is defined

// Create a salon
router.post('/', salonController.createSalon);

// Update a salon
router.put('/:id', salonController.updateSalon);

// Delete a salon
router.delete('/:id', salonController.deleteSalon);

module.exports = router;
