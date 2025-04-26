const { Op } = require('sequelize');
const Student = require('../models/Student');
const { removeOldImage } = require('../utils/fileUpload');

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
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        // Parse age as integer or default to null if not provided
        const age = req.body.age ? parseInt(req.body.age) : null;
        
        // Create student data object with all available fields
        const studentData = {
            name: req.body.name,
            age: age,
            class: req.body.class,
            spesifiClass: req.body.spesifiClass,
            nisn: req.body.nisn || null,
            parent: req.body.parent || null,
            address: req.body.address || null
        };
        
        // Handle image upload
        if (req.file) {
            studentData.image = `public/uploads/students/${req.file.filename}`;
            console.log('Image will be saved at:', studentData.image);
        } else {
            console.log('No file uploaded');
        }
        
        console.log('Creating student with data:', studentData);
        
        const newStudent = await Student.create(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(400).json({ 
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

// PUT: Update data student berdasarkan ID
const updateStudent = async (req, res) => {
    try {
        console.log('Update request body:', req.body);
        console.log('Update request file:', req.file);
        
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }

        // Parse age as integer if provided
        if (req.body.age) {
            req.body.age = parseInt(req.body.age);
        }

        // Update text fields with null coalescing to preserve existing values
        student.name = req.body.name !== undefined ? req.body.name : student.name;
        student.age = req.body.age !== undefined ? req.body.age : student.age;
        student.class = req.body.class !== undefined ? req.body.class : student.class;
        student.spesifiClass = req.body.spesifiClass !== undefined ? req.body.spesifiClass : student.spesifiClass;
        student.nisn = req.body.nisn !== undefined ? req.body.nisn : student.nisn;
        student.parent = req.body.parent !== undefined ? req.body.parent : student.parent;
        student.address = req.body.address !== undefined ? req.body.address : student.address;
        
        // Update image if new one is uploaded
        if (req.file) {
            // Remove old image if exists
            if (student.image) {
                removeOldImage(student.image);
            }
            student.image = `public/uploads/students/${req.file.filename}`;
            console.log('New image will be saved at:', student.image);
        }

        console.log('Updating student with data:', student.dataValues);
        
        await student.save();
        res.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message,
            error: error.stack
        });
    }
};

// DELETE: Hapus data student berdasarkan ID
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }
        
        // Remove image file if exists
        if (student.image) {
            removeOldImage(student.image);
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