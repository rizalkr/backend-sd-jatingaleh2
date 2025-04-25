const express = require('express');
const newsController = require('../controllers/newsController');
const { newsUpload } = require('../utils/fileUpload');

const router = express.Router();

// API untuk mendapatkan semua berita
router.get('/', newsController.getAllNews);

// API untuk mendapatkan satu berita berdasarkan ID
router.get('/:id', newsController.getNewsById);

// API untuk membuat berita baru dengan image upload
router.post('/', newsUpload.single('image'), newsController.createNews);

// API untuk memperbarui berita berdasarkan ID dengan image upload
router.put('/:id', newsUpload.single('image'), newsController.updateNews);

// API untuk menghapus berita berdasarkan ID
router.delete('/:id', newsController.deleteNews);

// API untuk mendapatkan berita berdasarkan kategori
router.get('/category/:kategori', newsController.getNewsByCategory);

module.exports = router;