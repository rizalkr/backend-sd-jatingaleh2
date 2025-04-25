const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Galerry = sequelize.define('Galerry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,  // Menyimpan path file gambar
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Galerry;