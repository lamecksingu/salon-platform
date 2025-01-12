const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
// require('dotenv').config({ path: '../.env' }); // Load environmental variables

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // load env var

// Fetching values from environmental variables to initialize database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
	logging: false,
});

// connecting to the database
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
