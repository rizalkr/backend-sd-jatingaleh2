require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const newsRoutes = require('./routes/newsRoutes');
const errorHandler = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(bodyParser.json());

// Mounting authRoutes terlebih dahulu, agar endpoint login terbuka
app.use('/api/auth', authRoutes);

// Middleware auth hanya untuk routes selain endpoint auth
app.use(authMiddleware);

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes); 
app.use('/api/users', userRoutes);

// Pastikan errorHandler adalah middleware function, misalnya:

app.use(errorHandler);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});