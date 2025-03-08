const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const Student = require('../models/Student');
const User = require('../models/User');

let token;
let studentId;

beforeAll(async () => {
  // Sinkronisasi database dan buat user penguji
  await sequelize.sync({ force: true });
  await User.create({
    username: 'studentuser',
    email: 'studentuser@example.com',
    password: 'studentpassword'
  });

  // Dapatkan token
  const authRes = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'studentuser',
      password: 'studentpassword'
    });
  token = authRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Student Endpoints', () => {
  it('POST /api/students - membuat student baru', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Siswa 1',
        age: 15,
        class: '10A'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    studentId = res.body.id;
  });

  it('GET /api/students - mendapatkan semua student', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/students/:id - mendapatkan student berdasarkan ID', async () => {
    const res = await request(app)
      .get(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', studentId);
  });

  it('PUT /api/students/:id - update student', async () => {
    const res = await request(app)
      .put(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Siswa Update',
        age: 16,
        class: '10B'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Siswa Update');
  });

  it('DELETE /api/students/:id - menghapus student', async () => {
    const res = await request(app)
      .delete(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});