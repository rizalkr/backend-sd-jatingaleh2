const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
    // Bypass endpoint get
    if (req.method === 'GET') {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findByPk(decoded.id);
        if (!admin) {
            return res.status(401).json({ message: 'Admin tidak ditemukan' });
        }

        // Lampirkan admin ke req untuk digunakan di route selanjutnya
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
};

module.exports = authMiddleware;