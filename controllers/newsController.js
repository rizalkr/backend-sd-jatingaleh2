const News = require('../models/News'); 
const { Op } = require('sequelize');
const { removeOldImage } = require('../utils/fileUpload');

// GET: Ambil semua data berita
const getAllNews = async (req, res) => {
    try {
        const { kategori } = req.query;
        const whereClause = {};
        
        // Filter berdasarkan kategori jika disediakan
        if (kategori) {
            whereClause.kategori = kategori;
        }
        
        const news = await News.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Ambil data berita berdasarkan ID
const getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Berita tidak ditemukan' });
        }
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Buat berita baru
const createNews = async (req, res) => {
    try {
        const { title, author, content, kategori } = req.body;
        
        // Validasi kategori
        if (kategori && !['Pengumuman', 'Artikel', 'Prestasi', 'Kegiatan'].includes(kategori)) {
            return res.status(400).json({ 
                message: 'Kategori harus salah satu dari: Pengumuman, Artikel, Prestasi, Kegiatan' 
            });
        }
        
        const newsData = {
            title,
            author,
            content,
            kategori: kategori || 'Pengumuman'
        };
        
        // Handle image upload
        if (req.file) {
            newsData.image = `public/uploads/news/${req.file.filename}`;
        }
        
        const newNews = await News.create(newsData);
        res.status(201).json(newNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Update berita berdasarkan ID
const updateNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Berita tidak ditemukan' });
        }

        const { title, author, content, kategori } = req.body;
        
        // Validasi kategori jika disediakan
        if (kategori && !['Pengumuman', 'Artikel', 'Prestasi', 'Kegiatan'].includes(kategori)) {
            return res.status(400).json({ 
                message: 'Kategori harus salah satu dari: Pengumuman, Artikel, Prestasi, Kegiatan' 
            });
        }

        // Update text fields
        if (title) news.title = title;
        if (author) news.author = author;
        if (content) news.content = content;
        if (kategori) news.kategori = kategori;
        
        // Update image if new one is uploaded
        if (req.file) {
            // Remove old image if exists
            if (news.image) {
                removeOldImage(news.image);
            }
            news.image = `public/uploads/news/${req.file.filename}`;
        }

        await news.save();
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET: Filter berita berdasarkan kategori
const getNewsByCategory = async (req, res) => {
    try {
        const { kategori } = req.params;
        
        // Validasi kategori
        if (!['Pengumuman', 'Artikel', 'Prestasi', 'Kegiatan'].includes(kategori)) {
            return res.status(400).json({ 
                message: 'Kategori harus salah satu dari: Pengumuman, Artikel, Prestasi, Kegiatan' 
            });
        }
        
        const news = await News.findAll({
            where: { kategori },
            order: [['createdAt', 'DESC']]
        });
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE: Hapus berita berdasarkan ID
const deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Berita tidak ditemukan' });
        }
        
        // Remove image file if exists
        if (news.image) {
            removeOldImage(news.image);
        }
        
        await news.destroy();
        res.json({ message: 'Berita berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    getNewsByCategory
};