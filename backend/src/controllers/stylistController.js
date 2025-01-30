const Stylist = require('../models/Stylist');
const User = require('../models/User');
const Salon = require('../models/Salon');

// Add Stylist
exports.addStylist = async (req, res) => {
    try {
        const { name, specialization, freelance, salon_id } = req.body;

        // Retrieve user_id from req.user (from auth middleware)
        const user_id = req.user.id;

        // Create stylist entry
        const stylist = await Stylist.create({
            name,
            specialization,
            freelance,
            salon_id: freelance ? null : salon_id, // Null for freelancers
            user_id,
        });

        res.status(201).json({
            message: 'Stylist added successfully!',
            stylist,
        });
    } catch (error) {
        console.error('Error adding stylist:', error);
        res.status(500).json({ error: 'Failed to add stylist' });
    }
};

// Update Stylist
exports.updateStylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialization, freelance, salon_id } = req.body;

        const stylist = await Stylist.findByPk(id);
        if (!stylist) return res.status(404).json({ error: 'Stylist not found' });

        // Update fields
        stylist.name = name || stylist.name;
        stylist.specialization = specialization || stylist.specialization;
        stylist.freelance = freelance !== undefined ? freelance : stylist.freelance;
        stylist.salon_id = freelance ? null : salon_id || stylist.salon_id;

        await stylist.save();

        res.json({
            message: 'Stylist updated successfully!',
            stylist,
        });
    } catch (error) {
        console.error('Error updating stylist:', error);
        res.status(500).json({ error: 'Failed to update stylist' });
    }
};

// Delete Stylist
exports.deleteStylist = async (req, res) => {
    try {
        const { id } = req.params;

        const stylist = await Stylist.findByPk(id);
        if (!stylist) return res.status(404).json({ error: 'Stylist not found' });

        await stylist.destroy();

        res.json({ message: 'Stylist deleted successfully!' });
    } catch (error) {
        console.error('Error deleting stylist:', error);
        res.status(500).json({ error: 'Failed to delete stylist' });
    }
};

// View Stylist Details
exports.getStylistDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const stylist = await Stylist.findByPk(id, {
            include: [{ model: User }, { model: Salon }],
        });
        if (!stylist) return res.status(404).json({ error: 'Stylist not found' });

        res.json(stylist);
    } catch (error) {
        console.error('Error fetching stylist details:', error);
        res.status(500).json({ error: 'Failed to fetch stylist details' });
    }
};

// List Stylists
exports.listStylists = async (req, res) => {
    try {
        const stylists = await Stylist.findAll({
            include: [{ model: User }, { model: Salon }],
        });
        res.json(stylists);
    } catch (error) {
        console.error('Error fetching stylists:', error);
        res.status(500).json({ error: 'Failed to fetch stylists' });
    }
};

// Search or Filter Stylists
exports.searchStylists = async (req, res) => {
    try {
        const { name, specialization, freelance, salon_id } = req.query;

        const whereClause = {};
        if (name) whereClause.name = { [Op.like]: `%${name}%` };
        if (specialization) whereClause.specialization = { [Op.like]: `%${specialization}%` };
        if (freelance !== undefined) whereClause.freelance = freelance === 'true';
        if (salon_id) whereClause.salon_id = salon_id;

        const stylists = await Stylist.findAll({
            where: whereClause,
            include: [{ model: User }, { model: Salon }],
        });

        res.json(stylists);
    } catch (error) {
        console.error('Error searching stylists:', error);
        res.status(500).json({ error: 'Failed to search stylists' });
    }
};
