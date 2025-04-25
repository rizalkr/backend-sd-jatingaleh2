const express = require('express');
const studentController = require('../controllers/studentController');
const { studentUpload } = require('../utils/fileUpload');

const router = express.Router();

// API untuk mencari student berdasarkan nama
router.get('/search', studentController.searchStudentsByName);

// API untuk mendapatkan semua student
router.get('/', studentController.getAllStudents);

// API untuk mendapatkan satu student berdasarkan ID
router.get('/:id', studentController.getStudentById);

// API untuk mendapatkan siswa berdasarkan kelas
router.get('/filter', studentController.filterStudentsByClass);

// API untuk membuat student baru dengan image upload
router.post('/', studentUpload.single('image'), studentController.createStudent);

// API untuk memperbarui student berdasarkan ID dengan image upload
router.put('/:id', studentUpload.single('image'), studentController.updateStudent);

// API untuk menghapus student berdasarkan ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;