const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Temukan user berdasarkan email
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        
        // Lakukan validasi password (contoh sederhana, dalam prakteknya gunakan bcrypt)
        if(user.password !== password) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };