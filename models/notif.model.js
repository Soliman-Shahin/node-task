const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const Note = require('../models/note.model');
const User = require('../models/user.model');

const Notif = sequelize.define('notif', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
})

User.hasMany(Notif);
Note.hasMany(Notif)

module.exports = Notif;