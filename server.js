const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

sequelize.sync({alter: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});