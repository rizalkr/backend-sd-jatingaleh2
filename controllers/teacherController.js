const Teacher = require('../models/Teacher');

// GET: Ambil semua data teacher
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Ambil data teacher berdasarkan ID
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Guru tidak ditemukan' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Buat teacher baru
const createTeacher = async (req, res) => {
    try {
        const newTeacher = await Teacher.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject // Sesuaikan dengan field yang dimiliki model Teacher
        });
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Update data teacher berdasarkan ID
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Guru tidak ditemukan' });
        }

        teacher.name    = req.body.name || teacher.name;
        teacher.email   = req.body.email || teacher.email;
        teacher.subject = req.body.subject || teacher.subject;

        await teacher.save();
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Hapus data teacher berdasarkan ID
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Guru tidak ditemukan' });
        }
        await teacher.destroy();
        res.json({ message: 'Guru berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
};