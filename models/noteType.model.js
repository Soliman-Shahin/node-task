const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const Note = require('../models/note.model');

const NoteType = sequelize.define('note-type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    disabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
})

NoteType.hasMany(Note);


module.exports = NoteType;