const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }
    
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }
    
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return res.json({ token });
  } catch (error) {
    console.error('Error di authController.login:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };