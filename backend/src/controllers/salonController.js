const Salon = require('../models/Salon'); // Import the Salon model
const User = require('../models/User'); // Import the User model

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

{/*
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
*/}

// Create a new salon
exports.createSalon = async (req, res) => {
    try {
        const { name, address } = req.body;

        // Extract owner_id from the logged-in user's token
        const owner_id = req.user.id; // Assuming `req.user` contains the decoded JWT with user info

        // Ensure the user is an owner
        if (req.user.role !== 'owner') {
            return res.status(403).json({ error: 'Only owners can create salons' });
        }

        // Create the salon and associate it with the owner
        const salon = await Salon.create({ name, address, owner_id });

        // Respond with the newly created salon
        res.status(201).json({
            message: "Salon created successfully!",
            salon,
        });
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

// Fetch all salons owned by the logged-in owner
exports.getOwnerSalons = async (req, res) => {
    try {
        const owner_id = req.user.id; // Extract owner ID from the logged-in user's token

        // Ensure the user is an owner
        if (req.user.role !== 'owner') {
            return res.status(403).json({ error: 'Access denied: Only owners can view their salons' });
        }

        // Fetch all salons owned by this user
        const salons = await Salon.findAll({ where: { owner_id } });

        // Respond with the salons
        res.json({ salons });
    } catch (error) {
        console.error('Error fetching salons for owner:', error);
        res.status(500).json({ error: 'Failed to fetch salons' });
    }
};
