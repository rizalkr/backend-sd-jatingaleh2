const sequelize = require('../config/db');
const seedStudents = require('./student');
const seedTeachers = require('./teacher');
const seedNews = require('./news');
const seedComplaints = require('./complaint');

const runAllSeeders = async () => {
    try {
        console.log('🔄 Syncing database...');
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');
        
        console.log('🌱 Running seeders...');
        // Jalankan seeder berurutan
        // Jalankan seeder yang tidak memiliki dependensi terlebih dahulu
        await seedTeachers();
        await seedStudents();
        await seedNews();
        await seedComplaints();
        // await seedAdmins(); // Jika ada
        
        console.log('� All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error running seeders:', error);
        process.exit(1);
    }
};

// Jalankan seeder
runAllSeeders();