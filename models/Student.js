const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // pastikan konfigurasi koneksi PostgreSQL sudah diatur
const { all } = require('../routes/newsRoutes');

const Student = sequelize.define('Student', {
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
    age: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
    },
    class:{
        type: DataTypes.STRING,
        allowNull: false
    }
    // tambahkan field lain jika diperlukan
}, {
    timestamps: true // otomatis menambah createdAt dan updatedAt
});

module.exports = Student;