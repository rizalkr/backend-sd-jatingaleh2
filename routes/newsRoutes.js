const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// API untuk mendapatkan semua berita
router.get('/', newsController.getAllNews);

// API untuk mendapatkan satu berita berdasarkan ID
router.get('/:id', newsController.getNewsById);

// API untuk membuat berita baru
router.post('/', newsController.createNews);

// API untuk memperbarui berita berdasarkan ID
router.put('/:id', newsController.updateNews);

// API untuk menghapus berita berdasarkan ID
router.delete('/:id', newsController.deleteNews);

module.exports = router;