const Student = require('../models/Student');

// GET: Ambil semua data student
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Ambil data student berdasarkan ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Buat student baru
const createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create({
            name: req.body.name,
            age: req.body.age,
            class: req.body.class  // Perhatikan: gunakan 'class' sesuai dengan nama kolom di database
        });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Update data student berdasarkan ID
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }

        student.name  = req.body.name  || student.name;
        student.age   = req.body.age   || student.age;
        student.class = req.body.class || student.class;

        await student.save();
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Hapus data student berdasarkan ID
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }
        await student.destroy();
        res.json({ message: 'Siswa berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};