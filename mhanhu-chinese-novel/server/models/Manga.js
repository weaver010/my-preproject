const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Manga = sequelize.define('Manga', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Manga;

