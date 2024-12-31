const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Salon = require('./Salon');

const Stylist = sequelize.define('Stylist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Salon,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true,
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

module.exports = Stylist;
