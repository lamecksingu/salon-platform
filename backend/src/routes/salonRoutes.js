const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
// Import controller
const salonController = require('../controllers/salonController'); // Ensure this path is correct

// Define routes
router.get('/', salonController.getAllSalons); // Ensure `salonController.getAllSalons` is defined

// Create a salon
router.post('/', authMiddleware, salonController.createSalon);

// Update a salon
router.put('/:id', authMiddleware, salonController.updateSalon);

// Delete a salon
router.delete('/:id', authMiddleware, salonController.deleteSalon);

// Route to fetch all salons for the logged in owner
router.get('/my-salons', authMiddleware, salonController.getOwnerSalons);

module.exports = router;
