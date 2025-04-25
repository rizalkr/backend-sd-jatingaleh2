const Teacher = require('../models/Teacher');
const { removeOldImage } = require('../utils/fileUpload');

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
        const teacherData = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            subject: req.body.subject,
            nuptk: req.body.nuptk
        };
        
        // Handle image upload
        if (req.file) {
            teacherData.image = `public/uploads/teachers/${req.file.filename}`;
        }
        
        const newTeacher = await Teacher.create(teacherData);
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

        // Update text fields
        teacher.name = req.body.name || teacher.name;
        teacher.email = req.body.email || teacher.email;
        teacher.subject = req.body.subject || teacher.subject;
        teacher.nuptk = req.body.nuptk || teacher.nuptk;
        
        // Update image if new one is uploaded
        if (req.file) {
            // Remove old image if exists
            if (teacher.image) {
                removeOldImage(teacher.image);
            }
            teacher.image = `public/uploads/teachers/${req.file.filename}`;
        }

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
        
        // Remove image file if exists
        if (teacher.image) {
            removeOldImage(teacher.image);
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