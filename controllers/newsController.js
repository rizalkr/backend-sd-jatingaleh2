const News = require('../models/News'); 

// GET: Ambil semua data berita
const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
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
        const newNews = await News.create({
            title: req.body.title,
            content: req.body.content,
            // tambahkan field lain sesuai kebutuhan
        });
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

        news.title = req.body.title || news.title;
        news.content = req.body.content || news.content;
        // update field lain jika diperlukan

        await news.save();
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Hapus berita berdasarkan ID
const deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Berita tidak ditemukan' });
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
    deleteNews
};