const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Complaint = sequelize.define('Complaint', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    namaPengadu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pesanAduan: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('antrian', 'dibaca', 'terselesaikan'),
        allowNull: false,
        defaultValue: 'antrian'
    }
}, {
    timestamps: true // otomatis menambah createdAt dan updatedAt
});

module.exports = Complaint;