const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Novel = sequelize.define('Novel', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    coverImage: {
        type: DataTypes.STRING,  // URL or file path for the cover image
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Novel;

