const Student = require('../models/Student');

const seedStudents = async () => {
    try {
        // Hapus data yang ada
        await Student.destroy({ where: {}, truncate: true, cascade: true });
        
        // Data siswa dummy
        const studentsData = [
            { name: 'Budi Santoso', age: 7, class: '1', spesifiClass: 'A' },
            { name: 'Siti Nurbaya', age: 7, class: '1', spesifiClass: 'A' },
            { name: 'Dimas Pratama', age: 7, class: '1', spesifiClass: 'B' },
            { name: 'Anita Wijaya', age: 7, class: '1', spesifiClass: 'B' },
            { name: 'Rudi Hermawan', age: 8, class: '2', spesifiClass: 'A' },
            { name: 'Dewi Kartika', age: 8, class: '2', spesifiClass: 'A' },
            { name: 'Eko Prasetyo', age: 8, class: '2', spesifiClass: 'B' },
            { name: 'Rina Fitriani', age: 9, class: '3', spesifiClass: 'A' },
            { name: 'Agus Setiawan', age: 9, class: '3', spesifiClass: 'B' },
            { name: 'Lina Susanti', age: 10, class: '4', spesifiClass: 'A' },
            { name: 'Joko Widodo', age: 11, class: '5', spesifiClass: 'A' },
            { name: 'Maya Sari', age: 12, class: '6', spesifiClass: 'A' },
        ];
        
        // Masukkan data ke database
        await Student.bulkCreate(studentsData);
        
        console.log('✅ Data siswa berhasil di-seed');
    } catch (error) {
        console.error('❌ Error seeding student data:', error);
    }
};

module.exports = seedStudents;