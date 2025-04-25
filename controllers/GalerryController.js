const Galerry = require('../models/Galerry');

// GET: Semua galerry
const getAllGalerry = async (req, res) => {
    try {
        const data = await Galerry.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Satu galerry
const getGalerryById = async (req, res) => {
    try {
        const galerry = await Galerry.findByPk(req.params.id);
        if (!galerry) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.json(galerry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Buat galerry baru (contoh simpan foto ke folder public/image/galeery)
const createGalerry = async (req, res) => {
    try {
        // contoh: path file disimpan di req.file.filename (Multer)
        const foto = req.file ? `public/image/gallery/${req.file.filename}` : null;
        
        const newGalerry = await Galerry.create({
            nama: req.body.nama,
            foto
        });
        res.status(201).json(newGalerry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Update galerry
const updateGalerry = async (req, res) => {
    try {
        const galerry = await Galerry.findByPk(req.params.id);
        if (!galerry) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        galerry.nama = req.body.nama || galerry.nama;
        if (req.file) {
            galerry.foto = `public/image/gallery/${req.file.filename}`;
        }

        await galerry.save();
        res.json(galerry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Hapus galerry
const deleteGalerry = async (req, res) => {
    try {
        const galerry = await Galerry.findByPk(req.params.id);
        if (!galerry) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        await galerry.destroy();
        res.json({ message: 'Galerry dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGalerry,
    getGalerryById,
    createGalerry,
    updateGalerry,
    deleteGalerry
};