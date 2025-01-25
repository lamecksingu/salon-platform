const { validationResult } = require('express-validator');
const Service = require('../models/Service');
const Salon = require('../models/Salon');

{/*
// Create a new service
exports.createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, salon_id } = req.body;

  try {
    const service = await Service.create({ name, price, salon_id });
    res.status(201).json({
      message: 'Service created successfully!',
      service,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
};
*/}

// Controller to create a service for the logged-in user's salon
exports.createService = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the JWT

  try {
    // Find the salon owned by the logged-in user
    const salon = await Salon.findOne({ where: { owner_id: userId } });

    // Check if the user owns a salon
    if (!salon) {
      return res.status(400).json({ error: 'User does not own a salon' });
    }

    // Extract service details from the request body
    const { name, description, price } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Create a new service associated with the salon
    const service = await Service.create({
      name,
      description: description || null, // Optional description
      price,
      salon_id: salon.id, // Associate with the salon's ID
    });

    // Respond with the created service
    res.status(201).json({ message: 'Service created successfully!', service });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Error creating service' });
  }
};

// Get all services irrespective of salon
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll(); // Fetch all services
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching all services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

// Get all services for a specific salon
exports.getServicesBySalonId = async (req, res) => {
  const { salon_id } = req.params;

  try {
    const services = await Service.findAll({ where: { salon_id } });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (name) service.name = name;
    if (price) service.price = price;

    await service.save();

    res.status(200).json({
      message: 'Service updated successfully!',
      service,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();

    res.status(200).json({ message: 'Service deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
