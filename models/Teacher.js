const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // pastikan konfigurasi koneksi PostgreSQL sudah diatur

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true // field opsional untuk mata pelajaran
    }
}, {
    timestamps: true // otomatis menambah createdAt dan updatedAt
});

module.exports = Teacher;