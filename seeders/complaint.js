const Complaint = require('../models/Complaint');
const sequelize = require('../config/db');

const seedComplaints = async () => {
    const transaction = await sequelize.transaction();
    try {
        // Hapus data yang ada
        await Complaint.destroy({ 
            where: {}, 
            truncate: true, 
            cascade: true,
            transaction 
        });
        
        // Data aduan dummy
        const complaintsData = [
            { 
                namaPengadu: 'Ahmad Ridwan',
                pesanAduan: 'Toilet di lantai 2 rusak dan perlu diperbaiki segera.',
                status: 'antrian'
            },
            { 
                namaPengadu: 'Siti Aminah',
                pesanAduan: 'AC di kelas 3B tidak berfungsi dengan baik.',
                status: 'dibaca'
            },
            { 
                namaPengadu: 'Budi Susanto',
                pesanAduan: 'Beberapa lampu di koridor lantai 1 mati.',
                status: 'terselesaikan'
            },
            { 
                namaPengadu: 'Diana Putri',
                pesanAduan: 'Mohon tambahan buku bacaan untuk perpustakaan.',
                status: 'antrian'
            },
            { 
                namaPengadu: 'Hadi Santoso',
                pesanAduan: 'Lapangan basket perlu diperbaiki, ada beberapa lubang.',
                status: 'dibaca'
            },
            {
                namaPengadu: 'Indah Permata',
                pesanAduan: 'Internet di ruang komputer sering terputus.',
                status: 'antrian'
            },
            {
                namaPengadu: 'Joko Widodo',
                pesanAduan: 'Kantin sekolah perlu menambah menu sehat.',
                status: 'dibaca'
            }
        ];
        
        // Masukkan data ke database
        await Complaint.bulkCreate(complaintsData, { transaction });
        
        await transaction.commit();
        console.log('✅ Data aduan berhasil di-seed');
    } catch (error) {
        await transaction.rollback();
        console.error('❌ Error seeding complaint data:', error);
    }
};

module.exports = seedComplaints;