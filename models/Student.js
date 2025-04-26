const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
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
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['1', '2', '3', '4', '5', '6']]
        },
    },
    spesifiClass:{
        type: DataTypes.STRING,
        allowNull: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    nisn : {       
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    parent : {
        type: DataTypes.STRING,
        allowNull: true
    },
    address : {
        type: DataTypes.STRING,
        allowNull: true
    },
    
}, {
    timestamps: true
});

module.exports = Student;