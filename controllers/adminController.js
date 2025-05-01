const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const SALT_ROUND = 10;
// GET: Ambil semua data admin
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Ambil data admin berdasarkan ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin tidak ditemukan' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Buat admin baru
const createAdmin = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAdmin = await Admin.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Update admin berdasarkan ID
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin tidak ditemukan' });
        }
        admin.username = req.body.username || admin.username;
        admin.email = req.body.email || admin.email;
        admin.password = req.body.password || admin.password;
        
        await admin.save();
        res.json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Hapus admin berdasarkan ID
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin tidak ditemukan' });
        }
        await admin.destroy();
        res.json({ message: 'Admin berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};
