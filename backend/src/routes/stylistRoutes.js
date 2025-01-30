const express = require('express');
const router = express.Router();
const stylistController = require('../controllers/stylistController');
const authMiddleware = require('../middleware/authMiddleware');
const { register } = require('../controllers/authController');

console.log('Stylist Controller:', stylistController);

console.log('Auth Middleware:', authMiddleware);

console.log('Register function:', register);

router.post('/register', register);

// Route for adding a stylist
router.post('/', authMiddleware, stylistController.addStylist);

// Route for updating stylist details
router.put('/:id', authMiddleware, stylistController.updateStylist);

// Route for deleting a stylist
router.delete('/:id', authMiddleware, stylistController.deleteStylist);

// Route for getting stylist details
router.get('/:id', stylistController.getStylistDetails);

// Route for listing all stylists
router.get('/', stylistController.listStylists);

// Route for searching/filtering stylists
router.get('/search', stylistController.searchStylists);

module.exports = router;
