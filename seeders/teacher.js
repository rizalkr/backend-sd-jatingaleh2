const Teacher = require('../models/Teacher');
const sequelize = require('../config/db');

const seedTeachers = async () => {
    const transaction = await sequelize.transaction();
    try {
        // Hapus data yang ada
        await Teacher.destroy({ 
            where: {}, 
            truncate: true, 
            cascade: true,
            transaction 
        });
        
        // Data guru dummy
        const teachersData = [
            {
                name: 'Supriyadi, S.Pd.',
                username: 'supriyadi',
                email: 'supriyadi@jatingaleh2.sch.id',
                subject: 'Matematika',
                nuptk: '1234567890'
            },
            {
                name: 'Ani Wijayanti, S.Pd.',
                username: 'aniwijayanti',
                email: 'ani@jatingaleh2.sch.id',
                subject: 'Bahasa Indonesia',
                nuptk: '2345678901'
            },
            {
                name: 'Bambang Hermawan, S.Pd.',
                username: 'bambang',
                email: 'bambang@jatingaleh2.sch.id',
                subject: 'IPA',
                nuptk: '3456789012'
            },
            {
                name: 'Dina Susanti, S.Pd.',
                username: 'dina',
                email: 'dina@jatingaleh2.sch.id',
                subject: 'IPS',
                nuptk: '4567890123'
            },
            {
                name: 'Ahmad Fauzi, S.Pd.I.',
                username: 'ahmad',
                email: 'ahmad@jatingaleh2.sch.id',
                subject: 'Pendidikan Agama Islam',
                nuptk: '5678901234'
            },
            {
                name: 'Sri Rahayu, S.Pd.',
                username: 'sri',
                email: 'sri@jatingaleh2.sch.id',
                subject: 'Bahasa Inggris',
                nuptk: '6789012345'
            },
            {
                name: 'Agus Budiman, M.Pd.',
                username: 'agus',
                email: 'agus@jatingaleh2.sch.id',
                subject: 'PJOK',
                nuptk: '7890123456'
            },
            {
                name: 'Rini Wulandari, S.Pd.',
                username: 'rini',
                email: 'rini@jatingaleh2.sch.id',
                subject: 'Seni Budaya',
                nuptk: '8901234567'
            }
        ];
        
        // Masukkan data ke database
        await Teacher.bulkCreate(teachersData, { transaction });
        
        await transaction.commit();
        console.log('✅ Data guru berhasil di-seed');
    } catch (error) {
        await transaction.rollback();
        console.error('❌ Error seeding teacher data:', error);
    }
};

module.exports = seedTeachers;