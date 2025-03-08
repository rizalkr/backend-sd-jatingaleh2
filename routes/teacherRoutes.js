const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// API untuk mendapatkan semua teacher
router.get('/', teacherController.getAllTeachers);

// API untuk mendapatkan satu teacher berdasarkan ID
router.get('/:id', teacherController.getTeacherById);

// API untuk membuat teacher baru
router.post('/', teacherController.createTeacher);

// API untuk memperbarui teacher berdasarkan ID
router.put('/:id', teacherController.updateTeacher);

// API untuk menghapus teacher berdasarkan ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;