const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const User = require('../models/User');

beforeAll(async () => {
  // Sinkronisasi database dan buat user untuk testing
  await sequelize.sync({ force: true });
  await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/auth/login', () => {
  it('mengembalikan token JWT ketika kredensial valid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('mengembalikan 404 jika user tidak ditemukan', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistent',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'User tidak ditemukan');
  });

  it('mengembalikan 401 jika password salah', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Password salah');
  });
});