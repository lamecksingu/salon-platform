const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Salon = require('./Salon');
const User = require('./User');

const Stylist = sequelize.define('Stylist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
	user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the users table
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
	},

    salon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Salon,
            key: 'id',
        },
	    onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true,
    },

	freelance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default to non-freelancer
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'stylists',
    timestamps: false,
});

module.exports = Stylist
