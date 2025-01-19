const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models'); // Import all models to register them with Sequelize
const loggerMiddleware = require('./middleware/logger');
// const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const authRoutes = require('./routes/auth'); // Authentication

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
const salonRoutes = require('./routes/salonRoutes'); // Example route
app.use('/api/salons', salonRoutes);
app.use('/api/auth', authRoutes); // Authentication route

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        // Sync the database
	    if (process.env.NODE_ENV === 'development') {
		    await sequelize.sync(); // Use `alter: true` for adjusting tables to match models without data loss
	    console.log('Database synchronized successfully');
	    }
    } catch (err) {
        console.error('Error synchronizing database:', err);
    }
});
