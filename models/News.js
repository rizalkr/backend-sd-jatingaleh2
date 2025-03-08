const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const News = sequelize.define('News', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // tambahkan field lain jika diperlukan
}, {
    timestamps: true // otomatis menambah createdAt dan updatedAt
});

module.exports = News;