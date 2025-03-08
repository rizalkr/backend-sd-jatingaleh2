const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// API untuk mendapatkan semua admin
router.get('/', adminController.getAllAdmins);

// API untuk mendapatkan satu admin berdasarkan ID
router.get('/:id', adminController.getAdminById);

// API untuk membuat admin baru
router.post('/', adminController.createAdmin);

// API untuk memperbarui admin berdasarkan ID
router.put('/:id', adminController.updateAdmin);

// API untuk menghapus admin berdasarkan ID
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;