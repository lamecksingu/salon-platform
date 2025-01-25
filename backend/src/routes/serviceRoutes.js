const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
  createService,
  getAllServices,
  getServicesBySalonId, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');

// Route to create a new service for a logged-in user’s salon
router.post('/', authMiddleware, createService);

// Route to get all services (irrespective of salon)
router.get('/', getAllServices);

// Route to get all services by salon_id
router.get('/:salon_id', getServicesBySalonId);

// Route to update a service by service ID
router.put('/:id', authMiddleware, updateService);

// Route to delete a service by service ID
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;
