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
// Create a new salon
exports.createSalon = async (req, res) => {
    try {
        const { name, address, owner_id } = req.body;
        const salon = await Salon.create({ name, address, owner_id });
        res.status(201).json({ message: "Salon created successfully!", salon });
    } catch (error) {
        console.error('Error creating salon:', error);
        res.status(500).json({ error: 'Failed to create salon' });
    }
};

// Update a salon
exports.updateSalon = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, owner_id } = req.body;
        const salon = await Salon.findByPk(id);
        if (!salon) return res.status(404).json({ message: 'Salon not found' });

        salon.name = name || salon.name;
        salon.address = address || salon.address;
        salon.owner_id = owner_id || salon.owner_id;
        await salon.save();

        res.json(salon);
    } catch (error) {
        console.error('Error updating salon:', error);
        res.status(500).json({ error: 'Failed to update salon' });
    }
};

// Delete a salon
exports.deleteSalon = async (req, res) => {
    try {
        const { id } = req.params;
        const salon = await Salon.findByPk(id);
        if (!salon) return res.status(404).json({ message: 'Salon not found' });

        await salon.destroy();
        res.json({ message: 'Salon deleted successfully' });
    } catch (error) {
        console.error('Error deleting salon:', error);
        res.status(500).json({ error: 'Failed to delete salon' });
    }
};
