const { Sequelize } = require('sequelize');

// Passing parameters separately (other dialects)
const sequelize = new Sequelize('node-task', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize;