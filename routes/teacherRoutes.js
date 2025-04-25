const express = require('express');
const teacherController = require('../controllers/teacherController');
const { teacherUpload } = require('../utils/fileUpload');

const router = express.Router();

// API untuk mendapatkan semua teacher
router.get('/', teacherController.getAllTeachers);

// API untuk mendapatkan satu teacher berdasarkan ID
router.get('/:id', teacherController.getTeacherById);

// API untuk membuat teacher baru dengan image upload
router.post('/', teacherUpload.single('image'), teacherController.createTeacher);

// API untuk memperbarui teacher berdasarkan ID dengan image upload
router.put('/:id', teacherUpload.single('image'), teacherController.updateTeacher);

// API untuk menghapus teacher berdasarkan ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;