const Salon = require('../models/Salon'); // Ensure this path is correct

// Get all salons
exports.getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.findAll(); // Sequelize method to fetch all records
        res.json(salons);
    } catch (error) {
        console.error('Error fetching salons:', error);
        res.status(500).json({ error: 'Failed to fetch salons' });
    }
};
