require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const newsRoutes = require('./routes/newsRoutes');
const errorHandler = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authMiddleware = require('./middleware/auth');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Mounting authRoutes terlebih dahulu, agar endpoint login terbuka
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Middleware auth hanya untuk routes selain endpoint auth
app.use(authMiddleware);

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes); 

// Error handler
app.use(errorHandler);

module.exports = app;