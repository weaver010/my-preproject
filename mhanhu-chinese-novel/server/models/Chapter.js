const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Manga = require('./Manga');

const Chapter = sequelize.define('Chapter', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mangaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Manga,
            key: 'id'
        }
    }
});

module.exports = Chapter;

