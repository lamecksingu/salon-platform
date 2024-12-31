const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environmental variables

// Fetching values from environmental variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connection estabilished successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

connectToDatabase();

module.exports = sequelize;
