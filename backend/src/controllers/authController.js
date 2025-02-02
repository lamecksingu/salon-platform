const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Stylist } = require('../models');

const register = async (req, res) => {
    const { name, email, password, role, specialization, freelance, salon_id } = req.body;

    try {
	    // check if the user exists
	    const existingUser = await User.findOne({ where: { email } });
	    if (existingUser) {
		    return res.status(400).json({ error: 'A user with this email already exists' });
	    }

	    //hassh password
        const hashedPassword = await bcrypt.hash(password, 10);

	    //create the user
        const user = await User.create({ name, email, password: hashedPassword, role, });

	    // If the role is stylist, add a record to the stylists table
        if (role === 'stylist') {
		if (freelance === false && !salon_id) {
			return res.status(400).json({
				message: "Salon ID is required for non-freelance stylists",});
		}

            await Stylist.create({
                user_id: user.id, // Use the ID of the newly created user
                name: name, // Default to the user's name
                specialization: specialization || null, // Optional specialization
                freelance: freelance || false, // Default to non-freelance
                salon_id: freelance ? null : salon_id || null, // Salon ID for non-freelancers
            });
        }

	    // exclude password from the response
	    const { password: _, ...userWithoutPassword } = user.toJSON();

        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role, salon_id: user.salon_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

{/* const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id,);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/}

const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Assuming `req.user` contains the authenticated user info
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove password from the response
        const { password, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, login, getProfile };
