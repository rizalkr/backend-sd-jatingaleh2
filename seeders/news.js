const News = require('../models/News');
const sequelize = require('../config/db');

const seedNews = async () => {
    const transaction = await sequelize.transaction();
    try {
        // Hapus data yang ada
        await News.destroy({ 
            where: {}, 
            truncate: true, 
            cascade: true,
            transaction 
        });
        
        // Data berita dummy
        const newsData = [
            {
                title: 'Upacara Bendera Memperingati Hari Kemerdekaan',
                author: 'Admin SD Jatingaleh 2',
                image: 'uploads/news/upacara-bendera.jpg',
                content: 'SD Jatingaleh 2 mengadakan upacara bendera khusus untuk memperingati hari Kemerdekaan Republik Indonesia yang ke-79. Upacara dihadiri oleh seluruh siswa, guru, dan staf sekolah, serta beberapa tamu undangan dari komite sekolah dan perwakilan dinas pendidikan. Upacara berlangsung khidmat dengan pembacaan teks proklamasi dan pengibaran bendera Merah Putih.'
            },
            {
                title: 'Prestasi Siswa SD Jatingaleh 2 di Olimpiade Matematika',
                author: 'Tim Akademik',
                image: 'uploads/news/olimpiade-matematika.jpg',
                content: 'Siswa kelas 6 SD Jatingaleh 2 berhasil meraih juara 2 dalam Olimpiade Matematika tingkat Kota Semarang. Prestasi ini membanggakan dan membuktikan kualitas pendidikan di SD Jatingaleh 2 yang terus meningkat. Kepala sekolah mengucapkan terima kasih kepada guru pembimbing dan orang tua yang telah mendukung siswa dalam persiapan olimpiade.'
            },
            {
                title: 'Workshop Peningkatan Kompetensi Guru',
                author: 'Tim SDM',
                image: 'uploads/news/workshop-guru.jpg',
                content: 'SD Jatingaleh 2 mengadakan workshop peningkatan kompetensi guru dalam penggunaan teknologi pembelajaran. Workshop ini diikuti oleh seluruh guru dan dipandu oleh ahli pendidikan dari Universitas Semarang. Diharapkan dengan workshop ini, guru-guru dapat mengimplementasikan teknologi pembelajaran terbaru dalam kegiatan belajar mengajar di kelas.'
            },
            {
                title: 'Pentas Seni Akhir Tahun Ajaran',
                author: 'Tim Kesenian',
                image: 'uploads/news/pentas-seni.jpg',
                content: 'SD Jatingaleh 2 akan mengadakan Pentas Seni Akhir Tahun Ajaran pada tanggal 5 Juni 2025. Acara ini akan menampilkan berbagai pertunjukan dari siswa-siswa berbakat, mulai dari tari tradisional, modern dance, drama, paduan suara, hingga penampilan band. Orang tua dan wali murid diundang untuk menyaksikan penampilan putra-putri mereka.'
            },
            {
                title: 'Program Literasi untuk Meningkatkan Minat Baca',
                author: 'Tim Perpustakaan',
                image: 'uploads/news/literasi.jpg',
                content: 'SD Jatingaleh 2 meluncurkan program Gerakan Literasi Sekolah untuk meningkatkan minat baca siswa. Program ini meliputi kegiatan membaca 15 menit sebelum pelajaran dimulai, penambahan koleksi buku perpustakaan, dan lomba resensi buku antar kelas. Program ini bertujuan untuk membangun budaya membaca dan meningkatkan kemampuan literasi siswa.'
            }
        ];
        
        // Masukkan data ke database
        await News.bulkCreate(newsData, { transaction });
        
        await transaction.commit();
        console.log('✅ Data berita berhasil di-seed');
    } catch (error) {
        await transaction.rollback();
        console.error('❌ Error seeding news data:', error);
    }
};

module.exports = seedNews;