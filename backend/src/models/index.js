const User = require('./User');
const Salon = require('./Salon');
const Service = require('./Service');
const Appointment = require('./Appointment');
const Stylist = require('./Stylist');

// User -> Salon (Owner relationship)
User.hasMany(Salon, { foreignKey: 'owner_id' });
Salon.belongsTo(User, { foreignKey: 'owner_id' });

// Salon -> Service
Salon.hasMany(Service, { foreignKey: 'salon_id' });
Service.belongsTo(Salon, { foreignKey: 'salon_id' });

// Salon -> Stylist
Salon.hasMany(Stylist, { foreignKey: 'salon_id' });
Stylist.belongsTo(Salon, { foreignKey: 'salon_id' });

// Appointment relationships
User.hasMany(Appointment, { foreignKey: 'customer_id' });
Appointment.belongsTo(User, { foreignKey: 'customer_id' });

Salon.hasMany(Appointment, { foreignKey: 'salon_id' });
Appointment.belongsTo(Salon, { foreignKey: 'salon_id' });

Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

module.exports = {
    User,
    Salon,
    Service,
    Appointment,
    Stylist,
};
