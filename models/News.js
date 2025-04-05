const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const News = sequelize.define('News', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        allowNull: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    kategori: {
        type: DataTypes.ENUM('Pengumuman', 'Artikel', 'Prestasi', 'Kegiatan'),
        allowNull: false,
        defaultValue: 'Pengumuman'
    }
}, {
    timestamps: true // otomatis menambah createdAt dan updatedAt
});

module.exports = News;