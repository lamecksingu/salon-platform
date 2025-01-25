const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  salon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Salons', // Reference to the Salons model
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'services', // Table name matches the DB
  timestamps: false,  // Prevent Sequelize from adding extra timestamp fields
});

module.exports = Service;

