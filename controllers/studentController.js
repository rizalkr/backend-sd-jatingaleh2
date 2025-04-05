const { Op } = require('sequelize');
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
            class: req.body.class,
            spesifiClass: req.body.spesifiClass
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
        student.spesifiClass = req.body.spesifiClass || student.spesifiClass;

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

// Handler untuk mencari student berdasarkan nama
const searchStudentsByName = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Parameter 'name' diperlukan" });
    }
    try {
        const students = await Student.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Handler untuk memfilter student berdasarkan kelas
const filterStudentsByClass = async (req, res) => {
    try {
        const { class: studentClass } = req.query;
        const whereClause = {};
        
        if (studentClass) {
            whereClause.class = studentClass;
        }
        
        const students = await Student.findAll({
            where: whereClause,
            order: [['spesifiClass', 'ASC'], ['name', 'ASC']]
        });
        
        // Tambahkan keterangan kelas lengkap
        const formattedStudents = students.map(student => {
            const plainStudent = student.get({ plain: true });
            plainStudent.kelasLengkap = `${plainStudent.class}${plainStudent.spesifiClass}`;
            return plainStudent;
        });
        
        res.json({
            success: true,
            count: students.length,
            data: formattedStudents
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudentsByName,
    filterStudentsByClass 
};