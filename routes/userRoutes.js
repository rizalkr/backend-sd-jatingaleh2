const express = require('express');
const usersController = require('../controllers/userController');

const router = express.Router();

// API untuk mendapatkan semua user
router.get('/', usersController.getAllUsers);

// API untuk mendapatkan satu user berdasarkan ID
router.get('/:id', usersController.getUserById);

// API untuk membuat user baru
router.post('/', usersController.createUser);

// API untuk memperbarui user berdasarkan ID
router.put('/:id', usersController.updateUser);

// API untuk menghapus user berdasarkan ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;