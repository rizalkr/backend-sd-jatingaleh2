const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifikasi user di database menggunakan id dari token
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        req.user = user; // Bisa digunakan pada route selanjutnya
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

module.exports = authMiddleware;